// src/pages/auth/RegisterPage.tsx
import React, { useState } from "react";
import Label from "../../components/authComponents/Label";
import Button from "../../components/authComponents/Button";
import InputEmail from "../../components/forms/InputEmail";

enum Role {
  PATIENT = "PATIENT",
  DOCTOR = "DOCTOR",
}

interface RegistrationFormState {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: Role | "";
  // Doctor-specific
  specialization: string;
  bio: string;
  location: string;
  rate: string;
  // Patient-specific
  dateOfBirth: string;
}

const RegisterPage: React.FC = () => {
  const [form, setForm] = useState<RegistrationFormState>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "",
    specialization: "",
    bio: "",
    location: "",
    rate: "",
    dateOfBirth: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!form.firstName.trim()) newErrors.firstName = "First name is required";
    if (!form.lastName.trim()) newErrors.lastName = "Last name is required";

    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email))
      newErrors.email = "Email is invalid";

    if (!form.password) newErrors.password = "Password is required";
    else if (form.password.length < 8)
      newErrors.password = "Password must be at least 8 characters";

    if (!form.role) newErrors.role = "Role is required";

    if (form.role === Role.DOCTOR) {
      if (!form.specialization.trim())
        newErrors.specialization = "Specialization is required";
      if (!form.bio.trim()) newErrors.bio = "Bio is required";
      if (!form.location.trim()) newErrors.location = "Location is required";
      if (form.rate && isNaN(Number(form.rate)))
        newErrors.rate = "Rate must be a number";
    }

    if (form.role === Role.PATIENT) {
      if (!form.dateOfBirth)
        newErrors.dateOfBirth = "Date of birth is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    // Prepare data for submission
    // Convert rate to number if Doctor
    const submissionData = {
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email,
      password: form.password,
      role: form.role,
      ...(form.role === Role.DOCTOR && {
        specialization: form.specialization,
        bio: form.bio,
        location: form.location,
        rate: Number(form.rate) || 0,
      }),
      ...(form.role === Role.PATIENT && {
        dateOfBirth: form.dateOfBirth,
      }),
    };

    console.log("Submitting registration:", submissionData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4 py-12">
      <form
        onSubmit={handleSubmit}
        className="max-w-xl w-full bg-gray-800 p-8 rounded-xl shadow-lg text-white space-y-6"
      >
        <h2 className="text-3xl font-bold text-center mb-6">Register</h2>

        {/* Role */}
        <div>
          <Label elem={"role"}>Role</Label>
          <select
            id="role"
            name="role"
            value={form.role}
            onChange={handleChange}
            className={`w-full rounded-md p-2 text-gray-200 border border-gray-200 ${
              errors.role ? "border-red-500 border-2" : ""
            }`}
          >
            <option value="">-- Select Role --</option>
            <option value={Role.PATIENT}>Patient</option>
            <option value={Role.DOCTOR}>Doctor</option>
          </select>
          {errors.role && (
            <p className="text-red-500 mt-1 text-sm">{errors.role}</p>
          )}
        </div>

        {/* First Name */}
        <div>
          <Label elem={"firstName"}>First Name</Label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            className={`w-full rounded-md p-2 text-gray-200 border border-gray-200 ${
              errors.firstName ? "border-red-500 border-2" : ""
            }`}
          />
          {errors.firstName && (
            <p className="text-red-500 mt-1 text-sm">{errors.firstName}</p>
          )}
        </div>

        {/* Last Name */}
        <div>
          <Label elem={"lastName"}>Last Name</Label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            className={`w-full rounded-md p-2  text-gray-200 border border-gray-200 ${
              errors.lastName ? "border-red-500 border-2" : ""
            }`}
          />
          {errors.lastName && (
            <p className="text-red-500 mt-1 text-sm">{errors.lastName}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <InputEmail
            value={form.email}
            onChange={handleChange}
            error={errors.email}
          />
        </div>

        {/* Password */}
        <div>
          <Label elem={"password"}>Password</Label>
          <input
            type="password"
            id="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className={`w-full rounded-md p-2 text-gray-200 border border-gray-200 ${
              errors.password ? "border-red-500 border-2" : ""
            }`}
            placeholder="At least 8 characters"
          />
          {errors.password && (
            <p className="text-red-500 mt-1 text-sm">{errors.password}</p>
          )}
        </div>

        {/* Doctor-specific fields */}
        {form.role === Role.DOCTOR && (
          <>
            {/* Specialization */}
            <div>
              <Label elem={"specialization"}>Specialization</Label>
              <input
                type="text"
                id="specialization"
                name="specialization"
                value={form.specialization}
                onChange={handleChange}
                className={`w-full rounded-md p-2 text-gray-200 border border-gray-200 ${
                  errors.specialization ? "border-red-500 border-2" : ""
                }`}
              />
              {errors.specialization && (
                <p className="text-red-500 mt-1 text-sm">
                  {errors.specialization}
                </p>
              )}
            </div>

            {/* Bio */}
            <div>
              <Label elem={"bio"}>Bio</Label>
              <textarea
                id="bio"
                name="bio"
                value={form.bio}
                onChange={handleChange}
                className={`w-full rounded-md p-2 text-gray-200 border border-gray-200 resize-y ${
                  errors.bio ? "border-red-500 border-2" : ""
                }`}
                rows={3}
              />
              {errors.bio && (
                <p className="text-red-500 mt-1 text-sm">{errors.bio}</p>
              )}
            </div>

            {/* Location */}
            <div>
              <Label elem={"location"}>Location</Label>
              <input
                type="text"
                id="location"
                name="location"
                value={form.location}
                onChange={handleChange}
                className={`w-full rounded-md p-2 text-gray-200 border border-gray-200 ${
                  errors.location ? "border-red-500 border-2" : ""
                }`}
              />
              {errors.location && (
                <p className="text-red-500 mt-1 text-sm">{errors.location}</p>
              )}
            </div>

            {/* Rate */}
            <div>
              <Label elem={"rate"}>Rate (per hour)</Label>
              <input
                type="number"
                id="rate"
                name="rate"
                value={form.rate}
                onChange={handleChange}
                className={`w-full rounded-md p-2 text-gray-200 border border-gray-200 ${
                  errors.rate ? "border-red-500 border-2" : ""
                }`}
                min="0"
                step="0.01"
                placeholder="e.g. 50.00"
              />
              {errors.rate && (
                <p className="text-red-500 mt-1 text-sm">{errors.rate}</p>
              )}
            </div>
          </>
        )}

        {/* Patient-specific fields */}
        {form.role === Role.PATIENT && (
          <div>
            <Label elem={"dateOfBirth"}>Date of Birth</Label>
            <input
              type="date"
              id="dateOfBirth"
              name="dateOfBirth"
              value={form.dateOfBirth}
              onChange={handleChange}
              className={`w-full rounded-md p-2 text-gray-200 border border-gray-200 ${
                errors.dateOfBirth ? "border-red-500 border-2" : ""
              }`}
              max={new Date().toISOString().split("T")[0]}
            />
            {errors.dateOfBirth && (
              <p className="text-red-500 mt-1 text-sm">{errors.dateOfBirth}</p>
            )}
          </div>
        )}

        {/* Submit */}
        <Button onClick={handleSubmit}>Register</Button>
      </form>
    </div>
  );
};

export default RegisterPage;
