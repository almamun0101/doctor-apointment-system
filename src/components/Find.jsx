import React, { useState, useEffect } from "react";
import { Search, Stethoscope } from "lucide-react";
import { doctorsList } from "@/app/data/doctors";
import DoctorCard from "./doctorCard";

const specializations = [
  "All Specializations",
  "Cardiology",
  "Neurology",
  "Pediatrics",
  "Orthopedics",
  "Dermatology",
  "General Medicine",
  "Psychiatry",
  "Oncology",
];

export default function DoctorSearchSystem() {
  const [doctors, setDoctors] = useState(doctorsList);
  const [filteredDoctors, setFilteredDoctors] = useState(doctorsList);
  const [searchName, setSearchName] = useState("");
  const [selectedSpecialization, setSelectedSpecialization] = useState(
    "All Specializations"
  );
  const [showOnlyAvailable, setShowOnlyAvailable] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchDoctorsFromFirebase = async () => {
    setLoading(true);
    setTimeout(() => {
      setDoctors(doctorsList);
      setFilteredDoctors(doctorsList);
      setLoading(false);
    }, 500);
  };

  useEffect(() => {
    fetchDoctorsFromFirebase();
  }, []);

  const handleSearch = () => {
    setLoading(true);

    setTimeout(() => {
      let filtered = doctors;

      // Filter by name
      if (searchName.trim()) {
        filtered = filtered.filter((doctor) =>
          doctor.name.toLowerCase().includes(searchName.toLowerCase())
        );
      }

      // Filter by specialization
      if (selectedSpecialization !== "All Specializations") {
        filtered = filtered.filter(
          (doctor) => doctor.specialization === selectedSpecialization
        );
      }

      // Filter by availability
      if (showOnlyAvailable) {
        filtered = filtered.filter((doctor) => doctor.available);
      }

      setFilteredDoctors(filtered);
      setLoading(false);
    }, 300);
  };

  useEffect(() => {
    handleSearch();
  }, [searchName, selectedSpecialization, showOnlyAvailable]);

  return (
    <div className="py-10">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-2 flex items-center space-x-3">
            <Stethoscope className="h-8 w-8 text-blue-600" />
            <span>Find A Doctor</span>
          </h2>
          <p className="text-gray-600">
            Search for healthcare professionals by name or specialization
          </p>

          {/* Search Controls */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            {/* Name Search */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Doctor Name
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />

                <input
                  type="text"
                  value={searchName}
                  onChange={(e) => setSearchName(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Search by doctor name"
                />
              </div>
            </div>

            {/* Specialization Dropdown */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Specialization
              </label>
              <select
                value={selectedSpecialization}
                onChange={(e) => setSelectedSpecialization(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {specializations.map((spec) => (
                  <option key={spec} value={spec}>
                    {spec}
                  </option>
                ))}
              </select>
            </div>

            {/* Availability Toggle */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Availability
              </label>
              <div className="flex items-center space-x-3 py-2">
                <input
                  type="checkbox"
                  id="available-toggle"
                  checked={showOnlyAvailable}
                  onChange={(e) => setShowOnlyAvailable(e.target.checked)}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                />
                <label
                  htmlFor="available-toggle"
                  className="text-sm text-gray-700"
                >
                  Available only
                </label>
              </div>
            </div>

            {/* Search Button */}
            <button
              onClick={handleSearch}
              disabled={loading}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              ) : (
                <Search className="h-4 w-4" />
              )}
              <span>Search</span>
            </button>
          </div>
        </div>

        {/* Search Results */}

        {/* {searchName && (
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-800">
                Search Results ({filteredDoctors.length} doctor
                {filteredDoctors.length !== 1 ? "s" : ""} found)
              </h3>
              {(searchName ||
                selectedSpecialization !== "All Specializations" ||
                showOnlyAvailable) && (
                <button
                  onClick={() => {
                    setSearchName("");
                    setSelectedSpecialization("All Specializations");
                    setShowOnlyAvailable(false);
                  }}
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  Clear Filters
                </button>
              )}
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <span className="ml-3 text-gray-600">Searching doctors...</span>
              </div>
            ) : filteredDoctors.length === 0 ? (
              <div className="text-center py-12">
                <Stethoscope className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h4 className="text-lg font-medium text-gray-600 mb-2">
                  No doctors found
                </h4>
                <p className="text-gray-500">
                  Try adjusting your search criteria
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredDoctors.slice(0, 3).map((doctor) => (
                  <DoctorCard key={doctor.id} doctor={doctor} />
                ))}
              </div>
            )}
          </div>
        )} */}

        {/* Quick Filters */}
        {/* <div className="mt-6 bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Quick Filters
          </h3>
          <div className="flex flex-wrap gap-3">
            {specializations.slice(1).map((spec) => (
              <button
                key={spec}
                onClick={() => setSelectedSpecialization(spec)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedSpecialization === spec
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {spec}
              </button>
            ))}
          </div>
        </div> */}
      </div>
    </div>
  );
}
