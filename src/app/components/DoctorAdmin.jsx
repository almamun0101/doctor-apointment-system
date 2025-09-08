"use client";
import React, { useEffect, useState } from "react";
import { getDatabase, push, ref, set, update } from "firebase/database";
import useFetchData from "@/app/data/useFetchData";
import { Trash2, User } from "lucide-react";
import firebaseConfig from "@/app/firebase.config";
import { CiSearch } from "react-icons/ci";

const DoctorAdmin = () => {
  const db = getDatabase();
  const doctorsListFetch = useFetchData("doctorList");
  const [doctorAdd, setDoctorAdd] = useState(false);
  const [query, setQuery] = useState("");
  const appointmentFetch = useFetchData("apointment");

  const appointmentList = appointmentFetch.data;
  const [showPatients, setShowPatients] = useState(null);
  // console.log(appointmentList)
  const doctorsList = doctorsListFetch.data;
  const [allDoctor, setAllDoctor] = useState();
  const doctorsLoading = doctorsListFetch.loading;
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
    status: "unavailable",
    visit: "500",
  });

  // Add new doctor
  const addDoctor = () => {
    if (doctorForm.name && doctorForm.specialty) {
      set(push(ref(db, "doctorList/")), {
        ...doctorForm,
      })
        .then(() => {
          console.log("Data send");
        })
        .catch((error) => {
          console.log(error);
        });

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
        status: "",
        visit: "",
      });
    }
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
  };
  //   useEffect(() => {
  //     if (appointmentList?.length > 0) {
  //       const ids = appointmentList.map((appointment) => appointment.doctorName);
  //       setDcotorAppoinmetn(ids);

  //     }
  //   }, [appointmentList]);

  const totallPatient = (id) => {
    const mypaitents = appointmentList.filter((a) => a.doctorid === id);
    return mypaitents;
  };

  const handlePatientView = (id) => {
    setShowPatients(showPatients === id ? null : id);
  };

  const filterDoctorList = query
    ? doctorsList.filter((d) =>
        d.name.toLowerCase().includes(query.toLowerCase())
      )
    : doctorsList;

  return (
    <div className="container">
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
        <div className="space-y-6">
          {/* Add Doctor Form */}

          {doctorAdd ? (
            <form
              onSubmit={handleSubmit}
              className=" inset-0 flex items-center justify-center bg-opacity-40 z-50"
            >
              <div className="w-full bg-white shadow-lg rounded-xl p-6 relative">
                {/* Close Button */}
                <button
                  type="button"
                  onClick={() => setDoctorAdd(!doctorAdd)}
                  className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>

                <h2 className="text-xl font-semibold mb-6 text-center">
                  Doctor Form
                </h2>

                {/* Two Column Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    className="w-full p-2 border rounded md:col-span-2"
                  />

                  {/* Bio */}
                  <textarea
                    name="bio"
                    value={doctorForm.bio}
                    onChange={handleChange}
                    placeholder="Doctor Bio"
                    rows="4"
                    className="w-full p-2 border rounded md:col-span-2"
                  />

                  {/* Image URL */}
                  <input
                    type="text"
                    name="image"
                    value={doctorForm.image}
                    onChange={handleChange}
                    placeholder="Image URL"
                    className="w-full p-2 border rounded md:col-span-2"
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="w-full mt-6 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                >
                  Save Doctor
                </button>
              </div>
            </form>
          ) : (
            <div className="grid  grid-cols-1 md:grid-cols-2  justify-between gap-5">
              <div className="w-full bg-white rounded-lg max-h-2/3 overflow-auto shadow-md p-6">
                <div className="flex justify-between items-center pb-4">
                  <h2 className="text-xl font-semibold">
                    {query ? "Results " : "All Doctors"} (
                    {filterDoctorList.length})
                  </h2>
                  <div className="flex gap-2 ">
                    <div className="relative">
                      <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="border border-black/40 rounded-2xl p-1 px-5"
                      />
                      {!query ? (
                        <CiSearch
                          size={20}
                          className="absolute top-1/2 -translate-y-1/2 right-5"
                        />
                      ) : (
                        <button
                          onClick={() => setQuery("")}
                          className="absolute top-1/2 -translate-y-1/2 right-5"
                        >
                          ✕
                        </button>
                      )}
                    </div>
                    <button
                      onClick={() => setDoctorAdd(!doctorAdd)}
                      className="bg-green-400 text-white px-5 py-1 rounded-2xl"
                    >
                      Add
                    </button>
                  </div>
                </div>
                <div className="grid gap-4">
                  {filterDoctorList.map((doctor) => {
                    const mypaitent = totallPatient(doctor.id);

                    return (
                      <div
                        key={doctor.id}
                        className="relative flex flex-col bg-gray-100 border border-gray-200 rounded-lg p-4"
                      >
                        {/* Doctor info */}
                        <div className="flex items-center justify-between">
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

                          <div className="flex flex-col items-end space-y-2">
                            <button
                              onClick={() => handlePatientView(doctor.id)}
                              className="border border-black rounded-lg px-2 py-1 text-sm"
                            >
                              {mypaitent.length}
                            </button>
                            <button
                              onClick={() => deleteDoctor(doctor.id)}
                              className="text-red-600 hover:text-red-800 p-2 rounded-lg hover:bg-red-50"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </div>

                        {/* Patient section */}
                        {showPatients === doctor.id && (
                          <div className="mt-4 bg-gray-200 p-4 rounded-lg transition-all duration-300">
                            {mypaitent.map((p, i) => (
                              <div key={i} className="">
                                {p.patientName}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="w-full max-h-2/3 bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold mb-4">
                    Current Doctors
                  </h2>
                  <div className="flex gap-2 ">
                    <div className="relative">
                      <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="border border-black/40 rounded-2xl p-1 px-5"
                      />
                      {!query ? (
                        <CiSearch
                          size={20}
                          className="absolute top-1/2 -translate-y-1/2 right-5"
                        />
                      ) : (
                        <button
                          onClick={() => setQuery("")}
                          className="absolute top-1/2 -translate-y-1/2 right-5"
                        >
                          ✕
                        </button>
                      )}
                    </div>
                    <button
                      onClick={() => setDoctorAdd(!doctorAdd)}
                      className="bg-green-400 text-white px-5 py-1 rounded-2xl"
                    >
                      Add
                    </button>
                  </div>
                </div>

                <div className="grid gap-4">
                  {doctorsList
                    ?.filter((a) => a.status === "available")
                    .map((doctor) => (
                      <div
                        key={doctor.id}
                        className="flex bg-gray-100 items-center justify-between p-4 border border-gray-200 rounded-lg"
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
  );
};

export default DoctorAdmin;
