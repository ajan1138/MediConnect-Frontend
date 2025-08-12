// src/pages/doctor/PatientDetails.tsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { User, HeartPulse, ClipboardList, Calendar } from "lucide-react";

interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  email: string;
  phone: string;
  address: string;
  bloodType: string;
  allergies: string[];
  conditions: string[];
  medications: string[];
  appointments: Array<{
    id: number;
    date: string;
    reason: string;
    status: string;
  }>;
}

const PatientDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch patient details
    const fetchPatient = async () => {
      try {
        // Replace with actual API call: /doctor/patients/{id}
        const mockPatient: Patient = {
          id: "pat-12345",
          name: "John Doe",
          age: 42,
          gender: "Male",
          email: "john.doe@example.com",
          phone: "+1 (555) 123-4567",
          address: "123 Main St, Anytown, USA",
          bloodType: "O+",
          allergies: ["Penicillin", "Shellfish"],
          conditions: ["Hypertension", "Type 2 Diabetes"],
          medications: ["Lisinopril 10mg", "Metformin 500mg"],
          appointments: [
            {
              id: 1,
              date: "2025-08-15",
              reason: "Follow-up",
              status: "Upcoming",
            },
            {
              id: 2,
              date: "2025-07-20",
              reason: "Annual Checkup",
              status: "Completed",
            },
          ],
        };
        setPatient(mockPatient);
      } catch (error) {
        console.error("Error fetching patient:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPatient();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        Loading patient details...
      </div>
    );
  }

  if (!patient) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        Patient not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-start mb-8">
        <h1 className="text-4xl font-bold flex items-center gap-3">
          <User className="w-10 h-10 text-blue-400" />
          {patient.name}
        </h1>
        <button
          onClick={() => navigate(-1)}
          className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-md"
        >
          Back
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Personal Information */}
        <section className="bg-gray-800 p-6 rounded-xl">
          <h2 className="text-2xl font-semibold mb-4 text-blue-400">
            Personal Information
          </h2>
          <div className="space-y-3">
            <InfoRow label="Age" value={`${patient.age} years`} />
            <InfoRow label="Gender" value={patient.gender} />
            <InfoRow label="Email" value={patient.email} />
            <InfoRow label="Phone" value={patient.phone} />
            <InfoRow label="Address" value={patient.address} />
            <InfoRow label="Blood Type" value={patient.bloodType} />
          </div>
        </section>

        {/* Medical Information */}
        <section className="bg-gray-800 p-6 rounded-xl">
          <h2 className="text-2xl font-semibold mb-4 text-green-400 flex items-center gap-2">
            <HeartPulse className="w-6 h-6" />
            Medical Information
          </h2>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Allergies</h3>
            <TagList
              items={patient.allergies}
              emptyMessage="No known allergies"
            />
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Chronic Conditions</h3>
            <TagList
              items={patient.conditions}
              emptyMessage="No chronic conditions"
            />
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Current Medications</h3>
            <TagList
              items={patient.medications}
              emptyMessage="No current medications"
            />
          </div>
        </section>

        {/* Appointment History */}
        <section className="md:col-span-2 bg-gray-800 p-6 rounded-xl">
          <h2 className="text-2xl font-semibold mb-4 text-yellow-400 flex items-center gap-2">
            <Calendar className="w-6 h-6" />
            Appointment History
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="pb-2">Date</th>
                  <th className="pb-2">Reason</th>
                  <th className="pb-2">Status</th>
                  <th className="pb-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {patient.appointments.map((appointment) => (
                  <tr
                    key={appointment.id}
                    className="border-b border-gray-700 hover:bg-gray-750"
                  >
                    <td className="py-3">
                      {new Date(appointment.date).toLocaleDateString()}
                    </td>
                    <td>{appointment.reason}</td>
                    <td>
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          appointment.status === "Completed"
                            ? "bg-green-500/20 text-green-400"
                            : "bg-blue-500/20 text-blue-400"
                        }`}
                      >
                        {appointment.status}
                      </span>
                    </td>
                    <td>
                      <button
                        onClick={() =>
                          navigate(`/doctor/appointments/${appointment.id}`)
                        }
                        className="text-blue-400 hover:text-blue-300"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
};

// Helper components
const InfoRow: React.FC<{ label: string; value: string }> = ({
  label,
  value,
}) => (
  <div className="flex border-b border-gray-700 pb-2">
    <span className="font-semibold w-1/3">{label}:</span>
    <span>{value}</span>
  </div>
);

const TagList: React.FC<{ items: string[]; emptyMessage: string }> = ({
  items,
  emptyMessage,
}) => (
  <div>
    {items.length > 0 ? (
      <div className="flex flex-wrap gap-2">
        {items.map((item, index) => (
          <span
            key={index}
            className="bg-gray-700 px-3 py-1 rounded-full text-sm"
          >
            {item}
          </span>
        ))}
      </div>
    ) : (
      <p className="text-gray-400 italic">{emptyMessage}</p>
    )}
  </div>
);

export default PatientDetails;
