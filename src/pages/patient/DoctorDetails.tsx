import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Star, MapPin, Briefcase, Mail, Calendar } from "lucide-react";
import { FaUserDoctor } from "react-icons/fa6";
import ProfileHeader from "../../components/detailsComponents/ProfileHeader";
import InfoRow from "../../components/patientComponents/InfoRow";

interface User {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  profileImageUrl?: string;
}

export interface Doctor {
  id: number;
  user: User;
  specialization: string;
  bio: string;
  location: string;
  isApproved: boolean;
  rate: number;
  createdDate: string;
  lastModifiedDate: string;
}

const DoctorDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        // Replace this mock with your real API call
        const mockDoctor: Doctor = {
          id: 1,
          user: {
            id: 10,
            fullName: "Dr. Emily Carter",
            email: "emily.carter@example.com",
            phone: "+1 (555) 987-6543",
            profileImageUrl: "https://via.placeholder.com/150",
          },
          specialization: "Cardiology",
          bio: "Dedicated cardiologist with over 15 years of experience in preventive cardiology and heart disease management.",
          location: "New York, USA",
          isApproved: true,
          rate: 4.8,
          createdDate: "2024-01-12T10:30:00",
          lastModifiedDate: "2025-08-10T12:45:00",
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
    <div className="min-h-screen bg-gray-900 text-white px-6 py-10 mx-auto">
      {/* Profile Header */}
      <ProfileHeader
        icon={<FaUserDoctor className="w-10 h-10 text-blue-400" />}
        title={doctor.user.fullName}
        subtitle={doctor.specialization}
        onBack={() => navigate(-1)}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
        {/* Contact & Bio */}
        <section className="bg-gray-800 p-6 rounded-xl">
          <h2 className="text-2xl font-semibold mb-4 text-blue-400">
            Contact & Info
          </h2>
          <p className="mb-4 text-gray-300">{doctor.bio}</p>
          <InfoRow icon={<Mail />} label="Email" value={doctor.user.email} />
          <InfoRow icon={<MapPin />} label="Location" value={doctor.location} />
          <InfoRow
            icon={<Briefcase />}
            label="Approval"
            value={doctor.isApproved ? "Approved" : "Pending"}
          />
          <InfoRow
            icon={<Star />}
            label="Rate"
            value={`${doctor.rate.toFixed(1)} / 5`}
          />
        </section>

        {/* Metadata */}
        <section className="bg-gray-800 p-6 rounded-xl">
          <h2 className="text-2xl font-semibold mb-4 text-green-400">
            Profile Metadata
          </h2>
          <InfoRow
            icon={<Calendar />}
            label="Created"
            value={new Date(doctor.createdDate).toLocaleDateString()}
          />
          <InfoRow
            icon={<Calendar />}
            label="Last Modified"
            value={new Date(doctor.lastModifiedDate).toLocaleDateString()}
          />
        </section>
      </div>
    </div>
  );
};

export default DoctorDetails;
