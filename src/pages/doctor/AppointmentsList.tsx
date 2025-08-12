// src/pages/doctor/AppointmentsList.tsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, User, Clock } from "lucide-react";

type AppointmentStatus =
  | "PENDING"
  | "ACCEPTED"
  | "DECLINED"
  | "COMPLETED"
  | "CANCELLED";

interface Appointment {
  id: number;
  patient: string;
  date: string; // ISO date string
  time: string; // e.g. "10:00 AM"
  status: AppointmentStatus;
}

interface PaginatedAppointments {
  content: Appointment[];
  page: number;
  totalPages: number;
}

const AppointmentsList: React.FC = () => {
  const navigate = useNavigate();

  const [appointmentsData, setAppointmentsData] =
    useState<PaginatedAppointments>({
      content: [],
      page: 1,
      totalPages: 1,
    });

  const [statusFilter, setStatusFilter] = useState<string>("");

  const fetchAppointments = async (page: number, status?: string) => {
    // TODO: Replace this with actual API call, example below:
    // const query = new URLSearchParams({ page: String(page), size: "10" });
    // if (status) query.append("status", status);
    // const response = await fetch(`/doctor/appointments?${query.toString()}`);
    // const data = await response.json();
    // setAppointmentsData(data);

    // MOCK DATA for demonstration:
    const mockData: PaginatedAppointments = {
      page,
      totalPages: 3,
      content: [
        {
          id: 1,
          patient: "John Doe",
          date: "2025-08-12",
          time: "10:00 AM",
          status: "PENDING" as AppointmentStatus,
        },
        {
          id: 2,
          patient: "Jane Smith",
          date: "2025-08-12",
          time: "2:00 PM",
          status: "ACCEPTED" as AppointmentStatus,
        },
        {
          id: 3,
          patient: "Michael Johnson",
          date: "2025-08-13",
          time: "9:30 AM",
          status: "COMPLETED" as AppointmentStatus,
        },
      ].filter((a) => !status || a.status === status),
    };
    setAppointmentsData(mockData);
  };

  useEffect(() => {
    fetchAppointments(appointmentsData.page, statusFilter);
  }, [appointmentsData.page, statusFilter]);

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatusFilter(e.target.value);
    setAppointmentsData((prev) => ({ ...prev, page: 1 })); // reset to first page on filter change
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= appointmentsData.totalPages) {
      setAppointmentsData((prev) => ({ ...prev, page: newPage }));
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 p-6 text-white max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-6">Appointments</h1>

      {/* Filter */}
      <div className="mb-6 flex items-center gap-4">
        <label htmlFor="status" className="font-semibold">
          Filter by Status:
        </label>
        <select
          id="status"
          value={statusFilter}
          onChange={handleStatusChange}
          className="bg-gray-800 text-white p-2 rounded-md"
        >
          <option value="">All</option>
          <option value="PENDING">Pending</option>
          <option value="ACCEPTED">Accepted</option>
          <option value="DECLINED">Declined</option>
          <option value="COMPLETED">Completed</option>
          <option value="CANCELLED">Cancelled</option>
        </select>
      </div>

      {/* Appointment List */}
      {appointmentsData.content.length > 0 ? (
        <ul className="space-y-4">
          {appointmentsData.content.map((appt) => (
            <li
              key={appt.id}
              onClick={() => navigate(`/doctor/appointments/${appt.id}`)}
              className="bg-gray-800 p-4 rounded-lg cursor-pointer hover:bg-gray-700 transition-colors flex justify-between items-center"
            >
              <div>
                <p className="font-semibold">{appt.patient}</p>
                <p className="text-sm text-gray-400 flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {new Date(appt.date).toLocaleDateString()}
                </p>
              </div>
              <div className="flex flex-col items-end gap-1">
                <div className="flex items-center gap-2 text-blue-400">
                  <Clock className="w-4 h-4" />
                  <span>{appt.time}</span>
                </div>
                <span
                  className={`text-sm font-semibold ${
                    appt.status === "PENDING"
                      ? "text-yellow-400"
                      : appt.status === "ACCEPTED"
                      ? "text-green-400"
                      : appt.status === "DECLINED"
                      ? "text-red-500"
                      : appt.status === "COMPLETED"
                      ? "text-gray-400"
                      : "text-red-600"
                  }`}
                >
                  {appt.status}
                </span>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-400">No appointments found.</p>
      )}

      {/* Pagination */}
      <div className="flex justify-center gap-4 mt-8">
        <button
          disabled={appointmentsData.page === 1}
          onClick={() => handlePageChange(appointmentsData.page - 1)}
          className="px-4 py-2 rounded-md bg-blue-600 disabled:opacity-50"
        >
          Previous
        </button>
        <span className="px-4 py-2">
          Page {appointmentsData.page} of {appointmentsData.totalPages}
        </span>
        <button
          disabled={appointmentsData.page === appointmentsData.totalPages}
          onClick={() => handlePageChange(appointmentsData.page + 1)}
          className="px-4 py-2 rounded-md bg-blue-600 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AppointmentsList;
