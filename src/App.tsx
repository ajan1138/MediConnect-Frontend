import "./App.css";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import AnimatedCursor from "react-animated-cursor";
import HomePage from "./pages/auth/HomePage";
import logo from "./assets/logo.svg";
import bgImage from "./assets/pasa.png";
import RegisterPage from "./pages/auth/RegisterPage";
import LoginPage from "./pages/auth/LoginPage";
import ActivateAccount from "./pages/auth/ActivateAccount";
import DoctorProfilePage from "./pages/auth/DoctorProfilePage";
import DoctorDashboard from "./pages/doctor/DoctorDashboard";

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
const NotFound = () => (
  <div>
    <h1>404 - Page Not Found</h1>
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
              <Route
                path="/"
                element={<HomePage logo={logo} backgroundImage={bgImage} />}
              />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/activate" element={<ActivateAccount />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/doctor/profile" element={<DoctorProfilePage />} />
              <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
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
