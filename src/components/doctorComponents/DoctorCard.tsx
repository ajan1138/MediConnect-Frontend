import { CheckCircle, MapPin, XCircle } from "lucide-react";
import type { Doctor } from "../../types";
import { getFullName, getSpecializationIcon } from "../../utils/doctorUtils";

interface DoctorCardProps {
  doctor: Doctor;
}

const DoctorCard: React.FC<DoctorCardProps> = ({ doctor }) => (
  <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/30 p-6 hover:bg-gray-700/30 transition-all duration-300 cursor-pointer">
    <div className="flex items-start gap-4 mb-4">
      <div className="w-16 h-16 bg-blue-600/20 rounded-xl flex items-center justify-center flex-shrink-0">
        {getSpecializationIcon(doctor.specialization)}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-xl font-semibold text-white mb-1">
              Dr. {getFullName(doctor)}
            </h3>
            <p className="text-blue-400 font-medium">{doctor.specialization}</p>
            <p className="text-gray-400 text-sm">{doctor.user.email}</p>
          </div>

          <div className="flex flex-col items-end gap-2">
            <div className="flex items-center">
              {doctor.isApproved ? (
                <CheckCircle className="w-4 h-4 text-green-400" />
              ) : (
                <XCircle className="w-4 h-4 text-red-400" />
              )}
              <span className="ml-1 text-xs text-gray-400">
                {doctor.isApproved ? "Approved" : "Pending"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="space-y-3">
      <div className="flex items-center gap-2 text-gray-300">
        <MapPin className="w-4 h-4 text-red-400" />
        <span className="text-sm">{doctor.location}</span>
      </div>

      {doctor.bio && (
        <div className="text-sm text-gray-300 line-clamp-2 leading-relaxed">
          {doctor.bio}
        </div>
      )}

      <div className="flex items-center justify-between pt-2 border-t border-gray-700/50">
        <div className="text-right">
          <p className="text-lg font-bold text-green-400">
            ${doctor.rate.toFixed(2)}
          </p>
          <p className="text-xs text-gray-400">Consultation fee</p>
        </div>
      </div>
    </div>

    <div className="flex gap-3 mt-4 pt-4 border-t border-gray-700/50">
      <button
        className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={!doctor.isApproved}
      >
        {doctor.isApproved ? "Book Appointment" : "Not Available"}
      </button>
      <button className="px-4 py-2 bg-gray-700/50 text-gray-300 rounded-lg hover:bg-gray-600 transition-colors">
        View Profile
      </button>
    </div>
  </div>
);

export default DoctorCard;
