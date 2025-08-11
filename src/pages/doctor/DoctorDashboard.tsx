// src/pages/doctor/Dashboard.tsx
import React from "react";
import {
  Calendar,
  User,
  Clock,
  Bell,
  CheckCircle,
  ClockAlert,
} from "lucide-react";

const DoctorDashboard: React.FC = () => {
  const appointments = [
    {
      id: 1,
      patient: "John Doe",
      date: "2025-08-12",
      time: "10:00 AM",
      status: "Confirmed",
    },
    {
      id: 2,
      patient: "Jane Smith",
      date: "2025-08-12",
      time: "2:00 PM",
      status: "Pending",
    },
    {
      id: 3,
      patient: "Michael Johnson",
      date: "2025-08-13",
      time: "9:30 AM",
      status: "Confirmed",
    },
  ];

  const profileStatus = {
    name: "Dr. Emily Carter",
    specialization: "Cardiologist",
    status: "Active",
    totalPatients: 120,
    appointmentsToday: 3,
    pendingRequests: 2,
    unreadMessages: 5,
  };

  const statusColors: Record<string, string> = {
    Confirmed: "bg-green-500 text-green-900",
    Pending: "bg-yellow-400 text-yellow-900",
    Cancelled: "bg-red-500 text-red-900",
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      {/* Header */}
      <header className="mb-12 text-center max-w-4xl mx-auto">
        <h1 className="text-5xl font-extrabold bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent drop-shadow-lg mb-2">
          Doctor Dashboard
        </h1>
        <p className="text-gray-400 text-lg">
          Welcome back,{" "}
          <span className="font-semibold">{profileStatus.name}</span> — Here's
          your overview for today.
        </p>
      </header>

      {/* Quick Stats Bar */}
      <section className="max-w-5xl mx-auto mb-12 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center text-gray-300">
        <div className="bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-2xl transition-shadow cursor-default">
          <CheckCircle className="mx-auto mb-2 w-10 h-10 text-green-400" />
          <p className="text-4xl font-bold text-white">
            {profileStatus.totalPatients}
          </p>
          <p className="uppercase tracking-wide text-sm">Total Patients</p>
        </div>
        <div className="bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-2xl transition-shadow cursor-default">
          <Calendar className="mx-auto mb-2 w-10 h-10 text-blue-400" />
          <p className="text-4xl font-bold text-white">
            {profileStatus.appointmentsToday}
          </p>
          <p className="uppercase tracking-wide text-sm">
            Today's Appointments
          </p>
        </div>
        <div className="bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-2xl transition-shadow cursor-default">
          <ClockAlert className="mx-auto mb-2 w-10 h-10 text-yellow-400" />
          <p className="text-4xl font-bold text-white">
            {profileStatus.pendingRequests}
          </p>
          <p className="uppercase tracking-wide text-sm">Pending Requests</p>
        </div>
      </section>

      {/* Centered Content Container */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Upcoming Appointments */}
        <div className="md:col-span-2 bg-gray-800 rounded-xl p-8 shadow-lg">
          <h2 className="text-3xl font-semibold mb-6 flex items-center gap-3 text-blue-400">
            <Calendar className="w-7 h-7" />
            Upcoming Appointments
          </h2>
          {appointments.length > 0 ? (
            <ul className="space-y-5 max-h-[400px] overflow-y-auto">
              {appointments.map((appt) => (
                <li
                  key={appt.id}
                  className="bg-gray-700 px-6 py-4 rounded-lg flex justify-between items-center hover:bg-gray-600 transition-colors cursor-pointer"
                >
                  <div>
                    <p className="font-semibold text-lg">{appt.patient}</p>
                    <p className="text-sm text-gray-400">{appt.date}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-blue-300">
                      <Clock className="w-5 h-5" />
                      <span>{appt.time}</span>
                    </div>
                    <span
                      className={`text-xs font-semibold px-3 py-1 rounded-full ${
                        statusColors[appt.status] || "bg-gray-400 text-gray-900"
                      }`}
                    >
                      {appt.status}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-400 text-center text-lg">
              No upcoming appointments.
            </p>
          )}
        </div>

        {/* Profile Status & Notifications */}
        <div className="bg-gray-800 rounded-xl p-8 shadow-lg flex flex-col gap-10">
          <section>
            <h2 className="text-3xl font-semibold mb-6 flex items-center gap-3 text-green-400">
              <User className="w-7 h-7" />
              Profile Status
            </h2>
            <div className="space-y-4 text-lg">
              <p>
                <span className="text-gray-400 font-medium">Name:</span>{" "}
                {profileStatus.name}
              </p>
              <p>
                <span className="text-gray-400 font-medium">
                  Specialization:
                </span>{" "}
                {profileStatus.specialization}
              </p>
              <p>
                <span className="text-gray-400 font-medium">Status:</span>{" "}
                <span
                  className={`font-semibold ${
                    profileStatus.status === "Active"
                      ? "text-green-400"
                      : "text-yellow-400"
                  }`}
                >
                  {profileStatus.status}
                </span>
              </p>
            </div>
          </section>

          <section>
            <h3 className="text-2xl font-semibold mb-4 flex items-center gap-2 text-yellow-400">
              <Bell className="w-6 h-6" />
              Notifications
            </h3>
            <ul className="space-y-3 text-gray-300 max-h-40 overflow-y-auto">
              <li className="bg-yellow-900 bg-opacity-20 rounded-md px-4 py-2 text-sm">
                You have{" "}
                <span className="font-semibold">
                  {profileStatus.unreadMessages}
                </span>{" "}
                unread messages.
              </li>
              <li className="bg-yellow-900 bg-opacity-20 rounded-md px-4 py-2 text-sm">
                Your profile is fully up to date.
              </li>
              <li className="bg-yellow-900 bg-opacity-20 rounded-md px-4 py-2 text-sm">
                You have{" "}
                <span className="font-semibold">
                  {profileStatus.pendingRequests}
                </span>{" "}
                appointment requests pending approval.
              </li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
