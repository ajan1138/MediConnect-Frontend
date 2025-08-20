// src/pages/doctor/AppointmentsList.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Calendar,
  User,
  Clock,
  Filter,
  Search,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
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
  patientImage?: string;
  date: string;
  time: string;
  status: AppointmentStatus;
  type: string;
  duration: string;
}

const AppointmentsList: React.FC = () => {
  const navigate = useNavigate();
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [dateFilter, setDateFilter] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [showFilters, setShowFilters] = useState<boolean>(false);

  // Mock data - to be replaced with API calls later
  const appointments: Appointment[] = [
    {
      id: 1,
      patient: "John Doe",
      date: "2025-08-12",
      time: "10:00 AM",
      status: "PENDING",
      type: "Follow-up",
      duration: "30 min",
    },
    {
      id: 2,
      patient: "Jane Smith",
      date: "2025-08-12",
      time: "2:00 PM",
      status: "ACCEPTED",
      type: "New Patient",
      duration: "45 min",
    },
    {
      id: 3,
      patient: "Michael Johnson",
      date: "2025-08-13",
      time: "9:30 AM",
      status: "COMPLETED",
      type: "Consultation",
      duration: "60 min",
    },
    {
      id: 4,
      patient: "Sarah Williams",
      date: "2025-08-13",
      time: "11:00 AM",
      status: "ACCEPTED",
      type: "Check-up",
      duration: "30 min",
    },
    {
      id: 5,
      patient: "Robert Brown",
      date: "2025-08-13",
      time: "3:00 PM",
      status: "PENDING",
      type: "Follow-up",
      duration: "45 min",
    },
  ];

  const statusColors: Record<AppointmentStatus, string> = {
    PENDING: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    ACCEPTED: "bg-green-500/20 text-green-400 border-green-500/30",
    DECLINED: "bg-red-500/20 text-red-400 border-red-500/30",
    COMPLETED: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    CANCELLED: "bg-gray-500/20 text-gray-400 border-gray-500/30",
  };

  const filteredAppointments = appointments.filter((appt) => {
    const matchesStatus = !statusFilter || appt.status === statusFilter;
    const matchesDate = !dateFilter || appt.date === dateFilter;
    const matchesSearch =
      !searchQuery ||
      appt.patient.toLowerCase().includes(searchQuery.toLowerCase()) ||
      appt.type.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesStatus && matchesDate && matchesSearch;
  });

  const itemsPerPage = 5;
  const totalPages = Math.ceil(filteredAppointments.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedAppointments = filteredAppointments.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Appointments</h1>
          <button
            className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
            onClick={() => navigate("/doctor/schedule")}
          >
            + New Appointment
          </button>
        </div>

        {/* Filters and Search */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/30 mb-8">
          <div className="flex flex-col md:flex-row gap-4 justify-between">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search patients or appointment types..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-700/50 border border-gray-600/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              className="flex items-center gap-2 px-4 py-2 bg-gray-700/50 border border-gray-600/30 rounded-lg hover:bg-gray-700 transition-colors"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="w-5 h-5" />
              Filters
              <ChevronDown
                className={`w-4 h-4 transition-transform ${
                  showFilters ? "rotate-180" : ""
                }`}
              />
            </button>
          </div>

          {/* Expanded Filters */}
          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 pt-4 border-t border-gray-700/30">
              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  Status
                </label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full p-2 bg-gray-700/50 border border-gray-600/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Statuses</option>
                  <option value="PENDING">Pending</option>
                  <option value="ACCEPTED">Accepted</option>
                  <option value="DECLINED">Declined</option>
                  <option value="COMPLETED">Completed</option>
                  <option value="CANCELLED">Cancelled</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">Date</label>
                <input
                  type="date"
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                  className="w-full p-2 bg-gray-700/50 border border-gray-600/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">Type</label>
                <select className="w-full p-2 bg-gray-700/50 border border-gray-600/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="">All Types</option>
                  <option value="checkup">Check-up</option>
                  <option value="followup">Follow-up</option>
                  <option value="consultation">Consultation</option>
                  <option value="newpatient">New Patient</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Appointments List */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/30 overflow-hidden">
          {paginatedAppointments.length > 0 ? (
            <div className="divide-y divide-gray-700/30">
              {paginatedAppointments.map((appt) => (
                <div
                  key={appt.id}
                  onClick={() => navigate(`/doctor/appointments/${appt.id}`)}
                  className="p-6 hover:bg-gray-700/30 transition-colors cursor-pointer grid grid-cols-1 md:grid-cols-3 gap-4"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center">
                      <User className="w-6 h-6 text-blue-400" />
                    </div>
                    <div>
                      <p className="font-semibold">{appt.patient}</p>
                      <p className="text-sm text-gray-400">{appt.type}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-gray-300">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(appt.date).toLocaleDateString()}</span>
                    <Clock className="w-4 h-4 ml-4" />
                    <span>{appt.time}</span>
                    <span className="text-gray-500">• {appt.duration}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium border ${
                        statusColors[appt.status]
                      }`}
                    >
                      {appt.status}
                    </span>
                    <button
                      className="px-3 py-1 bg-gray-700/50 rounded-lg text-sm hover:bg-gray-600 transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/doctor/appointments/${appt.id}`);
                      }}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-12 text-center">
              <div className="w-24 h-24 mx-auto bg-gray-700/30 rounded-full flex items-center justify-center mb-4">
                <Calendar className="w-10 h-10 text-gray-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                No appointments found
              </h3>
              <p className="text-gray-400 mb-6">
                Try adjusting your filters or search query
              </p>
              <button
                className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                onClick={() => {
                  setStatusFilter("");
                  setDateFilter("");
                  setSearchQuery("");
                }}
              >
                Clear all filters
              </button>
            </div>
          )}

          {/* Pagination */}
          {filteredAppointments.length > 0 && (
            <div className="flex justify-between items-center p-6 border-t border-gray-700/30">
              <p className="text-gray-400">
                Showing {startIndex + 1} to{" "}
                {Math.min(
                  startIndex + itemsPerPage,
                  filteredAppointments.length
                )}{" "}
                of {filteredAppointments.length} results
              </p>

              <div className="flex gap-2">
                <button
                  disabled={currentPage === 1}
                  onClick={() => handlePageChange(currentPage - 1)}
                  className="p-2 bg-gray-700/50 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700 transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`w-10 h-10 rounded-lg ${
                        currentPage === page
                          ? "bg-blue-600"
                          : "bg-gray-700/50 hover:bg-gray-700"
                      }`}
                    >
                      {page}
                    </button>
                  )
                )}

                <button
                  disabled={currentPage === totalPages}
                  onClick={() => handlePageChange(currentPage + 1)}
                  className="p-2 bg-gray-700/50 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700 transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AppointmentsList;
