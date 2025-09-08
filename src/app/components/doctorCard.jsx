"use client"
import { setDoctor } from "@/app/store/doctorSlice";
import { MapPin, Clock, Star, CheckCircle, XCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";


const DoctorCard = ({ doctor }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleApointment = (doctorSelect) => {
    console.log(doctor);
    dispatch(setDoctor(doctorSelect))
    router.push("/apointment")

  };
  return (
    <div className="bg-gradient-to-r from-gray-50 to-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-all duration-200 w-full max-w-xl mx-auto">
      <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
        {/* Doctor Image + Status */}
        <div className="relative">
          <img
            src={doctor.image}
            alt={doctor.name}
            className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-md"
          />
          <div
            className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-2 border-white ${
              doctor.available ? "bg-green-500" : "bg-red-500"
            } flex items-center justify-center`}
          >
            {doctor.available ? (
              <CheckCircle className="h-3 w-3 text-white" />
            ) : (
              <XCircle className="h-3 w-3 text-white" />
            )}
          </div>
        </div>

        {/* Doctor Info */}
        <div className="flex-1 w-full">
          <h3 className="text-xl font-bold text-gray-800">{doctor.name}</h3>
          <p className="text-blue-600 font-semibold text-lg">
            {doctor.specialization}
          </p>

          <div className="flex flex-wrap items-center gap-4 mt-2">
            <span className="text-gray-600 text-sm">
              {doctor.experience} experience
            </span>
            <div className="flex items-center space-x-1">
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
              <span className="text-gray-700 font-medium">{doctor.rating}</span>
            </div>
          </div>

          {/* Location & Availability */}
          <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              <MapPin className="h-4 w-4" />
              <span>{doctor.location}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="h-4 w-4" />
              <span>{doctor.nextAvailable}</span>
            </div>
          </div>

          {/* Buttons */}
        </div>
      </div>
      <div className="mt-4 flex justify-between flex-wrap gap-2">
        <button onClick={() => handleApointment(doctor)}
         className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium">
          View Profile
        </button>
        <button
          onClick={() => handleApointment(doctor)}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            doctor.available
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
          disabled={!doctor.available}
        >
          {doctor.available ? "Book Appointment" : "Join Waitlist"}
        </button>
      </div>
    </div>
  );
};

export default DoctorCard;
