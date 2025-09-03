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

const page = () => {
  const db = getDatabase()
  const auth = getAuth();
  const patient = useSelector((state) => state.user.currentUser);
  const router = useRouter();
  const [myApointment,setMyApoinment ] = useState([])
  const [activeView, setActiveView] = useState("doctor"); // 'patient' or 'doctor'
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const patientData = {
    id: "P001",
    name: "Sarah Johnson",
    age: 32,
    gender: "Female",
    phone: "+1 (555) 123-4567",
    email: "sarah.johnson@email.com",
    address: "123 Main St, New York, NY 10001",
    bloodType: "A+",
    allergies: ["Penicillin", "Shellfish"],
    emergencyContact: {
      name: "John Johnson",
      relationship: "Spouse",
      phone: "+1 (555) 987-6543",
    },
  };

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
    <div className="space-y-6 container py-10 text-black">
      {/* Header */}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Patient Profile */}
        <div className="lg:col-span-1">
          <div className="bg-white text-black rounded-lg shadow-sm border p-6">
            <div className="flex items-center mb-4">
              <User className="h-5 w-5 text-blue-600 mr-2" />
              <h2 className="text-lg font-semibold">Profile Information</h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <User className="h-8 w-8 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium">{patient?.name}</h3>
                  <p className="text-sm text-gray-600">
                    Patient ID: {patient?.uid}
                  </p>
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t">
                <div className="flex items-center text-sm">
                  <span className="font-medium w-20">Age:</span>
                  <span className="text-gray-600">{patientData.age} years</span>
                </div>
                <div className="flex items-center text-sm">
                  <span className="font-medium w-20">Gender:</span>
                  <span className="text-gray-600">{patientData.gender}</span>
                </div>
                <div className="flex items-center text-sm">
                  <span className="font-medium w-20">Blood Type:</span>
                  <span className="text-gray-600">{patientData.bloodType}</span>
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t">
                <div className="flex items-start text-sm">
                  <Phone className="h-4 w-4 mt-0.5 mr-3 text-gray-400" />
                  <span className="text-gray-600">{patientData.phone}</span>
                </div>
                <div className="flex items-start text-sm">
                  <Mail className="h-4 w-4 mt-0.5 mr-3 text-gray-400" />
                  <span className="text-gray-600">{patientData.email}</span>
                </div>
                <div className="flex items-start text-sm">
                  <MapPin className="h-4 w-4 mt-0.5 mr-3 text-gray-400" />
                  <span className="text-gray-600">{patientData.address}</span>
                </div>
              </div>

              <div className="pt-4 border-t">
                <h4 className="font-medium text-sm mb-2">Allergies</h4>
                <div className="flex flex-wrap gap-2">
                  {patientData.allergies.map((allergy, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded-full"
                    >
                      {allergy}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t">
                <h4 className="font-medium text-sm mb-2">Emergency Contact</h4>
                <div className="text-sm text-gray-600">
                  <p>
                    {patientData.emergencyContact.name} (
                    {patientData.emergencyContact.relationship})
                  </p>
                  <p>{patientData.emergencyContact.phone}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Appointments Section */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <Calendar className="h-5 w-5 text-blue-600 mr-2" />
                <h2 className="text-lg font-semibold">My Appointments</h2>
              </div>
              <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <Plus className="h-4 w-4 mr-2" />
                Book New
              </button>
            </div>

            <div className="space-y-4">
              {appointments
                .filter((apt) => apt.patientName === patientData.name)
                .map((appointment) => (
                  <div
                    key={appointment.id}
                    className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full">
                          <Stethoscope className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-medium">{appointment.type}</h3>
                          <p className="text-sm text-gray-600">
                            with {appointment.doctorName}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center text-sm text-gray-600 mb-1">
                          <Clock className="h-4 w-4 mr-1" />
                          {appointment.schedule} ({appointment.duration})
                        </div>
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            appointment.status === "confirmed"
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {appointment.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-6 grid grid-cols-2 gap-4">
            <div className="bg-white rounded-lg shadow-sm border p-4 text-center hover:shadow-md transition-shadow cursor-pointer">
              <Calendar className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <h3 className="font-medium">Reschedule</h3>
              <p className="text-sm text-gray-600">Change appointment time</p>
            </div>
            <div className="bg-white rounded-lg shadow-sm border p-4 text-center hover:shadow-md transition-shadow cursor-pointer">
              <Activity className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <h3 className="font-medium">Medical Records</h3>
              <p className="text-sm text-gray-600">View your history</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
