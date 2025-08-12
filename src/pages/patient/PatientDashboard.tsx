import React from "react";
import {
  Calendar,
  User,
  Clock,
  Bell,
  CheckCircle,
  Stethoscope,
  FileText,
  Star,
  MapPin,
} from "lucide-react";

const PatientDashboard: React.FC = () => {
  const appointments = [
    {
      id: 1,
      doctor: "Dr. Emily Carter",
      specialization: "Cardiologist",
      date: "2025-08-15",
      time: "10:00 AM",
      status: "Confirmed",
      location: "Heart Care Center",
    },
    {
      id: 2,
      doctor: "Dr. Michael Johnson",
      specialization: "Dermatologist",
      date: "2025-08-20",
      time: "2:30 PM",
      status: "Pending",
      location: "Skin Health Clinic",
    },
    {
      id: 3,
      doctor: "Dr. Sarah Wilson",
      specialization: "General Practitioner",
      date: "2025-08-25",
      time: "11:15 AM",
      status: "Confirmed",
      location: "Primary Care Center",
    },
  ];

  const recentDoctors = [
    {
      id: 1,
      name: "Dr. Emily Carter",
      specialization: "Cardiologist",
      rating: 4.8,
      lastVisit: "2025-07-28",
    },
    {
      id: 2,
      name: "Dr. Michael Johnson",
      specialization: "Dermatologist",
      rating: 4.6,
      lastVisit: "2025-07-15",
    },
    {
      id: 3,
      name: "Dr. Sarah Wilson",
      specialization: "General Practitioner",
      rating: 4.9,
      lastVisit: "2025-06-30",
    },
  ];

  const profileStatus = {
    name: "Alex Thompson",
    email: "alex.thompson@email.com",
    phone: "+1 (555) 123-4567",
    status: "Active",
    upcomingAppointments: 3,
    totalAppointments: 15,
    prescriptions: 4,
    unreadMessages: 2,
  };

  const statusColors: Record<string, string> = {
    Confirmed: "bg-green-500 text-green-900",
    Pending: "bg-yellow-400 text-yellow-900",
    Cancelled: "bg-red-500 text-red-900",
    Completed: "bg-blue-500 text-blue-900",
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      {/* Header */}
      <header className="mb-12 text-center max-w-4xl mx-auto">
        <h1 className="text-5xl font-extrabold bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent drop-shadow-lg mb-2">
          Patient Dashboard
        </h1>
        <p className="text-gray-400 text-lg">
          Welcome back,{" "}
          <span className="font-semibold">{profileStatus.name}</span> — Manage
          your healthcare journey.
        </p>
      </header>

      {/* Quick Stats Bar */}
      <section className="max-w-5xl mx-auto mb-12 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center text-gray-300">
        <div className="bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-2xl transition-shadow cursor-default">
          <Calendar className="mx-auto mb-2 w-10 h-10 text-blue-400" />
          <p className="text-4xl font-bold text-white">
            {profileStatus.upcomingAppointments}
          </p>
          <p className="uppercase tracking-wide text-sm">
            Upcoming Appointments
          </p>
        </div>
        <div className="bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-2xl transition-shadow cursor-default">
          <CheckCircle className="mx-auto mb-2 w-10 h-10 text-green-400" />
          <p className="text-4xl font-bold text-white">
            {profileStatus.totalAppointments}
          </p>
          <p className="uppercase tracking-wide text-sm">Total Appointments</p>
        </div>
        <div className="bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-2xl transition-shadow cursor-default">
          <FileText className="mx-auto mb-2 w-10 h-10 text-purple-400" />
          <p className="text-4xl font-bold text-white">
            {profileStatus.prescriptions}
          </p>
          <p className="uppercase tracking-wide text-sm">
            Active Prescriptions
          </p>
        </div>
      </section>

      {/* Main Content Grid */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Upcoming Appointments - Takes 2/3 of the width */}
        <div className="lg:col-span-2 bg-gray-800 rounded-xl p-8 shadow-lg">
          <h2 className="text-3xl font-semibold mb-6 flex items-center gap-3 text-blue-400">
            <Calendar className="w-7 h-7" />
            Upcoming Appointments
          </h2>
          {appointments.length > 0 ? (
            <ul className="space-y-5 max-h-[500px] overflow-y-auto">
              {appointments.map((appt) => (
                <li
                  key={appt.id}
                  className="bg-gray-700 px-6 py-5 rounded-lg hover:bg-gray-600 transition-colors cursor-pointer"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Stethoscope className="w-5 h-5 text-green-400" />
                        <p className="font-semibold text-lg">{appt.doctor}</p>
                      </div>
                      <p className="text-blue-300 text-sm mb-1">
                        {appt.specialization}
                      </p>
                      <div className="flex items-center gap-2 text-gray-400 text-sm mb-1">
                        <MapPin className="w-4 h-4" />
                        <span>{appt.location}</span>
                      </div>
                      <p className="text-sm text-gray-400">{appt.date}</p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <div className="flex items-center gap-2 text-blue-300">
                        <Clock className="w-5 h-5" />
                        <span className="font-medium">{appt.time}</span>
                      </div>
                      <span
                        className={`text-xs font-semibold px-3 py-1 rounded-full ${
                          statusColors[appt.status] ||
                          "bg-gray-400 text-gray-900"
                        }`}
                      >
                        {appt.status}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-400 text-center text-lg py-8">
              No upcoming appointments.
            </p>
          )}
        </div>

        {/* Right Sidebar */}
        <div className="space-y-8">
          {/* Profile Status */}
          <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-3 text-green-400">
              <User className="w-6 h-6" />
              Profile
            </h2>
            <div className="space-y-3 text-sm">
              <p>
                <span className="text-gray-400 font-medium">Name:</span>{" "}
                <span className="text-white">{profileStatus.name}</span>
              </p>
              <p>
                <span className="text-gray-400 font-medium">Email:</span>{" "}
                <span className="text-white">{profileStatus.email}</span>
              </p>
              <p>
                <span className="text-gray-400 font-medium">Phone:</span>{" "}
                <span className="text-white">{profileStatus.phone}</span>
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
          </div>

          {/* Recent Doctors */}
          <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-2xl font-semibold mb-4 flex items-center gap-2 text-purple-400">
              <Stethoscope className="w-6 h-6" />
              Recent Doctors
            </h3>
            <ul className="space-y-3 max-h-60 overflow-y-auto">
              {recentDoctors.map((doctor) => (
                <li
                  key={doctor.id}
                  className="bg-gray-700 rounded-md px-4 py-3 hover:bg-gray-600 transition-colors cursor-pointer"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-semibold text-sm text-white">
                        {doctor.name}
                      </p>
                      <p className="text-xs text-blue-300">
                        {doctor.specialization}
                      </p>
                      <p className="text-xs text-gray-400">
                        Last visit: {doctor.lastVisit}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 text-yellow-400">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="text-xs">{doctor.rating}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Notifications */}
          <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
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
                unread messages from doctors.
              </li>
              <li className="bg-blue-900 bg-opacity-20 rounded-md px-4 py-2 text-sm">
                Appointment reminder: Dr. Emily Carter tomorrow at 10:00 AM.
              </li>
              <li className="bg-green-900 bg-opacity-20 rounded-md px-4 py-2 text-sm">
                Your prescription for heart medication is ready for pickup.
              </li>
              <li className="bg-purple-900 bg-opacity-20 rounded-md px-4 py-2 text-sm">
                Annual health checkup is due next month.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;
