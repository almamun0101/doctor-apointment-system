"use client";
import React, { useState, useEffect } from "react";
import {
  Calendar,
  Clock,
  User,
  Phone,
  Mail,
  MapPin,
  Stethoscope,
  Users,
  TrendingUp,
  Activity,
  Bell,
  Search,
  Filter,
  Plus,
} from "lucide-react";
import { getAuth } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { getDatabase, onValue, ref } from "firebase/database";
import Link from "next/link";

const page = () => {
  const db = getDatabase();
  const auth = getAuth();
  const doctor = useSelector((state) => state.user.currentUser);
  const router = useRouter();
  const [myApointment, setMyApoinment] = useState([]);
  const [activeView, setActiveView] = useState("doctor"); // 'patient' or 'doctor'
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
 console.log(doctor)

  const appointments = [
    {
      id: 1,
      patientName: "Sarah Johnson",
      doctorName: "Dr. Smith",
      time: "09:00 AM",
      duration: "30 min",
      type: "Consultation",
      status: "confirmed",
      date: "2025-09-04",
    },
    {
      id: 2,
      patientName: "Mike Davis",
      doctorName: "Dr. Smith",
      time: "10:30 AM",
      duration: "45 min",
      type: "Follow-up",
      status: "confirmed",
      date: "2025-09-04",
    },
    {
      id: 3,
      patientName: "Emma Wilson",
      doctorName: "Dr. Smith",
      time: "02:00 PM",
      duration: "30 min",
      type: "Check-up",
      status: "pending",
      date: "2025-09-04",
    },
    {
      id: 4,
      patientName: "Robert Brown",
      doctorName: "Dr. Smith",
      time: "03:30 PM",
      duration: "60 min",
      type: "Treatment",
      status: "confirmed",
      date: "2025-09-04",
    },
  ];

  useEffect(() => {
    const starCountRef = ref(db, "apointment/");

    const unsubscribe = onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        // convert object to array with id + values
        const array = Object.entries(data).map(([id, value]) => ({
          id,
          ...value,
        }));
        setMyApoinment(array);
        console.log(array);
      } else {
        setMyApoinment([]); // empty fallback
      }
    });

    return () => unsubscribe(); // cleanup listener
  }, []);

  const doctorStats = {
    todayAppointments: appointments.filter((apt) => apt.date === selectedDate)
      .length,
    totalPatients: 156,
    pendingAppointments: appointments.filter((apt) => apt.status === "pending")
      .length,
    completedToday: 3,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-green-800 text-white p-6 rounded-lg">
        <h1 className="text-2xl font-bold mb-2">Doctor Dashboard</h1>
        <p className="opacity-90">Welcome, {doctor?.name} - {new Date().toLocaleDateString()}</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Calendar className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Today's Appointments</p>
              <p className="text-2xl font-bold text-gray-900">{doctorStats.todayAppointments}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <Users className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Total Patients</p>
              <p className="text-2xl font-bold text-gray-900">{doctorStats.totalPatients}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Bell className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Pending Appointments</p>
              <p className="text-2xl font-bold text-gray-900">{doctorStats.pendingAppointments}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <TrendingUp className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Completed Today</p>
              <p className="text-2xl font-bold text-gray-900">{doctorStats.completedToday}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's Schedule */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <Clock className="h-5 w-5 text-green-600 mr-2" />
              <h2 className="text-lg font-semibold">Today's Schedule</h2>
            </div>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="px-3 py-1 border rounded-md text-sm"
            />
          </div>
          
          <div className="space-y-3">
            {appointments.filter(apt => apt.date === selectedDate).map((appointment) => (
              <div key={appointment.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div>
                    <h3 className="font-medium">{appointment.patientName}</h3>
                    <p className="text-sm text-gray-600">{appointment.type}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">{appointment.time}</p>
                  <p className="text-xs text-gray-500">{appointment.duration}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Patient Search & Quick Actions */}
        <div className="space-y-6">
          {/* Quick Patient Search */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center mb-4">
              <Search className="h-5 w-5 text-green-600 mr-2" />
              <h2 className="text-lg font-semibold">Quick Patient Search</h2>
            </div>
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="Search by name or ID..."
                className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                Search
              </button>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-3">
              <button className="flex items-center justify-center p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                <Plus className="h-5 w-5 text-green-600 mr-2" />
                <span className="text-sm">New Patient</span>
              </button>
              <button className="flex items-center justify-center p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                <Calendar className="h-5 w-5 text-blue-600 mr-2" />
                <span className="text-sm">Schedule</span>
              </button>
              <button className="flex items-center justify-center p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                <Activity className="h-5 w-5 text-purple-600 mr-2" />
                <span className="text-sm">Reports</span>
              </button>
              <button className="flex items-center justify-center p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                <Filter className="h-5 w-5 text-orange-600 mr-2" />
                <span className="text-sm">Filter</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
