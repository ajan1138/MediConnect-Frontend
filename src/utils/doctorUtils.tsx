import { Stethoscope, Heart, Brain, Baby, Bone, Eye } from "lucide-react";
import type { Doctor } from "../types";

export const getSpecializationIcon = (specialization: string) => {
  const iconMap: Record<string, JSX.Element> = {
    Cardiologist: <Heart className="w-5 h-5 text-red-400" />,
    Dermatologist: <Stethoscope className="w-5 h-5 text-pink-400" />,
    Pediatrician: <Baby className="w-5 h-5 text-blue-400" />,
    "Orthopedic Surgeon": <Bone className="w-5 h-5 text-yellow-400" />,
    Psychiatrist: <Brain className="w-5 h-5 text-purple-400" />,
    Neurologist: <Brain className="w-5 h-5 text-indigo-400" />,
    Ophthalmologist: <Eye className="w-5 h-5 text-cyan-400" />,
  };

  return (
    iconMap[specialization] || <Stethoscope className="w-5 h-5 text-gray-400" />
  );
};

export const getFullName = (doctor: Doctor): string => {
  return `${doctor.user.firstName} ${doctor.user.lastName}`;
};

// Filter functions
export const filterDoctors = (
  doctors: Doctor[],
  searchQuery: string,
  specializationFilter: string,
  locationFilter: string,
  rateFilter: string,
  approvedFilter: boolean
): Doctor[] => {
  return doctors.filter((doctor) => {
    // Only show approved doctors by default
    if (approvedFilter && !doctor.isApproved) {
      return false;
    }

    const fullName = getFullName(doctor);
    const matchesSearch =
      !searchQuery ||
      fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.specialization.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.user.email.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesSpecialization =
      !specializationFilter || doctor.specialization === specializationFilter;
    const matchesLocation =
      !locationFilter ||
      doctor.location.toLowerCase().includes(locationFilter.toLowerCase());

    const matchesRate =
      !rateFilter ||
      (rateFilter === "0-100" && doctor.rate <= 100) ||
      (rateFilter === "101-200" && doctor.rate > 100 && doctor.rate <= 200) ||
      (rateFilter === "201-300" && doctor.rate > 200 && doctor.rate <= 300) ||
      (rateFilter === "301+" && doctor.rate > 300);

    return (
      matchesSearch && matchesSpecialization && matchesLocation && matchesRate
    );
  });
};

// Sort function
export const sortDoctors = (doctors: Doctor[], sortBy: string): Doctor[] => {
  return [...doctors].sort((a, b) => {
    switch (sortBy) {
      case "rate_low":
        return a.rate - b.rate;
      case "rate_high":
        return b.rate - a.rate;
      case "name":
        return getFullName(a).localeCompare(getFullName(b));
      default:
        return 0;
    }
  });
};
