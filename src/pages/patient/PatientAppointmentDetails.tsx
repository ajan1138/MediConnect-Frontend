import React, { useState } from "react";
import {
  Calendar,
  User,
  Clock,
  FileText,
  MapPin,
  Download,
  Phone,
  Mail,
  Stethoscope,
  AlertCircle,
  CheckCircle,
  XCircle,
  ArrowLeft,
  Star,
} from "lucide-react";

type AppointmentStatus =
  | "PENDING"
  | "ACCEPTED"
  | "DECLINED"
  | "COMPLETED"
  | "CANCELLED";

interface Appointment {
  id: number;
  doctor: string;
  doctorSpecialty: string;
  date: string;
  time: string;
  status: AppointmentStatus;
  reason: string;
  symptoms: string;
  duration: string;
  location: string;
  createdAt: string;
  acceptedAt?: string;
  completedAt?: string;
  doctorNotes?: string;
  diagnosis?: string;
  prescriptionUrl?: string;
  prescriptionFileName?: string;
}

interface Doctor {
  name: string;
  specialty: string;
  email: string;
  phone: string;
  experience: string;
  rating: number;
  hospitalAffiliation: string;
}

const PatientAppointmentDetails: React.FC = () => {
  // Mock appointment data (in real app, this would come from props or API)
  const [appointment] = useState<Appointment>({
    id: 123,
    doctor: "Dr. Sarah Johnson",
    doctorSpecialty: "Internal Medicine",
    date: "2025-08-12",
    time: "10:00 AM",
    status: "COMPLETED",
    reason: "Routine Checkup",
    symptoms: "Mild headache, fatigue",
    duration: "30 minutes",
    location: "Room 304, Main Hospital",
    createdAt: "2025-07-30T10:00:00Z",
    acceptedAt: "2025-07-30T14:30:00Z",
    completedAt: "2025-08-12T10:30:00Z",
    doctorNotes:
      "Patient shows signs of stress-related symptoms. Blood pressure slightly elevated but within acceptable range. Recommended lifestyle changes including better sleep hygiene and stress management techniques.",
    diagnosis:
      "Stress-related headache and fatigue. Mild hypertension. Overall health is good with minor lifestyle adjustments needed.",
    prescriptionUrl: "/prescriptions/prescription-123.pdf",
    prescriptionFileName: "Prescription_Aug12_2025.pdf",
  });

  // Mock doctor data
  const [doctor] = useState<Doctor>({
    name: "Dr. Sarah Johnson",
    specialty: "Internal Medicine",
    email: "dr.sarah.johnson@hospital.com",
    phone: "+1 (555) 123-4567",
    experience: "12 years",
    rating: 4.8,
    hospitalAffiliation: "Main City Hospital",
  });

  const handleDownloadPrescription = () => {
    if (appointment.prescriptionUrl) {
      // In a real app, this would trigger an actual download
      console.log(
        "Downloading prescription:",
        appointment.prescriptionFileName
      );
      alert(`Downloading: ${appointment.prescriptionFileName}`);
    }
  };

  const handleCancelAppointment = () => {
    if (appointment.status === "PENDING" || appointment.status === "ACCEPTED") {
      const confirmCancel = window.confirm(
        "Are you sure you want to cancel this appointment? This action cannot be undone."
      );
      if (confirmCancel) {
        console.log("Cancelling appointment:", appointment.id);
        alert(
          "Appointment cancellation request sent. You will receive a confirmation shortly."
        );
      }
    }
  };

  const canCancel =
    appointment.status === "PENDING" || appointment.status === "ACCEPTED";
  const isCompleted = appointment.status === "COMPLETED";

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      {/* Header */}
      <header className="mb-12 max-w-5xl mx-auto">
        <button
          onClick={() => alert("Navigating back to appointments...")}
          className="flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Appointments
        </button>

        <h1 className="text-5xl font-extrabold bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent drop-shadow-lg mb-2">
          Appointment Details
        </h1>
        <p className="text-gray-400 text-lg">
          View your appointment information and download prescriptions
        </p>
      </header>

      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Appointment Overview */}
          <div className="bg-gray-800 rounded-xl p-8 shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-semibold flex items-center gap-3 text-blue-400">
                <Calendar className="w-7 h-7" />
                Appointment Overview
              </h2>
              <StatusBadge status={appointment.status} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Stethoscope className="w-6 h-6 text-green-400" />
                  <div>
                    <p className="text-lg font-semibold">
                      {appointment.doctor}
                    </p>
                    <p className="text-blue-300">
                      {appointment.doctorSpecialty}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-blue-400" />
                  <div>
                    <p className="text-gray-400 text-sm">Date</p>
                    <p className="font-semibold">{appointment.date}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-green-400" />
                  <div>
                    <p className="text-gray-400 text-sm">Time</p>
                    <p className="font-semibold">{appointment.time}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-red-500 mt-1" />
                  <div>
                    <p className="text-gray-400 text-sm">Location</p>
                    <p className="font-semibold">{appointment.location}</p>
                  </div>
                </div>

                <div>
                  <p className="text-gray-400 text-sm">Reason for Visit</p>
                  <p className="font-semibold">{appointment.reason}</p>
                </div>

                <div>
                  <p className="text-gray-400 text-sm">Duration</p>
                  <p className="font-semibold">{appointment.duration}</p>
                </div>
              </div>
            </div>

            {appointment.symptoms && (
              <div className="mt-6 p-4 bg-yellow-900 bg-opacity-20 rounded-lg">
                <p className="text-gray-400 text-sm mb-1">Symptoms Reported</p>
                <p className="text-yellow-300">{appointment.symptoms}</p>
              </div>
            )}
          </div>

          {/* Medical Information - Only show if appointment is completed */}
          {isCompleted && (
            <>
              {/* Doctor's Notes */}
              {appointment.doctorNotes && (
                <div className="bg-gray-800 rounded-xl p-8 shadow-lg">
                  <h3 className="text-2xl font-semibold mb-4 flex items-center gap-3 text-green-400">
                    <FileText className="w-6 h-6" />
                    Doctor's Notes
                  </h3>
                  <div className="bg-gray-700 rounded-lg p-6">
                    <p className="text-gray-200 leading-relaxed">
                      {appointment.doctorNotes}
                    </p>
                  </div>
                </div>
              )}

              {/* Diagnosis */}
              {appointment.diagnosis && (
                <div className="bg-gray-800 rounded-xl p-8 shadow-lg">
                  <h3 className="text-2xl font-semibold mb-4 flex items-center gap-3 text-blue-400">
                    <Stethoscope className="w-6 h-6" />
                    Diagnosis
                  </h3>
                  <div className="bg-blue-900 bg-opacity-20 rounded-lg p-6">
                    <p className="text-blue-200 leading-relaxed">
                      {appointment.diagnosis}
                    </p>
                  </div>
                </div>
              )}

              {/* Prescription */}
              <div className="bg-gray-800 rounded-xl p-8 shadow-lg">
                <h3 className="text-2xl font-semibold mb-4 flex items-center gap-3 text-purple-400">
                  <FileText className="w-6 h-6" />
                  Prescription
                </h3>

                {appointment.prescriptionUrl ? (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between bg-gray-700 rounded-lg p-6 hover:bg-gray-600 transition-colors">
                      <div className="flex items-center gap-4">
                        <FileText className="w-10 h-10 text-purple-400" />
                        <div>
                          <p className="font-semibold text-lg">
                            {appointment.prescriptionFileName}
                          </p>
                          <p className="text-gray-400">PDF Document</p>
                        </div>
                      </div>
                      <button
                        onClick={handleDownloadPrescription}
                        className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition-colors hover:shadow-lg"
                      >
                        <Download className="w-5 h-5" />
                        Download
                      </button>
                    </div>
                    <p className="text-gray-400 text-sm italic">
                      Keep your prescription safe and follow the doctor's
                      instructions carefully.
                    </p>
                  </div>
                ) : (
                  <div className="text-center py-12 text-gray-400">
                    <FileText className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p className="text-lg">
                      No prescription available for this appointment.
                    </p>
                  </div>
                )}
              </div>
            </>
          )}

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4">
            {canCancel && (
              <button
                onClick={handleCancelAppointment}
                className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-xl font-semibold flex items-center gap-2 transition-colors hover:shadow-lg"
              >
                <XCircle className="w-5 h-5" />
                Cancel Appointment
              </button>
            )}
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-8">
          {/* Doctor Information */}
          <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-2xl font-semibold mb-4 flex items-center gap-3 text-green-400">
              <User className="w-6 h-6" />
              Doctor Information
            </h3>

            <div className="space-y-4">
              <div>
                <p className="text-xl font-bold">{doctor.name}</p>
                <p className="text-blue-300">{doctor.specialty}</p>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(doctor.rating) ? "fill-current" : ""
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-300">
                  ({doctor.rating}/5.0)
                </span>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-blue-400" />
                  <span className="text-gray-300">{doctor.email}</span>
                </div>

                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-green-400" />
                  <span className="text-gray-300">{doctor.phone}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-700">
                <p className="text-gray-400 text-sm mb-1">Experience</p>
                <p className="font-semibold">{doctor.experience}</p>
              </div>

              <div>
                <p className="text-gray-400 text-sm mb-1">Affiliation</p>
                <p className="font-semibold text-sm">
                  {doctor.hospitalAffiliation}
                </p>
              </div>
            </div>
          </div>

          {/* Appointment Timeline */}
          <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-2xl font-semibold mb-4 text-purple-400">
              Timeline
            </h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                <div>
                  <p className="font-medium">Appointment Created</p>
                  <p className="text-xs text-gray-400">
                    {new Date(appointment.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {appointment.acceptedAt && (
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  <div>
                    <p className="font-medium">Accepted by Doctor</p>
                    <p className="text-xs text-gray-400">
                      {new Date(appointment.acceptedAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              )}

              {appointment.completedAt && (
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
                  <div>
                    <p className="font-medium">Appointment Completed</p>
                    <p className="text-xs text-gray-400">
                      {new Date(appointment.completedAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatusBadge: React.FC<{ status: AppointmentStatus }> = ({ status }) => {
  const statusConfig = {
    PENDING: {
      color: "bg-yellow-400 text-yellow-900",
      icon: <AlertCircle className="w-4 h-4" />,
    },
    ACCEPTED: {
      color: "bg-blue-500 text-blue-900",
      icon: <CheckCircle className="w-4 h-4" />,
    },
    DECLINED: {
      color: "bg-red-500 text-red-900",
      icon: <XCircle className="w-4 h-4" />,
    },
    COMPLETED: {
      color: "bg-green-500 text-green-900",
      icon: <CheckCircle className="w-4 h-4" />,
    },
    CANCELLED: {
      color: "bg-gray-400 text-gray-900",
      icon: <XCircle className="w-4 h-4" />,
    },
  };

  const config = statusConfig[status];

  return (
    <span
      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full font-semibold text-xs ${config.color}`}
    >
      {config.icon}
      {status}
    </span>
  );
};

export default PatientAppointmentDetails;
