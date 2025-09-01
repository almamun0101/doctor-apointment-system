"use client";
import React from "react"

import { cn } from "@/lib/utils"

const AvatarCircles = ({
  numPeople,
  className,
  avatarUrls
}) => {
  return (
    <div className={cn("z-10 flex -space-x-4 rtl:space-x-reverse", className)}>
      {avatarUrls.map((url, index) => (
        <img
          key={index}
          className="h-8 w-8 rounded-full border-2 border-white dark:border-gray-800"
          src={url}
          width={20}
          height={20}
          alt={`Avatar ${index + 1}`} />
      ))}
      <a
        className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-pri text-center text-xs font-medium text-white hover:bg-gray-600 dark:border-gray-800 dark:bg-white dark:text-black"
        href="">
        +{numPeople}
      </a>
    </div>
  );
}

export { AvatarCircles }
