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
  Check,
} from "lucide-react";
import { getAuth } from "firebase/auth";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { getDatabase, onValue, ref, update } from "firebase/database";

const Page = () => {
  const db = getDatabase();
  const auth = getAuth();
  const doctor = useSelector((state) => state.user.currentUser);
  const router = useRouter();

  const [myAppointments, setMyAppointments] = useState([]);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  // ✅ Fetch appointments
  useEffect(() => {
    const starCountRef = ref(db, "apointment/");
    const unsubscribe = onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const array = Object.entries(data).map(([id, value]) => ({
          id,
          ...value,
        }));
        setMyAppointments(array);
      } else {
        setMyAppointments([]);
      }
    });
    return () => unsubscribe();
  }, []);

  // ✅ Filter appointments for logged-in doctor & selected date
  const todayAppointments = myAppointments.filter((apt) => {
    console.log(apt.date);

    // apt.date === selectedDate;
  });

  // ✅ Split into pending & completed
  const pendingAppointments = todayAppointments.filter(
    (apt) => apt.status === "pending"
  );
  const completedAppointments = todayAppointments.filter(
    (apt) => apt.status === "completed"
  );

  // ✅ Mark appointment as completed
  const markAsCompleted = async (appointmentId) => {
    const appointmentRef = ref(db, `apointment/${appointmentId}`);
    await update(appointmentRef, { status: "completed" });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-green-800 text-white p-6 rounded-lg">
        <h1 className="text-2xl font-bold mb-2">Doctor Dashboard</h1>
        <p className="opacity-90">
          Welcome, {doctor?.name} - {new Date().toLocaleDateString()}
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Calendar className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Today's Appointments</p>
              <p className="text-2xl font-bold text-gray-900">
                {todayAppointments.length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Bell className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-gray-900">
                {pendingAppointments.length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <TrendingUp className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Completed</p>
              <p className="text-2xl font-bold text-gray-900">
                {completedAppointments.length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* To-do list */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pending list */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold flex items-center">
              <Clock className="h-5 w-5 text-green-600 mr-2" />
              Pending Visits
            </h2>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="px-3 py-1 border rounded-md text-sm"
            />
          </div>
          <div className="space-y-3">
            {pendingAppointments.length > 0 ? (
              pendingAppointments.map((apt) => (
                <div
                  key={apt.id}
                  className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50"
                >
                  <div>
                    <h3 className="font-medium">{apt.patientName}</h3>
                    <p className="text-sm text-gray-600">
                      {apt.type} - {apt.time}
                    </p>
                  </div>
                  <button
                    onClick={() => markAsCompleted(apt.id)}
                    className="flex items-center px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700"
                  >
                    <Check className="h-4 w-4 mr-1" />
                    Done
                  </button>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-sm">No pending visits.</p>
            )}
          </div>
        </div>

        {/* Completed list */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center">
            <Activity className="h-5 w-5 text-purple-600 mr-2" />
            Completed Visits
          </h2>
          <div className="space-y-3">
            {completedAppointments.length > 0 ? (
              completedAppointments.map((apt) => (
                <div
                  key={apt.id}
                  className="flex items-center justify-between p-3 border rounded-lg bg-gray-50"
                >
                  <div>
                    <h3 className="font-medium">{apt.patientName}</h3>
                    <p className="text-sm text-gray-600">
                      {apt.type} - {apt.time}
                    </p>
                  </div>
                  <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                    Completed
                  </span>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-sm">No completed visits yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
