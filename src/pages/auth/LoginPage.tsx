// src/pages/auth/LoginPage.tsx
import React, { useState } from "react";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const validate = () => {
    const newErrors: typeof errors = {};
    if (!email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Email is invalid";

    if (!password) newErrors.password = "Password is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    // TODO: Implement login API call here
    console.log("Logging in with", { email, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4 py-12">
      <form
        onSubmit={handleSubmit}
        className="max-w-md w-full bg-gray-800 p-8 rounded-xl shadow-lg text-white space-y-6"
      >
        <h2 className="text-3xl font-bold text-center mb-6">Login</h2>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block mb-1 font-semibold">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setErrors((prev) => ({ ...prev, email: "" }));
            }}
            className={`w-full rounded-md p-2 text-gray-900 ${
              errors.email ? "border-red-500 border-2" : ""
            }`}
          />
          {errors.email && <p className="text-red-500 mt-1 text-sm">{errors.email}</p>}
        </div>

        {/* Password */}
        <div>
          <label htmlFor="password" className="block mb-1 font-semibold">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setErrors((prev) => ({ ...prev, password: "" }));
            }}
            className={`w-full rounded-md p-2 text-gray-900 ${
              errors.password ? "border-red-500 border-2" : ""
            }`}
          />
          {errors.password && <p className="text-red-500 mt-1 text-sm">{errors.password}</p>}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-500 to-green-400 py-3 rounded-xl font-semibold text-white shadow-lg hover:scale-105 hover:shadow-2xl transition-all duration-300"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
