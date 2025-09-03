"use client";

import React, { useState, useMemo, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setDoctor } from "@/app/store/doctorSlice";
import { doctorsList } from "../data/doctors";
import { loadDoctorFromStorage } from "@/app/store/doctorSlice";
import { getDatabase, push, ref, set } from "firebase/database";
import moment from "moment";
import toast, { Toaster } from "react-hot-toast";
// Icons
const ChevronLeft = ({ className = "w-6 h-6" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    viewBox="0 0 24 24"
  >
    <path d="m15 18-6-6 6-6" />
  </svg>
);

const ChevronRight = ({ className = "w-6 h-6" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    viewBox="0 0 24 24"
  >
    <path d="m9 18 6-6-6-6" />
  </svg>
);

export default function DoctorAppointment() {
  const db = getDatabase();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);

  const doctorSelect = useSelector((state) => state.doctor.currentDoctor);

  // State
  const [searchTerm, setSearchTerm] = useState("");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(null);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [patientName, setPatientName] = useState("");
  const [patientContact, setPatientContact] = useState("");
  const [bookingId, setBookingId] = useState(null);

  useEffect(() => {
    dispatch(loadDoctorFromStorage());
    ``;
  }, [dispatch]);

  // Calendar logic
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  );
  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();
  const startingDayOfWeek = firstDayOfMonth.getDay();
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const isSameDay = (d1, d2) =>
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate();

  const handlePrevMonth = () =>
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  const handleNextMonth = () =>
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );

  // Time slots
  const availableTimeSlots = useMemo(() => {
    if (!selectedDate) return [];
    const day = selectedDate.getDay();
    const baseSlots = [
      "09:00 AM",
      "09:30 AM",
      "10:00 AM",
      "10:30 AM",
      "11:00 AM",
      "11:30 AM",
      "02:00 PM",
      "02:30 PM",
      "03:00 PM",
      "03:30 PM",
      "04:00 PM",
    ];
    if (day === 0 || day === 6)
      return ["10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM"];
    if (isSameDay(selectedDate, new Date())) return baseSlots.slice(5);
    return baseSlots;
  }, [selectedDate]);

  const handleDateClick = (day) => {
    const newDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day
    );

    if (newDate < today) return;
    setSelectedDate(newDate);
    setSelectedTime(null);
  };

  const handleBooking = (e) => {
    e.preventDefault();
    if (selectedDate && selectedTime && patientName && patientContact) {
      const newBookingId = `BK-${Math.random()
        .toString(36)
        .substring(2, 11)
        .toUpperCase()}`;

    

      set(push(ref(db, "apointment/")), {
        patientName: user.name,
        contact: patientContact,
        doctorName: doctorSelect.name,
        doctorid: doctorSelect.id,
        date: selectedDate.toLocaleString(),
        schedule: selectedTime,
        bookingId : newBookingId,
      })
        .then(() => {
          toast.success("Apoinment Sucussfull")
          setBookingId(newBookingId);
          setBookingConfirmed(true);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const resetBooking = () => {
    setBookingConfirmed(false);
    setSelectedTime(null);
    setPatientName("");
    setPatientContact("");
    setBookingId(null);
  };

  // Live search filtering
  const filteredDoctors = doctorsList.filter((doc) => {
    const name = doc.name ? doc.name.toLowerCase() : "";
    const specialty = doc.specialty
      ? doc.specialty.toLowerCase()
      : doc.specialization
      ? doc.specialization.toLowerCase()
      : "";
    const term = searchTerm.toLowerCase();
    return name.includes(term) || specialty.includes(term);
  });
  const handleSearch = (doc) => {
    dispatch(setDoctor(doc));
    setSearchTerm("");
  };
  if (bookingConfirmed) {
    return (
      <div className="flex items-center justify-center py-20 p-4">
        <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg p-8 text-center">
          <div className="mx-auto rounded-full h-20 w-20 flex items-center justify-center mb-6">
            <svg
              className="h-12 w-12 text-green-600"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Appointment Confirmed!
          </h2>
          <p className="text-gray-600 mb-4">
            Your appointment with{" "}
            <span className="font-semibold text-indigo-600">
              {doctorSelect?.name}
            </span>{" "}
            is scheduled.
          </p>
          <div className="bg-indigo-50 rounded-xl p-4 text-lg font-medium text-indigo-800 mb-4">
            {selectedDate?.toLocaleDateString("en-US", {
              weekday: "long",
              month: "long",
              day: "numeric",
            })}{" "}
            at {selectedTime}
          </div>
          <div className="border-t border-b border-gray-200 py-4 mb-6">
            <p className="text-gray-500 text-sm">Your Booking Serial Number:</p>
            <p className="text-gray-800 font-bold text-xl tracking-wider">
              {bookingId}
            </p>
          </div>
          <button
            onClick={resetBooking}
            className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg hover:bg-indigo-700 transition"
          >
            Book Another Appointment
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center p-4 py-10 container">
      <main className="bg-white rounded-2xl shadow-lg flex flex-col md:flex-row gap-10 overflow-hidden w-full max-w-6xl">
        <Toaster/>
        {/* Left: Doctor Info + Search */}

        <div className="w-full md:w-1/3 bg-indigo-50 p-6 flex flex-col">
          <h3 className="text-xl font-bold text-gray-800 mb-3">
            Find a Doctor
          </h3>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by name or specialty..."
            className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
          />

          {/* Search results */}
          {searchTerm && (
            <div className="max-h-40 overflow-y-auto mb-4 space-y-2">
              {filteredDoctors.length > 0 ? (
                filteredDoctors.map((doc) => (
                  <button
                    key={doc.id}
                    onClick={() => handleSearch(doc)}
                    className={`w-full text-left px-3 py-2 rounded-lg transition ${
                      doctorSelect?.id === doc.id
                        ? "bg-indigo-600 text-white"
                        : "bg-white hover:bg-indigo-100 text-gray-700"
                    }`}
                  >
                    <p className="font-medium">{doc.name}</p>
                    <p className="text-sm text-gray-500">{doc.specialist}</p>
                  </button>
                ))
              ) : (
                <p className="text-gray-500 text-sm">No doctors found</p>
              )}
            </div>
          )}

          {/* Selected doctor (from Redux) */}
          {searchTerm ||
            (doctorSelect && (
              <div className="flex flex-col items-center md:items-start text-center md:text-left mt-6">
                <img
                  src={doctorSelect.avatar || doctorSelect.image}
                  alt={doctorSelect.name}
                  className="w-32 h-32 rounded-full border-4 border-white shadow-md mb-4"
                />
                <h2 className="text-2xl font-bold text-gray-800">
                  {doctorSelect.name}
                </h2>
                <p className="text-indigo-600 font-semibold mb-4">
                  {doctorSelect.specialty}
                </p>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {doctorSelect.bio}
                </p>
              </div>
            ))}
        </div>

        {/* Right: Calendar & Slots */}
        <div className="w-full md:w-2/3 p-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">
            Select a Date & Time
          </h3>

          {/* Calendar */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={handlePrevMonth}
                className="p-2 rounded-full hover:bg-gray-100"
              >
                <ChevronLeft className="w-5 h-5 text-gray-600" />
              </button>
              <h4 className="font-semibold text-gray-700">
                {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
              </h4>
              <button
                onClick={handleNextMonth}
                className="p-2 rounded-full hover:bg-gray-100"
              >
                <ChevronRight className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            <div className="grid grid-cols-7 gap-1 text-center text-sm">
              {daysOfWeek.map((day) => (
                <div key={day} className="font-medium text-gray-500 pb-2">
                  {day}
                </div>
              ))}
              {Array.from({ length: startingDayOfWeek }).map((_, idx) => (
                <div key={`empty-${idx}`} />
              ))}
              {Array.from({ length: daysInMonth }).map((_, day) => {
                const dayNum = day + 1;
                const date = new Date(
                  currentDate.getFullYear(),
                  currentDate.getMonth(),
                  dayNum
                );
                date.setHours(0, 0, 0, 0);
                const isSelected =
                  selectedDate && isSameDay(date, selectedDate);
                const isPast = date < today;
                const isToday = isSameDay(date, new Date());

                return (
                  <button
                    key={dayNum}
                    onClick={() => handleDateClick(dayNum)}
                    disabled={isPast}
                    className={`
                      w-10 h-10 rounded-full flex items-center justify-center transition
                      ${
                        isPast
                          ? "text-gray-300 cursor-not-allowed"
                          : "hover:bg-indigo-100"
                      }
                      ${
                        isToday && !isSelected
                          ? "text-indigo-600 font-bold"
                          : ""
                      }
                      ${
                        isSelected
                          ? "bg-indigo-600 text-white font-bold shadow-md"
                          : "text-gray-700"
                      }
                    `}
                  >
                    {dayNum}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Time Slots */}
          {selectedDate && (
            <div className="mb-6">
              <h4 className="font-semibold text-gray-700 mb-3">
                Available Slots on{" "}
                {selectedDate.toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                })}
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {availableTimeSlots.length > 0 ? (
                  availableTimeSlots.map((time) => (
                    <button
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={`
                        p-2 rounded-lg text-sm font-medium border transition
                        ${
                          selectedTime === time
                            ? "bg-indigo-600 text-white shadow-lg"
                            : "bg-white text-indigo-600 border-indigo-200 hover:bg-indigo-50"
                        }
                      `}
                    >
                      {time}
                    </button>
                  ))
                ) : (
                  <p className="text-gray-500 col-span-full">
                    No available slots for this day.
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Patient Form */}
          {selectedDate && selectedTime && (
            <form onSubmit={handleBooking} className="space-y-4">
              <h4 className="font-semibold text-gray-700 mb-2">
                Patient Details
              </h4>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  required
                  placeholder="e.g., John Doe"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Phone Number or Email
                </label>
                <input
                  type="text"
                  value={patientContact}
                  onChange={(e) => setPatientContact(e.target.value)}
                  required
                  placeholder="Your contact info"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg hover:bg-indigo-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
                disabled={!patientName || !patientContact}
              >
                Book Appointment
              </button>
            </form>
          )}
        </div>
      </main>
    </div>
  );
}
