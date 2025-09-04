"use client";
import React, { useRef, useState } from "react"
import { AnimatePresence, motion } from "motion/react"

import { useEffect } from "react";

export function useClickAway(refs, callback) {
  useEffect(() => {
    const handleClick = (event) => {
      const refsArray = Array.isArray(refs) ? refs : [refs]

      const isOutside = refsArray.every((ref) => {
        return ref.current && !ref.current.contains(event.target);
      })

      if (isOutside) {
        callback()
      }
    }

    document.addEventListener("mousedown", handleClick)

    return () => {
      document.removeEventListener("mousedown", handleClick)
    };
  }, [refs, callback])
}


export function useKeyPress(targetKey, callback) {
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === targetKey) {
        callback()
      }
    }

    document.addEventListener("keydown", handleKeyPress)

    return () => {
      document.removeEventListener("keydown", handleKeyPress)
    };
  }, [targetKey, callback])
}


const DropdownContext = React.createContext(undefined)

// Hook to use the dropdown context
const useDropdownContext = () => {
  const context = React.useContext(DropdownContext)
  if (!context) {
    throw new Error("Dropdown components must be used within a Dropdown component")
  }
  return context
}

// Main Dropdown component
export function Dropdown({
  children,
  className = ""
}) {
  const [open, setOpen] = useState(false)
  const triggerRef = useRef(null)
  const contentRef = useRef(null)

  return (
    <DropdownContext.Provider value={{ open, setOpen, triggerRef, contentRef }}>
      <div className={`relative inline-block text-left ${className}`}>
        {children}
      </div>
    </DropdownContext.Provider>
  );
}

// Trigger component for the dropdown
export function DropdownTrigger({
  children,
  className = ""
}) {
  const { open, setOpen, triggerRef } = useDropdownContext()

  return (
    <div
      ref={triggerRef}
      onClick={() => setOpen(!open)}
      className={`inline-flex ${className}`}
      aria-expanded={open}
      aria-haspopup="true">
      {children}
    </div>
  );
}

// Content component for the dropdown
export function DropdownContent({
  children,
  className = "",
  align = "start",
  side = "left",
  placement = "auto",
  sideOffset = 0
}) {
  const { open, setOpen, triggerRef, contentRef } = useDropdownContext()

  // Close dropdown when clicking outside
  useClickAway([triggerRef, contentRef], () => {
    if (open) setOpen(false)
  })

  // Close dropdown when pressing Escape
  useKeyPress("Escape", () => {
    if (open) setOpen(false)
  })

  // Add state to track the actual placement
  const [actualPlacement, setActualPlacement] = useState(placement)

  // Effect to determine optimal placement when dropdown opens
  React.useEffect(() => {
    if (
      !open ||
      placement !== "auto" ||
      !triggerRef.current ||
      !contentRef.current
    )
      return

    // Get the position of the trigger element
    const triggerRect = triggerRef.current.getBoundingClientRect()
    const contentRect = contentRef.current.getBoundingClientRect()

    // Calculate available space above and below
    const spaceAbove = triggerRect.top
    const spaceBelow = window.innerHeight - triggerRect.bottom

    // Determine if content should appear above or below based on available space
    const contentHeight = contentRect.height

    if (spaceBelow < contentHeight && spaceAbove > spaceBelow) {
      setActualPlacement("top")
    } else {
      setActualPlacement("bottom")
    }
  }, [open, placement, triggerRef, contentRef])

  // Calculate alignment classes
  const alignmentClasses = {
    start: side === "left" ? "left-0" : "right-0",
    center: "left-1/2 -translate-x-1/2",
    end: side === "left" ? "right-0" : "left-0",
  }[align]

  // Calculate position classes
  const positionClasses =
    actualPlacement === "top"
      ? `bottom-full mb-${sideOffset}`
      : `top-full mt-${sideOffset}`

  // Get transform origin based on placement, side, and align
  const getTransformOrigin = () => {
    if (actualPlacement === "top") {
      if (align === "center") {
        return "bottom center"
      }
      // For top placement, adjust based on side and align
      if (
        (side === "left" && align === "start") ||
        (side === "right" && align === "end")
      ) {
        return "bottom left"
      }
      return "bottom right"
    } else {
      if (align === "center") {
        return "top center"
      }
      // For bottom placement, adjust based on side and align
      if (
        (side === "left" && align === "start") ||
        (side === "right" && align === "end")
      ) {
        return "top left"
      }
      return "top right"
    }
  }

  // Create animation variants based on placement, side, and align
  const dropdownVariants = React.useMemo(() => {
    // Determine the y direction based on placement
    const yOffset = actualPlacement === "top" ? 5 : -5

    // Determine the x direction based on side AND align combination
    let xOffset = 0

    if (align === "center") {
      xOffset = 0 // No horizontal offset for center alignment
    } else if (align === "start") {
      xOffset = side === "left" ? -5 : 5
    } else if (align === "end") {
      xOffset = side === "left" ? 5 : -5 // Reversed for "end" alignment
    }

    return {
      hidden: {
        opacity: 0,
        y: yOffset,
        x: xOffset,
        scale: 0.95,
        transition: {
          y: { type: "spring", stiffness: 700, damping: 35 },
          x: { type: "spring", stiffness: 700, damping: 35 },
          opacity: { duration: 0.1, ease: "easeInOut" },
          scale: { duration: 0.1, ease: "easeInOut" },
        },
      },
      visible: {
        opacity: 1,
        y: 0,
        x: 0,
        scale: 1,
        transition: {
          y: { type: "spring", stiffness: 700, damping: 35 },
          x: { type: "spring", stiffness: 700, damping: 35 },
          opacity: { duration: 0.15, ease: "easeInOut" },
          scale: { duration: 0.1, ease: "easeInOut" },
        },
      },
      exit: {
        opacity: 0,
        y: yOffset,
        x: xOffset,
        scale: 0.95,
        transition: {
          y: { type: "spring", stiffness: 500, damping: 25 },
          x: { type: "spring", stiffness: 500, damping: 25 },
          opacity: { duration: 0.1, ease: "easeInOut" },
          scale: { duration: 0.1, ease: "easeInOut" },
        },
      },
    }
  }, [actualPlacement, side, align])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={contentRef}
          variants={dropdownVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          style={{ transformOrigin: getTransformOrigin() }}
          className={`absolute z-[9999] min-w-[8rem] overflow-hidden rounded-md border border-border bg-card text-card-foreground p-1 shadow-md shadow-[0_2px_8px_rgba(0,0,0,0.05)] dark:shadow-[0_2px_10px_rgba(0,0,0,0.3)] ${positionClasses} ${alignmentClasses} ${className}`}
          role="menu"
          aria-orientation="vertical"
          tabIndex={-1}>
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Item component for the dropdown
export function DropdownItem({
  children,
  className = "",
  onClick,
  disabled = false,
  destructive = false
}) {
  const { setOpen } = useDropdownContext()

  const handleClick = () => {
    if (disabled) return
    if (onClick) onClick()
    setOpen(false)
  }

  return (
    <button
      className={`relative flex w-full cursor-pointer select-none items-center rounded-sm px-2 py-2 text-sm outline-none transition-colors ${
        disabled
          ? "pointer-events-none opacity-50 text-muted-foreground"
          : destructive
            ? "text-destructive hover:bg-destructive/10 focus:bg-destructive/10"
            : "text-muted-foreground hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
      } ${className}`}
      onClick={handleClick}
      role="menuitem"
      disabled={disabled}>
      {children}
    </button>
  );
}

// Separator component for the dropdown
export function DropdownSeparator({
  className = ""
}) {
  return (<div className={`mx-1 my-1 h-px bg-border ${className}`} role="separator" />);
}
