"use client";
import React, { useEffect, useState } from "react";
import {
  Plus,
  Trash2,
  Clock,
  User,
  Calendar,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { getDatabase, push, ref, set, update } from "firebase/database";
import firebaseConfig from "../firebase.config";
import useFetchData from "../data/useFetchData";

const AdminControlPanel = () => {
  const db = getDatabase();
  const [requests, setRequest] = useState(0);
  const [confirmed, setConfirmed] = useState(0);
  const doctorsListFetch = useFetchData("doctorList");
  const appointmentFetch = useFetchData("apointment");

  const doctorsList = doctorsListFetch.data;
  const appointmentList = appointmentFetch.data;

  const doctorsLoading = doctorsListFetch.loading;
  const appointmentLoading = appointmentFetch.loading;
  const [activeTab, setActiveTab] = useState("requests");
  const [doctorForm, setDoctorForm] = useState({
    name: "",
    specialty: "",
    phone: "",
    hospital: "",
    experience: "",
    study: "",
    email: "",
    bio: "",
    image: "",
  });

  // Add new doctor
  const addDoctor = () => {
    if (doctorForm.name && doctorForm.specialty) {
      const newDoctor = {
        id: Date.now(),
        ...doctorForm,
      };

      // Save to Firebase (auto ID from push)
      set(push(ref(db, "doctorList/")), {
        ...doctorForm,
      })
        .then(() => {
          console.log("Data send");
        })
        .catch((error) => {
          console.log(error);
        });

      // Update local state
      setDoctors([...doctors, newDoctor]);

      // Reset form
      setDoctorForm({
        name: "",
        specialty: "",
        phone: "",
        hospital: "",
        experience: "",
        study: "",
        email: "",
        bio: "",
        image: "",
      });
    }
  };

  // Delete doctor
  const deleteDoctor = (id) => {
    setDoctors(doctors.filter((doctor) => doctor.id !== id));
  };

  // Confirm appointment request
  const confirmAppointment = (apointmentid) => {
    const request = appointmentList.find((req) => req.uid === apointmentid);
    console.log(request);

    if (request) {
      const serialNumber = generateSerialNumber(request.doctorId, request.date);

      const appointmentRef = ref(db, `apointment/${apointmentid}`);
      console.log(apointmentid);
      update(ref(db, `apointment/${apointmentid}`), {
        status: "confirmed",
      })
        .then(() => {
          console.log("Value updated successfully.");
        })
        .catch((error) => {
          console.error("Error updating value:", error);
        });
    }
  };

  // Reject appointment request
  const pendingAppointment = (requestId) => {};

  // Delete confirmed appointment
  const deleteAppointment = (appointmentId) => {
    setConfirmedAppointments(
      confirmedAppointments.filter((app) => app.id !== appointmentId)
    );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDoctorForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    addDoctor();
    console.log("Doctor data:", doctorForm);
    // 👉 Here you can add Firebase save logic
  };

  //Requst count
  const requestedCount = appointmentList?.filter(
    (apointment) => apointment.status === "requested"
  ).length;

  useEffect(() => {
    setRequest(requestedCount);
  }, [requestedCount, setRequest]);

  //Confirmed  count
  const confiremedCount = appointmentList?.filter(
    (apointment) => apointment.status === "confirmed"
  ).length;

  useEffect(() => {
    setConfirmed(confiremedCount);
  }, [confiremedCount, setConfirmed]);

  return (
    <div className="container min-h-screen text-black">
      <div className=" mx-auto">
        <h1 className="text-xl font-bold text-gray-900 py-4">
          Medical Admin Control Panel
        </h1>

        <skeleton />

        {/* Tab Navigation */}
        <div className="flex space-x-1 mb-2 bg-white/50 text-gray-700 p-1 rounded-lg w-fit">
          <button
            onClick={() => setActiveTab("requests")}
            className={`px-4 py-2 rounded-md font-medium transition-colors ${
              activeTab === "requests"
                ? "bg-white text-blue-600 shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Appointment Requests ({requests})
          </button>
          <button
            onClick={() => setActiveTab("confirmed")}
            className={`px-4 py-2 rounded-md font-medium transition-colors ${
              activeTab === "confirmed"
                ? "bg-white text-blue-600 shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Confirmed Appointments ({confirmed})
          </button>
          <button
            onClick={() => setActiveTab("doctors")}
            className={`px-4 py-2 rounded-md font-medium transition-colors ${
              activeTab === "doctors"
                ? "bg-white text-blue-600 shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Doctors Management
          </button>
        </div>

        {/* Appointment Requests Tab */}
        {appointmentLoading ? (
          <div>
            <div role="status" className="max-w-sm animate-pulse">
              <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5"></div>
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5"></div>
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        ) : (
          <div>
            {activeTab === "requests" && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <Clock className="mr-2 text-orange-600" size={20} />
                  Pending Appointment Requests
                </h2>

                {appointmentList.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">
                    No pending appointment requests
                  </p>
                ) : (
                  <div className="grid gap-4">
                    {appointmentList.map((apointment) => (
                      <div key={apointment.id}>
                        {apointment.status === "requested" && (
                          <div className="border border-gray-200 rounded-lg p-4">
                            <div className="flex justify-between items-start">
                              <div className="flex-1">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div>
                                    <p className="font-medium text-gray-900">
                                      {apointment.patientName}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                      {apointment.phone}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                      Reason: {apointment.type}
                                    </p>
                                  </div>
                                  <div>
                                    <p className="text-sm text-gray-600">
                                      {/* Doctor: {getDoctorName(apointment.doctorId)} */}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                      Date: {apointment.date}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                      Time: {apointment.schedule}
                                    </p>
                                  </div>
                                </div>
                              </div>
                              <div className="flex space-x-2 ml-4">
                                <button
                                  onClick={() =>
                                    confirmAppointment(apointment.id)
                                  }
                                  className="bg-green-600 text-white px-3 py-1 rounded-lg hover:bg-green-700 transition-colors flex items-center text-sm"
                                >
                                  <CheckCircle className="mr-1" size={14} />
                                  Confirm
                                </button>
                                <button
                                  onClick={() =>
                                    pendingAppointment(apointment.id)
                                  }
                                  className="bg-yellow-500 text-white px-3 py-1 rounded-lg hover:bg-red-700 transition-colors flex items-center text-sm"
                                >
                                  <XCircle className="mr-1" size={14} />
                                  Pending
                                </button>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Confirmed Appointments Tab */}
        {appointmentLoading ? (
          <div className="">
            <div role="status" className="max-w-sm animate-pulse">
              <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5"></div>
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5"></div>
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 justify-start items- gap-10">
            {/* Confimed Appointment */}
            <div className="">
            {activeTab === "confirmed" && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <Calendar className="mr-2 text-green-600" size={20} />
                  Confirmed Appointments
                </h2>
                {appointmentList?.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">
                    No confirmed appointments
                  </p>
                ) : (
                  <div className="grid gap-4">
                    {appointmentList?.map((appointment) => (
                      <div key={appointment.id}>
                        {appointment.status === "confirmed" && (
                          <div className="border border-gray-200 rounded-lg p-4 bg-green-50">
                            <div className="flex justify-between items-start">
                              <div className="flex-1">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                  <div>
                                    <p className="font-medium text-gray-900">
                                      #{appointment.serialNumber} -{" "}
                                      {appointment.patientName}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                      {appointment.phone}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                      Reason: {appointment.reason}
                                    </p>
                                  </div>
                                  <div>
                                    <p className="text-sm text-gray-600">
                                      {/* Doctor: {getDoctorName(appointment.doctorId)} */}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                      Date: {appointment.date}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                      Time: {appointment.time}
                                    </p>
                                  </div>
                                  <div>
                                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                      Serial #{appointment.serialNumber}
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <button
                                onClick={() =>
                                  deleteAppointment(appointment.id)
                                }
                                className="text-red-600 hover:text-red-800 p-2 rounded-lg hover:bg-red-50 ml-4"
                              >
                                <Trash2 size={18} />
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
            </div>

            {/* pending appointment */}
            <div className="">
              {activeTab === "confirmed" && (
                <div className="bg-white rounded-lg shadow-md p-6 my-10">
                  <h2 className="text-xl font-semibold mb-4 flex items-center">
                    <Calendar className="mr-2 text-yellow-400" size={20} />
                    Pending Appointments
                  </h2>
                  {appointmentList?.length === 0 ? (
                    <p className="text-gray-500 text-center py-8">
                      No confirmed appointments
                    </p>
                  ) : (
                    <div className="grid gap-4">
                      {appointmentList?.map((appointment) => (
                        <div key={appointment.id}>
                          {appointment.status === "pending" && (
                            <div className="border border-gray-200 rounded-lg p-4 bg-green-50">
                              <div className="flex justify-between items-start">
                                <div className="flex-1">
                                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div>
                                      <p className="font-medium text-gray-900">
                                        #{appointment.serialNumber} -{" "}
                                        {appointment.patientName}
                                      </p>
                                      <p className="text-sm text-gray-600">
                                        {appointment.phone}
                                      </p>
                                      <p className="text-sm text-gray-600">
                                        Reason: {appointment.reason}
                                      </p>
                                    </div>
                                    <div>
                                      <p className="text-sm text-gray-600">
                                        {/* Doctor: {getDoctorName(appointment.doctorId)} */}
                                      </p>
                                      <p className="text-sm text-gray-600">
                                        Date: {appointment.date}
                                      </p>
                                      <p className="text-sm text-gray-600">
                                        Time: {appointment.time}
                                      </p>
                                    </div>
                                    <div>
                                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                        Serial #{appointment.serialNumber}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                                <button
                                  onClick={() =>
                                    deleteAppointment(appointment.id)
                                  }
                                  className="text-red-600 hover:text-red-800 p-2 rounded-lg hover:bg-red-50 ml-4"
                                >
                                  <Trash2 size={18} />
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Doctors Management Tab */}
        {doctorsLoading ? (
          <div className="">
            <div role="status" className="max-w-sm animate-pulse">
              <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5"></div>
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5"></div>
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        ) : (
          <div>
            {activeTab === "doctors" && (
              <div className="space-y-6 grid md:grid-cols-2">
                {/* Add Doctor Form */}
                <form
                  onSubmit={handleSubmit}
                  className="hidden mx-auto p-6 bg-white shadow-md rounded-lg space-y-4"
                >
                  {/* Name */}
                  <input
                    type="text"
                    name="name"
                    value={doctorForm.name}
                    onChange={handleChange}
                    placeholder="Doctor Name"
                    className="w-full p-2 border rounded"
                  />

                  {/* Specialty */}
                  <input
                    type="text"
                    name="specialty"
                    value={doctorForm.specialty}
                    onChange={handleChange}
                    placeholder="Specialty"
                    className="w-full p-2 border rounded"
                  />

                  {/* Phone */}
                  <input
                    type="text"
                    name="phone"
                    value={doctorForm.phone}
                    onChange={handleChange}
                    placeholder="Phone"
                    className="w-full p-2 border rounded"
                  />

                  {/* Hospital */}
                  <input
                    type="text"
                    name="hospital"
                    value={doctorForm.hospital}
                    onChange={handleChange}
                    placeholder="Hospital"
                    className="w-full p-2 border rounded"
                  />

                  {/* Experience */}
                  <input
                    type="number"
                    name="experience"
                    value={doctorForm.experience}
                    onChange={handleChange}
                    placeholder="Experience (Years)"
                    className="w-full p-2 border rounded"
                  />

                  {/* Study */}
                  <input
                    type="text"
                    name="study"
                    value={doctorForm.study}
                    onChange={handleChange}
                    placeholder="Study / University"
                    className="w-full p-2 border rounded"
                  />

                  {/* Email */}
                  <input
                    type="email"
                    name="email"
                    value={doctorForm.email}
                    onChange={handleChange}
                    placeholder="Email"
                    className="w-full p-2 border rounded"
                  />

                  {/* Bio */}
                  <textarea
                    name="bio"
                    value={doctorForm.bio}
                    onChange={handleChange}
                    placeholder="Doctor Bio"
                    rows="4"
                    className="w-full p-2 border rounded"
                  />

                  {/* Image URL */}
                  <input
                    type="text"
                    name="image"
                    value={doctorForm.image}
                    onChange={handleChange}
                    placeholder="Image URL"
                    className="w-full p-2 border rounded"
                  />

                  {/* Submit */}
                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                  >
                    Save Doctor
                  </button>
                </form>

                {/* Doctors List */}
                <div className="bg-white/20 rounded-lg shadow-md p-6">
                  <h2 className="text-xl font-semibold mb-4">
                    Current Doctors
                  </h2>
                  <div className="grid gap-4">
                    {doctorsList?.map((doctor) => (
                      <div
                        key={doctor.id}
                        className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
                      >
                        <div className="flex items-center space-x-4">
                          <User className="text-blue-600" size={24} />
                          <div>
                            <h3 className="font-medium text-gray-900">
                              {doctor.name}
                            </h3>
                            <p className="text-sm text-gray-600">
                              {doctor.specialty}
                            </p>
                            <p className="text-sm text-gray-500">
                              {doctor.phone}
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() => deleteDoctor(doctor.id)}
                          className="text-red-600 hover:text-red-800 p-2 rounded-lg hover:bg-red-50"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminControlPanel;
