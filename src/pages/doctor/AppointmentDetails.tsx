// src/pages/doctor/AppointmentDetails.tsx
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
  Calendar,
  User,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Info,
  ClipboardList,
  FileText,
  MapPin,
} from "lucide-react";

type AppointmentStatus =
  | "PENDING"
  | "ACCEPTED"
  | "DECLINED"
  | "COMPLETED"
  | "CANCELLED";

interface Appointment {
  id: number;
  patient: string;
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
}

interface Patient {
  name: string;
  age: number;
  email: string;
  phone: string;
  address: string;
  gender: string;
  medicalHistory: string[];
  notes?: string;
}

const AppointmentDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  // Mock appointment data
  const [appointment, setAppointment] = useState<Appointment>({
    id: Number(id),
    patient: "John Doe",
    date: "2025-08-12",
    time: "10:00 AM",
    status: "PENDING",
    reason: "Routine Checkup",
    symptoms: "Mild headache, fatigue",
    duration: "30 minutes",
    location: "Room 304, Main Hospital",
    createdAt: "2025-07-30T10:00:00Z",
  });

  // Mock patient data
  const [patient, setPatient] = useState<Patient>({
    name: "John Doe",
    age: 34,
    gender: "Male",
    email: "johndoe@example.com",
    phone: "+123456789",
    address: "123 Main St, City, Country",
    medicalHistory: [
      "Hypertension",
      "Allergic to penicillin",
      "Previous surgery in 2020",
    ],
    notes: "Patient prefers morning appointments.",
  });

  const [doctorNotes, setDoctorNotes] = useState<string>(
    "Initial consultation notes will appear here..."
  );

  const [diagnosis, setDiagnosis] = useState<string>("");

  const [loading, setLoading] = useState(false);

  const handleAction = (
    action: "accept" | "decline" | "complete" | "cancel"
  ) => {
    setLoading(true);
    console.log(`Calling API to ${action} appointment ${appointment.id}`);

    setTimeout(() => {
      let newStatus: AppointmentStatus = appointment.status;
      switch (action) {
        case "accept":
          newStatus = "ACCEPTED";
          appointment.acceptedAt = new Date().toISOString();
          break;
        case "decline":
          newStatus = "DECLINED";
          break;
        case "complete":
          newStatus = "COMPLETED";
          appointment.completedAt = new Date().toISOString();
          break;
        case "cancel":
          newStatus = "CANCELLED";
          break;
      }
      setAppointment({ ...appointment, status: newStatus });
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-10 px-32 min-w-screen mx-auto">
      <h1 className="text-5xl font-extrabold mb-8">Appointment Details</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left - Appointment & Status */}
        <section className="md:col-span-2 space-y-8">
          {/* Basic Info */}
          <div className="bg-gray-800 rounded-xl p-6 shadow-lg space-y-4">
            <h2 className="text-3xl font-semibold flex items-center gap-3">
              <User className="w-7 h-7 text-blue-400" />
              {appointment.patient}
            </h2>
            <p className="text-gray-300 text-lg">
              <Calendar className="inline-block mr-2" />
              {appointment.date}
              {" at "}
              <Clock className="inline-block ml-4 mr-2" />
              {appointment.time}
            </p>

            <p>
              <strong>Reason:</strong> {appointment.reason}
            </p>
            <p>
              <strong>Symptoms:</strong> {appointment.symptoms}
            </p>
            <p>
              <strong>Duration:</strong> {appointment.duration}
            </p>
            <p>
              <strong>Location:</strong>{" "}
              <span className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-red-500" />
                {appointment.location}
              </span>
            </p>

            <StatusBadge status={appointment.status} />

            <div className="mt-4 text-gray-400 text-sm space-y-1">
              <p>
                <strong>Created at:</strong>{" "}
                {new Date(appointment.createdAt).toLocaleString()}
              </p>
              {appointment.acceptedAt && (
                <p>
                  <strong>Accepted at:</strong>{" "}
                  {new Date(appointment.acceptedAt).toLocaleString()}
                </p>
              )}
              {appointment.completedAt && (
                <p>
                  <strong>Completed at:</strong>{" "}
                  {new Date(appointment.completedAt).toLocaleString()}
                </p>
              )}
            </div>
          </div>

          {/* Doctor Notes & Diagnosis */}
          <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-2xl font-semibold mb-3 flex items-center gap-2">
              <ClipboardList className="w-6 h-6 text-green-400" />
              Doctor's Notes & Diagnosis
            </h3>

            <textarea
              className="w-full bg-gray-700 text-white rounded-md p-3 resize-y min-h-[120px]"
              value={doctorNotes}
              onChange={(e) => setDoctorNotes(e.target.value)}
              placeholder="Enter notes here..."
            />

            <textarea
              className="w-full bg-gray-700 text-white rounded-md p-3 mt-4 resize-y min-h-[80px]"
              value={diagnosis}
              onChange={(e) => setDiagnosis(e.target.value)}
              placeholder="Enter diagnosis here..."
            />
          </div>

          {/* Prescription placeholder */}
          <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-2xl font-semibold mb-3 flex items-center gap-2">
              <FileText className="w-6 h-6 text-yellow-400" />
              Prescription
            </h3>
            <p className="text-gray-400 italic mb-4">
              No prescription added yet.
            </p>

            {/* Choose file button */}
            <label className="block cursor-pointer bg-yellow-400 text-gray-900 font-medium py-2 px-4 rounded-lg hover:bg-yellow-300 transition-colors text-center mb-3">
              Choose File
              <input type="file" className="hidden" />
            </label>

            {/* Download/View file buttons */}
            <div className="flex gap-3">
              <button className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-400 transition-colors">
                View File
              </button>
              <button className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-400 transition-colors">
                Download File
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          {appointment.status === "PENDING" && (
            <div className="flex flex-wrap gap-4 mt-6">
              <ActionButton
                disabled={loading || appointment.status !== "PENDING"}
                onClick={() => handleAction("accept")}
                color="green"
                label="Accept"
              />
              <ActionButton
                disabled={loading || appointment.status !== "PENDING"}
                onClick={() => handleAction("decline")}
                color="red"
                label="Decline"
              />
              <ActionButton
                disabled={
                  loading ||
                  (appointment.status !== "PENDING" &&
                    appointment.status !== "ACCEPTED")
                }
                onClick={() => handleAction("cancel")}
                color="yellow"
                label="Cancel"
              />
            </div>
          )}
          {appointment.status === "ACCEPTED" && (
            <ActionButton
              disabled={loading || appointment.status !== "ACCEPTED"}
              onClick={() => handleAction("complete")}
              color="blue"
              label="Complete"
            />
          )}
        </section>

        {/* Right - Patient Info */}
        <aside className="bg-gray-800 rounded-xl p-6 shadow-lg space-y-6 sticky top-6 h-fit">
          <h2 className="text-3xl font-semibold flex items-center gap-3">
            <User className="w-7 h-7 text-green-400" />
            Patient Information
          </h2>

          <div className="space-y-3">
            <p>
              <strong>Name:</strong> {patient.name}
            </p>
            <p>
              <strong>Age:</strong> {patient.age} years
            </p>
            <p>
              <strong>Gender:</strong> {patient.gender}
            </p>
            <p>
              <strong>Email:</strong> {patient.email}
            </p>
            <p>
              <strong>Phone:</strong> {patient.phone}
            </p>
            <p>
              <strong>Address:</strong> {patient.address}
            </p>

            <div>
              <strong>Medical History:</strong>
              <ul className="list-disc ml-5 mt-1 text-gray-400">
                {patient.medicalHistory.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>

            {patient.notes && (
              <p className="mt-4 italic text-gray-400">
                Notes: {patient.notes}
              </p>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
};

interface ActionButtonProps {
  onClick: () => void;
  disabled: boolean;
  color: "green" | "red" | "blue" | "yellow";
  label: string;
}

const ActionButton: React.FC<ActionButtonProps> = ({
  onClick,
  disabled,
  color,
  label,
}) => {
  const colors = {
    green: "bg-green-600 hover:bg-green-700",
    red: "bg-red-600 hover:bg-red-700",
    blue: "bg-blue-600 hover:bg-blue-700",
    yellow: "bg-yellow-500 hover:bg-yellow-600",
  };

  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`${
        colors[color]
      } flex items-center justify-center px-5 py-3 rounded-xl font-semibold shadow-lg transition ${
        disabled ? "opacity-50 cursor-not-allowed" : "hover:scale-105"
      }`}
    >
      {label}
    </button>
  );
};

const StatusBadge: React.FC<{ status: AppointmentStatus }> = ({ status }) => {
  const colors = {
    PENDING: "bg-yellow-400 text-yellow-900",
    ACCEPTED: "bg-green-400 text-green-900",
    DECLINED: "bg-red-400 text-red-900",
    COMPLETED: "bg-blue-400 text-blue-900",
    CANCELLED: "bg-gray-400 text-gray-900",
  };

  return (
    <span
      className={`inline-block px-3 py-1 rounded-full font-semibold ${colors[status]}`}
    >
      {status}
    </span>
  );
};

export default AppointmentDetails;
