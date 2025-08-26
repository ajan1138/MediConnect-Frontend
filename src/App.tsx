import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AnimatedCursor from "react-animated-cursor";
import HomePage from "./pages/auth/HomePage";
import logo from "./assets/logo.svg";
import bgImage from "./assets/pasa.png";
import RegisterPage from "./pages/auth/RegisterPage";
import LoginPage from "./pages/auth/LoginPage";
import ActivateAccount from "./pages/auth/ActivateAccount";
import DoctorDashboard from "./pages/doctor/DoctorDashboard";
import AppointmentsList from "./pages/doctor/AppointmentsList";
import AppointmentDetails from "./pages/doctor/AppointmentDetails";
import PatientDetails from "./pages/doctor/PatientDetails";
import PatientDashboard from "./pages/patient/PatientDashboard";
import PatientSettings from "./pages/patient/PatientSettings";
import NotFound from "./components/dobreKomponente/NotFound";
import DoctorSettings from "./pages/doctor/DoctorSettings";
import DoctorDetails from "./pages/patient/DoctorDetails";
import PatientAppointmentDetails from "./pages/patient/PatientAppointmentDetails";
import PatientAppointmentsList from "./pages/patient/PatientAppointmentList";
import DoctorSearchPage from "./pages/patient/DoctorSearchPage";

const About = () => (
  <div>
    <h1>About Page</h1>
    <p>Learn more about us here.</p>
  </div>
);
const Contact = () => (
  <div>
    <h1>Contact Page</h1>
    <p>Get in touch with us!</p>
  </div>
);

function App() {
  return (
    <>
      <AnimatedCursor
        innerSize={10}
        outerSize={25}
        color="255, 255, 255"
        outerAlpha={0.4}
        innerScale={1}
        outerScale={2}
      />
      <Router>
        <div className="">
          <main>
            <Routes>
              // Routes for no login user
              <Route
                path="/"
                element={<HomePage logo={logo} backgroundImage={bgImage} />}
              />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/activate" element={<ActivateAccount />} />
              <Route path="/login" element={<LoginPage />} />
              // Routes for Doctors
              <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
              <Route path="/doctor/settings" element={<DoctorSettings />} />
              <Route
                path="/doctor/appointments"
                element={<AppointmentsList />}
              />
              <Route
                path="/doctor/appointments/:appointmentId"
                element={<AppointmentDetails />}
              />
              <Route path="/doctor/patient/:id" element={<PatientDetails />} />
              // Routes for Patients
              <Route path="/patient/dashboard" element={<PatientDashboard />} />
              <Route path="/patient/settings" element={<PatientSettings />} />
              <Route path="/patient/doctors" element={<DoctorSearchPage />} />
              <Route path="/patient/doctor/:id" element={<DoctorDetails />} />
              <Route
                path="/patient/appointments"
                element={<PatientAppointmentsList />}
              />
              <Route
                path="/patient/appointments/:id"
                element={<PatientAppointmentDetails />}
              />
              // Routes for common pages
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </div>
      </Router>
    </>
  );
}

export default App;
