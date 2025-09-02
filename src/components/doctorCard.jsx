import {
  Search,
  Stethoscope,
  MapPin,
  Clock,
  Star,
  CheckCircle,
  XCircle,
} from "lucide-react";

const DoctorCard = ({ doctor }) => (
  <div className="bg-gradient-to-r from-gray-50 to-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-all duration-200">
    <div className="flex items-start space-x-4">
      <div className="relative">
        <img
          src={doctor.image}
          alt={doctor.name}
          className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-md"
        />
        <div
          className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-3 border-white ${
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

      <div className="flex-1">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-xl font-bold text-gray-800">{doctor.name}</h3>
            <p className="text-blue-600 font-semibold text-lg">
              {doctor.specialization}
            </p>
            <div className="flex items-center space-x-4 mt-2">
              <span className="text-gray-600 text-sm">
                {doctor.experience} experience
              </span>
              <div className="flex items-center space-x-1">
                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                <span className="text-gray-700 font-medium">
                  {doctor.rating}
                </span>
              </div>
            </div>
          </div>

          <div
            className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-bold ${
              doctor.available
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {doctor.available ? (
              <>
                <CheckCircle className="h-4 w-4" />
                <span>Available Now</span>
              </>
            ) : (
              <>
                <XCircle className="h-4 w-4" />
                <span>Not Available</span>
              </>
            )}
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center space-x-6 text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              <MapPin className="h-4 w-4" />
              <span>{doctor.location}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="h-4 w-4" />
              <span>Next: {doctor.nextAvailable}</span>
            </div>
          </div>

          <div className="flex space-x-2">
            <button className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium">
              View Profile
            </button>
            <button
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
      </div>
    </div>
  </div>
);
export default DoctorCard;