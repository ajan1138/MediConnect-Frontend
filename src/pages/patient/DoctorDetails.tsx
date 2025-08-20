// src/pages/doctor/DoctorDetails.tsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Star, MapPin, Briefcase, Mail, Phone, Calendar } from "lucide-react";
import { FaUserDoctor } from "react-icons/fa6";
import ProfileHeader from "../../components/detailsComponents/ProfileHeader";

interface Appointment {
  id: number;
  date: string;
  patientName: string;
  status: string;
}

interface Doctor {
  id: number;
  fullName: string;
  specialization: string;
  location: string;
  bio: string;
  averageRating: number;
  email: string;
  phone: string;
  profileImageUrl?: string;
  yearsOfExperience: number;
  languagesSpoken: string[];
  qualifications: string[];
  availability: string[];
  appointments: Appointment[];
}

const DoctorDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        // Replace with actual API call
        const mockDoctor: Doctor = {
          id: 1,
          fullName: "Dr. Emily Carter",
          specialization: "Cardiology",
          location: "New York, USA",
          bio: "Dedicated cardiologist with over 15 years of experience in preventive cardiology and heart disease management.",
          averageRating: 4.8,
          email: "emily.carter@example.com",
          phone: "+1 (555) 987-6543",
          profileImageUrl: "https://via.placeholder.com/150",
          yearsOfExperience: 15,
          languagesSpoken: ["English", "Spanish"],
          qualifications: [
            "MD - Harvard Medical School",
            "Board Certified in Cardiology",
          ],
          availability: ["Mon-Fri: 09:00 - 17:00", "Sat: 10:00 - 14:00"],
          appointments: [
            {
              id: 1,
              date: "2025-08-18",
              patientName: "John Doe",
              status: "Upcoming",
            },
            {
              id: 2,
              date: "2025-08-12",
              patientName: "Jane Smith",
              status: "Completed",
            },
          ],
        };
        setDoctor(mockDoctor);
      } catch (error) {
        console.error("Error fetching doctor:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctor();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        Loading doctor details...
      </div>
    );
  }

  if (!doctor) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        Doctor not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white px-34 py-10 min-w-screen mx-auto">
      {/* Profile Header */}
      <ProfileHeader
        icon={<FaUserDoctor className="w-10 h-10 text-blue-400" />}
        title={doctor.fullName}
        subtitle={doctor.specialization}
        onBack={() => navigate(-1)}
      />

      {/* Info Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Contact & Bio */}
        <section className="bg-gray-800 p-6 rounded-xl">
          <h2 className="text-2xl font-semibold mb-4 text-blue-400 flex items-center gap-2">
            Contact & Info
          </h2>
          <p className="mb-4 text-gray-300">{doctor.bio}</p>
          <InfoRow icon={<Mail />} label="Email" value={doctor.email} />
          <InfoRow icon={<Phone />} label="Phone" value={doctor.phone} />
          <InfoRow icon={<MapPin />} label="Location" value={doctor.location} />
          <InfoRow
            icon={<Briefcase />}
            label="Experience"
            value={`${doctor.yearsOfExperience} years`}
          />
          <InfoRow
            icon={<Star />}
            label="Rating"
            value={`${doctor.averageRating.toFixed(1)} / 5`}
          />
        </section>

        {/* Qualifications & Languages */}
        <section className="bg-gray-800 p-6 rounded-xl">
          <h2 className="text-2xl font-semibold mb-4 text-green-400">
            Qualifications & Skills
          </h2>
          <h3 className="text-lg font-semibold mb-2">Qualifications</h3>
          <TagList items={doctor.qualifications} />
          <h3 className="text-lg font-semibold mt-4 mb-2">Languages Spoken</h3>
          <TagList items={doctor.languagesSpoken} />
        </section>

        {/* Availability */}
        <section className="bg-gray-800 p-6 rounded-xl">
          <h2 className="text-2xl font-semibold mb-4 text-yellow-400 flex items-center gap-2">
            <Calendar className="w-6 h-6" /> Availability
          </h2>
          <ul className="space-y-2">
            {doctor.availability.map((slot, idx) => (
              <li key={idx} className="text-gray-300">
                {slot}
              </li>
            ))}
          </ul>
        </section>

        {/* Appointment History */}
        <section className="bg-gray-800 p-6 rounded-xl md:col-span-2">
          <h2 className="text-2xl font-semibold mb-4 text-purple-400 flex items-center gap-2">
            <Calendar className="w-6 h-6" /> Recent Appointments
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="pb-2">Date</th>
                  <th className="pb-2">Patient</th>
                  <th className="pb-2">Status</th>
                  <th className="pb-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {doctor.appointments.map((appt) => (
                  <tr
                    key={appt.id}
                    className="border-b border-gray-700 hover:bg-gray-750"
                  >
                    <td className="py-3">
                      {new Date(appt.date).toLocaleDateString()}
                    </td>
                    <td>{appt.patientName}</td>
                    <td>
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          appt.status === "Completed"
                            ? "bg-green-500/20 text-green-400"
                            : "bg-blue-500/20 text-blue-400"
                        }`}
                      >
                        {appt.status}
                      </span>
                    </td>
                    <td>
                      <button
                        onClick={() =>
                          navigate(`/doctor/appointments/${appt.id}`)
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

const InfoRow: React.FC<{
  icon: React.ReactNode;
  label: string;
  value: string;
}> = ({ icon, label, value }) => (
  <div className="flex items-center gap-2 border-b border-gray-700 py-2">
    <span className="text-gray-400">{icon}</span>
    <span className="font-semibold">{label}:</span>
    <span className="ml-1">{value}</span>
  </div>
);

const TagList: React.FC<{ items: string[] }> = ({ items }) => (
  <div className="flex flex-wrap gap-2">
    {items.map((item, index) => (
      <span
        key={index}
        className="bg-gray-700 px-3 py-1 rounded-full text-sm text-gray-200"
      >
        {item}
      </span>
    ))}
  </div>
);

export default DoctorDetails;
