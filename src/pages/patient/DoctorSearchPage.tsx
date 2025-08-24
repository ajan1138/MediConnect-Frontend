import React, { useState, useEffect } from "react";

import type { Doctor } from "../../types";
import SearchAndFilters from "../../components/doctorComponents/SearchAndFilter";
import { useDoctorFilters } from "../../hooks/useDoctorFilters";
import { usePagination } from "../../hooks/usePagination";
import Pagination from "../../components/doctorComponents/Pagination";
import DoctorsGrid from "../../components/doctorComponents/DoctorsGrid";

const DoctorSearchPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [specializationFilter, setSpecializationFilter] = useState<string>("");
  const [locationFilter, setLocationFilter] = useState<string>("");
  const [rateFilter, setRateFilter] = useState<string>("");
  const [approvedFilter, setApprovedFilter] = useState<boolean>(true);
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>("name");
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Mock data that matches your backend structure
  const mockDoctors: Doctor[] = [
    {
      id: 1,
      user: {
        id: 101,
        firstName: "Sarah",
        lastName: "Johnson",
        email: "sarah.johnson@medical.com",
        dateOfBirth: "1980-05-15",
        isAccountLocked: false,
        isEnabled: true,
      },
      specialization: "Cardiologist",
      bio: "Experienced cardiologist with expertise in interventional cardiology.",
      location: "Downtown Medical Center",
      isApproved: true,
      rate: 200.0,
      createdDate: "2023-01-15T10:30:00",
      lastModifiedDate: "2023-08-20T14:45:00",
    },
    {
      id: 2,
      user: {
        id: 102,
        firstName: "Michael",
        lastName: "Chen",
        email: "michael.chen@clinic.com",
        dateOfBirth: "1975-11-22",
        isAccountLocked: false,
        isEnabled: true,
      },
      specialization: "Dermatologist",
      bio: "Board-certified dermatologist specializing in skin cancer screening.",
      location: "Westside Clinic",
      isApproved: true,
      rate: 180.0,
      createdDate: "2023-02-10T09:15:00",
      lastModifiedDate: "2023-08-18T11:20:00",
    },
    {
      id: 3,
      user: {
        id: 103,
        firstName: "Emily",
        lastName: "Rodriguez",
        email: "emily.rodriguez@hospital.com",
        dateOfBirth: "1985-03-08",
        isAccountLocked: false,
        isEnabled: true,
      },
      specialization: "Pediatrician",
      bio: "Dedicated pediatrician focused on child development.",
      location: "Children's Health Center",
      isApproved: true,
      rate: 150.0,
      createdDate: "2023-03-05T14:20:00",
      lastModifiedDate: "2023-08-22T16:30:00",
    },
    {
      id: 4,
      user: {
        id: 104,
        firstName: "James",
        lastName: "Wilson",
        email: "james.wilson@sports.com",
        dateOfBirth: "1978-07-30",
        isAccountLocked: false,
        isEnabled: true,
      },
      specialization: "Orthopedic Surgeon",
      bio: "Orthopedic surgeon with specialization in sports injuries.",
      location: "Sports Medicine Institute",
      isApproved: true,
      rate: 250.0,
      createdDate: "2023-01-28T11:45:00",
      lastModifiedDate: "2023-08-19T09:10:00",
    },
    {
      id: 5,
      user: {
        id: 105,
        firstName: "Lisa",
        lastName: "Anderson",
        email: "lisa.anderson@mental.com",
        dateOfBirth: "1982-12-14",
        isAccountLocked: false,
        isEnabled: true,
      },
      specialization: "Psychiatrist",
      bio: "Compassionate psychiatrist specializing in anxiety and depression.",
      location: "Mental Health Center",
      isApproved: true,
      rate: 220.0,
      createdDate: "2023-04-17T13:25:00",
      lastModifiedDate: "2023-08-21T15:40:00",
    },
    {
      id: 6,
      user: {
        id: 106,
        firstName: "Robert",
        lastName: "Kim",
        email: "robert.kim@neuro.com",
        dateOfBirth: "1972-09-05",
        isAccountLocked: false,
        isEnabled: true,
      },
      specialization: "Neurologist",
      bio: "Neurologist with expertise in stroke care and epilepsy management.",
      location: "Brain & Spine Center",
      isApproved: false,
      rate: 240.0,
      createdDate: "2023-05-22T16:50:00",
      lastModifiedDate: "2023-08-23T10:15:00",
    },
  ];

  // Use custom hooks
  const { filteredDoctors, sortedDoctors } = useDoctorFilters(
    doctors,
    searchQuery,
    specializationFilter,
    locationFilter,
    rateFilter,
    approvedFilter,
    sortBy
  );

  const itemsPerPage = 6;
  const {
    currentPage,
    totalPages,
    paginatedData: paginatedDoctors,
    startIndex,
    goToPage,
    nextPage,
    prevPage,
    setCurrentPage,
  } = usePagination(sortedDoctors, itemsPerPage);

  // Simulate API call
  useEffect(() => {
    const fetchDoctors = async () => {
      setLoading(true);
      try {
        setDoctors(mockDoctors);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch doctors:", error);
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [
    searchQuery,
    specializationFilter,
    locationFilter,
    rateFilter,
    approvedFilter,
    sortBy,
    setCurrentPage,
  ]);

  const handleClearFilters = () => {
    setSearchQuery("");
    setSpecializationFilter("");
    setLocationFilter("");
    setRateFilter("");
    setApprovedFilter(true);
    setCurrentPage(1);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p>Loading doctors...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Find a Doctor</h1>
            <p className="text-gray-400 mt-2">
              Search and book appointments with qualified healthcare
              professionals
            </p>
          </div>
        </div>

        {/* Search and Filters */}
        <SearchAndFilters
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          sortBy={sortBy}
          setSortBy={setSortBy}
          showFilters={showFilters}
          setShowFilters={setShowFilters}
          specializationFilter={specializationFilter}
          setSpecializationFilter={setSpecializationFilter}
          locationFilter={locationFilter}
          setLocationFilter={setLocationFilter}
          rateFilter={rateFilter}
          setRateFilter={setRateFilter}
          approvedFilter={approvedFilter}
          setApprovedFilter={setApprovedFilter}
          onClearFilters={handleClearFilters}
        />

        {/* Results Summary */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-gray-400">
            Found {filteredDoctors.length} doctor
            {filteredDoctors.length !== 1 ? "s" : ""}
          </p>
        </div>

        {/* Doctors Grid */}
        <DoctorsGrid
          doctors={paginatedDoctors}
          onClearFilters={handleClearFilters}
        />

        {/* Pagination */}
        {sortedDoctors.length > 0 && totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            startIndex={startIndex}
            itemsPerPage={itemsPerPage}
            totalItems={sortedDoctors.length}
            onPageChange={goToPage}
            onNextPage={nextPage}
            onPrevPage={prevPage}
          />
        )}
      </div>
    </div>
  );
};

export default DoctorSearchPage;
