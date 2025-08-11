// src/pages/doctor/DoctorProfilePage.tsx
import React, { useEffect, useState } from "react";
import Label from "../../components/authComponents/Label";
import Input from "../../components/authComponents/Input";
import TextArea from "../../components/authComponents/TextArea";
import { useNavigate } from "react-router-dom";

interface DoctorProfile {
  firstName: string;
  lastName: string;
  email: string;
  specialization: string;
  bio: string;
  location: string;
  rate: string;
}

const DoctorProfilePage: React.FC = () => {
  const [profile, setProfile] = useState<DoctorProfile>({
    firstName: "",
    lastName: "",
    email: "",
    specialization: "",
    bio: "",
    location: "",
    rate: "0",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const navigate = useNavigate();

  // Fetch doctor profile
  useEffect(() => {
    setIsLoading(true);
    fetch("/doctor/me")
      .then((res) => res.json())
      .then((data) => {
        setProfile({
          firstName: data.firstName || "",
          lastName: data.lastName || "",
          email: data.email || "",
          specialization: data.specialization || "",
          bio: data.bio || "",
          location: data.location || "",
          rate: data.rate || 0,
        });
      })
      .catch((err) => {
        console.error("Error fetching profile:", err);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!profile.firstName.trim())
      newErrors.firstName = "First name is required";
    if (!profile.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!profile.specialization.trim())
      newErrors.specialization = "Specialization is required";
    if (!profile.bio.trim()) newErrors.bio = "Bio is required";
    if (!profile.location.trim()) newErrors.location = "Location is required";
    if (isNaN(Number(profile.rate)) || Number(profile.rate) < 0)
      newErrors.rate = "Rate must be a valid number";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: name === "rate" ? parseFloat(value) || 0 : value,
    }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSaving(true);
    fetch("/doctor/me", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(profile),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to update profile");
        return res.json();
      })
      .then((data) => {
        console.log("Profile updated:", data);
        navigate("/dashboard"); // Redirect or show success message
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => setIsSaving(false));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4 py-12">
      <form
        onSubmit={handleSubmit}
        className="max-w-xl w-full bg-gray-800 p-8 rounded-xl shadow-lg text-white space-y-6"
      >
        <h2 className="text-3xl font-bold text-center mb-6">Doctor Profile</h2>

        {/* First Name */}
        <div>
          <Label elem="firstName">First Name</Label>
          <Input
            id="firstName"
            name="firstName"
            value={profile.firstName}
            onChange={handleChange}
            error={errors.firstName}
          />
        </div>

        {/* Last Name */}
        <div>
          <Label elem="lastName">Last Name</Label>
          <Input
            id="lastName"
            name="lastName"
            value={profile.lastName}
            onChange={handleChange}
            error={errors.lastName}
          />
        </div>

        {/* Email (read-only) */}
        <div>
          <Label elem="email">Email</Label>
          <Input
            id="email"
            name="email"
            value={profile.email}
            disabled={true}
          />
        </div>

        {/* Specialization */}
        <div>
          <Label elem="specialization">Specialization</Label>
          <Input
            id="specialization"
            name="specialization"
            value={profile.specialization}
            onChange={handleChange}
            error={errors.specialization}
          />
        </div>

        {/* Bio */}
        <div>
          <Label elem="bio">Bio</Label>
          <TextArea
            id="bio"
            name="bio"
            value={profile.bio}
            onChange={handleChange}
            error={errors.bio}
          />
        </div>

        {/* Location */}
        <div>
          <Label elem="location">Location</Label>
          <Input
            id="location"
            name="location"
            value={profile.location}
            onChange={handleChange}
            error={errors.location}
          />
        </div>

        {/* Rate */}
        <div>
          <Label elem="rate">Rate (per hour)</Label>
          <Input
            id="rate"
            name="rate"
            type="number"
            value={profile.rate}
            onChange={handleChange}
            error={errors.rate}
          />
        </div>

        {/* Save Button */}
        <button
          type="submit"
          disabled={isSaving}
          className={`w-full bg-gradient-to-r from-blue-500 to to-blue-800 py-3 rounded-xl font-semibold text-white shadow-lg hover:scale-105 hover:shadow-2xl transition-all duration-300 ${
            isSaving ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          {isSaving ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
};

export default DoctorProfilePage;
