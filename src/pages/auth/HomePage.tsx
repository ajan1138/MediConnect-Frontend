// src/pages/auth/HomePage.tsx
import { useNavigate } from "react-router-dom";
import React from "react";

interface HomePageProps {
  logo: string;
  backgroundImage: string;
}

const HomePage: React.FC<HomePageProps> = ({ logo, backgroundImage }) => {
  const navigate = useNavigate();

  return (
    <div
      className="w-screen h-screen flex items-center justify-center relative overflow-hidden"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "100% 100%",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/30"></div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-6xl px-6 text-center">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <img
            src={logo}
            alt="MediConnect Logo"
            className="w-[28rem] h-[28rem] md:w-[32rem] md:h-[32rem] object-contain drop-shadow-2xl"
          />
        </div>

        {/* Tagline */}
        <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6 leading-tight drop-shadow-lg">
          Welcome to MediConnect
        </h1>

        {/* Short intro */}
        <p className="text-lg md:text-2xl text-gray-200 max-w-3xl mx-auto mb-10 leading-relaxed">
          Your trusted platform for connecting patients with doctors, booking
          appointments, and managing your health records — all in one place.
        </p>

        {/* Buttons with gradient - Modified to have single login button */}
        <div className="flex flex-col sm:flex-row gap-5 justify-center">
          <button
            onClick={() => navigate("/login")}
            className="px-8 py-4 bg-gradient-to-r from-blue-500 to-green-400 text-white rounded-xl font-semibold shadow-lg hover:scale-106 hover:shadow-2xl transition-all duration-300"
          >
            Login to MediConnect
          </button>

          <button
            onClick={() => navigate("/register")}
            className="px-8 py-4 bg-gradient-to-r from-blue-500 to-green-400 text-white rounded-xl font-semibold shadow-lg hover:scale-106 hover:shadow-2xl transition-all duration-300"
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
