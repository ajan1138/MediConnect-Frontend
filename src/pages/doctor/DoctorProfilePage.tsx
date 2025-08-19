// src/pages/settings/DoctorSettingsPage.tsx
import React, { useState, useEffect } from "react";
import Label from "../../components/authComponents/Label";
import Button from "../../components/authComponents/Button";
import InputEmail from "../../components/forms/InputEmail";

interface DoctorSettingsFormState {
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: string;
  // Doctor-specific fields
  phone: string;
  address: string;
  emergencyContact: string;
  emergencyPhone: string;
  specialization: string;
  medicalLicense: string;
  yearsOfExperience: string;
  education: string;
  certifications: string;
  languagesSpoken: string;
  bio: string;
  consultationRate: string;
  availableHours: string;
  hospitalAffiliation: string;
}

const DoctorSettings: React.FC = () => {
  const [form, setForm] = useState<DoctorSettingsFormState>({
    firstName: "",
    lastName: "",
    email: "",
    dateOfBirth: "",
    phone: "",
    address: "",
    emergencyContact: "",
    emergencyPhone: "",
    specialization: "",
    medicalLicense: "",
    yearsOfExperience: "",
    education: "",
    certifications: "",
    languagesSpoken: "",
    bio: "",
    consultationRate: "",
    availableHours: "",
    hospitalAffiliation: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Mock loading existing doctor data
  useEffect(() => {
    // In a real app, this would fetch from your API
    const mockDoctorData: DoctorSettingsFormState = {
      firstName: "Dr. Emily",
      lastName: "Carter",
      email: "emily.carter@mediconnect.com",
      dateOfBirth: "1985-03-12",
      phone: "+1234567890",
      address: "456 Medical Center Dr, Healthcare City, HC 12345",
      emergencyContact: "Dr. Michael Carter",
      emergencyPhone: "+1234567891",
      specialization: "Cardiology",
      medicalLicense: "MD123456789",
      yearsOfExperience: "15",
      education:
        "Harvard Medical School - MD, Johns Hopkins - Cardiology Fellowship",
      certifications: "Board Certified Cardiologist, ACLS, BLS",
      languagesSpoken: "English, Spanish, French",
      bio: "Experienced cardiologist with over 15 years of practice. Specializing in interventional cardiology and heart disease prevention.",
      consultationRate: "200",
      availableHours:
        "Monday-Friday: 9:00 AM - 5:00 PM, Saturday: 9:00 AM - 1:00 PM",
      hospitalAffiliation: "General Hospital, Heart Care Medical Center",
    };
    setForm(mockDoctorData);
  }, []);

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
    setSaveSuccess(false);
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!form.firstName.trim()) newErrors.firstName = "First name is required";
    if (!form.lastName.trim()) newErrors.lastName = "Last name is required";

    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email))
      newErrors.email = "Email is invalid";

    if (!form.dateOfBirth) newErrors.dateOfBirth = "Date of birth is required";
    if (!form.specialization.trim())
      newErrors.specialization = "Specialization is required";
    if (!form.medicalLicense.trim())
      newErrors.medicalLicense = "Medical license is required";

    if (form.phone && !/^\+?[\d\s\-\(\)]+$/.test(form.phone))
      newErrors.phone = "Please enter a valid phone number";

    if (form.emergencyPhone && !/^\+?[\d\s\-\(\)]+$/.test(form.emergencyPhone))
      newErrors.emergencyPhone = "Please enter a valid emergency phone number";

    if (
      form.consultationRate &&
      (isNaN(Number(form.consultationRate)) ||
        Number(form.consultationRate) < 0)
    )
      newErrors.consultationRate = "Please enter a valid consultation rate";

    if (
      form.yearsOfExperience &&
      (isNaN(Number(form.yearsOfExperience)) ||
        Number(form.yearsOfExperience) < 0)
    )
      newErrors.yearsOfExperience = "Please enter valid years of experience";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.log("Updating doctor settings:", form);
      setSaveSuccess(true);

      // Auto-hide success message after 3 seconds
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (error) {
      console.error("Failed to update settings:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordChange = () => {
    // Navigate to password change page or open modal
    console.log("Navigate to password change");
  };

  return (
    <div className="min-h-screen bg-gray-900 px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gray-800 rounded-xl shadow-lg text-white overflow-hidden">
          {/* Header */}
          <div className="bg-gray-700 px-8 py-6 border-b border-gray-600">
            <h1 className="text-3xl font-bold">Doctor Settings</h1>
            <p className="text-gray-300 mt-2">
              Update your professional profile and practice information
            </p>
          </div>

          {/* Success Message */}
          {saveSuccess && (
            <div className="mx-8 mt-6 p-4 bg-green-600 text-white rounded-lg">
              Settings updated successfully!
            </div>
          )}

          <form onSubmit={handleSubmit} className="p-8 space-y-8">
            {/* Personal Information Section */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-200 border-b border-gray-600 pb-2">
                Personal Information
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                {/* First Name */}
                <div>
                  <Label elem={"firstName"}>First Name</Label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={form.firstName}
                    onChange={handleChange}
                    className={`w-full rounded-md p-3 bg-gray-700 text-gray-200 border border-gray-600 focus:border-blue-500 focus:outline-none ${
                      errors.firstName ? "border-red-500 border-2" : ""
                    }`}
                  />
                  {errors.firstName && (
                    <p className="text-red-400 mt-1 text-sm">
                      {errors.firstName}
                    </p>
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
                    className={`w-full rounded-md p-3 bg-gray-700 text-gray-200 border border-gray-600 focus:border-blue-500 focus:outline-none ${
                      errors.lastName ? "border-red-500 border-2" : ""
                    }`}
                  />
                  {errors.lastName && (
                    <p className="text-red-400 mt-1 text-sm">
                      {errors.lastName}
                    </p>
                  )}
                </div>
              </div>

              {/* Email */}
              <div>
                <InputEmail
                  value={form.email}
                  onChange={handleChange}
                  error={errors.email}
                />
              </div>

              {/* Date of Birth */}
              <div>
                <Label elem={"dateOfBirth"}>Date of Birth</Label>
                <input
                  type="date"
                  id="dateOfBirth"
                  name="dateOfBirth"
                  value={form.dateOfBirth}
                  onChange={handleChange}
                  className={`w-full rounded-md p-3 bg-gray-700 text-gray-200 border border-gray-600 focus:border-blue-500 focus:outline-none ${
                    errors.dateOfBirth ? "border-red-500 border-2" : ""
                  }`}
                  max={new Date().toISOString().split("T")[0]}
                />
                {errors.dateOfBirth && (
                  <p className="text-red-400 mt-1 text-sm">
                    {errors.dateOfBirth}
                  </p>
                )}
              </div>
            </div>

            {/* Contact Information Section */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-200 border-b border-gray-600 pb-2">
                Contact Information
              </h2>

              {/* Phone */}
              <div>
                <Label elem={"phone"}>Phone Number</Label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  className={`w-full rounded-md p-3 bg-gray-700 text-gray-200 border border-gray-600 focus:border-blue-500 focus:outline-none ${
                    errors.phone ? "border-red-500 border-2" : ""
                  }`}
                  placeholder="+1234567890"
                />
                {errors.phone && (
                  <p className="text-red-400 mt-1 text-sm">{errors.phone}</p>
                )}
              </div>

              {/* Address */}
              <div>
                <Label elem={"address"}>Practice Address</Label>
                <textarea
                  id="address"
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  className="w-full rounded-md p-3 bg-gray-700 text-gray-200 border border-gray-600 focus:border-blue-500 focus:outline-none resize-y"
                  rows={2}
                  placeholder="Practice address, city, state, zip code"
                />
              </div>

              {/* Emergency Contact */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label elem={"emergencyContact"}>
                    Emergency Contact Name
                  </Label>
                  <input
                    type="text"
                    id="emergencyContact"
                    name="emergencyContact"
                    value={form.emergencyContact}
                    onChange={handleChange}
                    className="w-full rounded-md p-3 bg-gray-700 text-gray-200 border border-gray-600 focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <Label elem={"emergencyPhone"}>Emergency Contact Phone</Label>
                  <input
                    type="tel"
                    id="emergencyPhone"
                    name="emergencyPhone"
                    value={form.emergencyPhone}
                    onChange={handleChange}
                    className={`w-full rounded-md p-3 bg-gray-700 text-gray-200 border border-gray-600 focus:border-blue-500 focus:outline-none ${
                      errors.emergencyPhone ? "border-red-500 border-2" : ""
                    }`}
                    placeholder="+1234567890"
                  />
                  {errors.emergencyPhone && (
                    <p className="text-red-400 mt-1 text-sm">
                      {errors.emergencyPhone}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Professional Information Section */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-200 border-b border-gray-600 pb-2">
                Professional Information
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Specialization */}
                <div>
                  <Label elem={"specialization"}>Specialization</Label>
                  <input
                    type="text"
                    id="specialization"
                    name="specialization"
                    value={form.specialization}
                    onChange={handleChange}
                    className={`w-full rounded-md p-3 bg-gray-700 text-gray-200 border border-gray-600 focus:border-blue-500 focus:outline-none ${
                      errors.specialization ? "border-red-500 border-2" : ""
                    }`}
                    placeholder="e.g., Cardiology, Dermatology, etc."
                  />
                  {errors.specialization && (
                    <p className="text-red-400 mt-1 text-sm">
                      {errors.specialization}
                    </p>
                  )}
                </div>

                {/* Medical License */}
                <div>
                  <Label elem={"medicalLicense"}>Medical License Number</Label>
                  <input
                    type="text"
                    id="medicalLicense"
                    name="medicalLicense"
                    value={form.medicalLicense}
                    onChange={handleChange}
                    className={`w-full rounded-md p-3 bg-gray-700 text-gray-200 border border-gray-600 focus:border-blue-500 focus:outline-none ${
                      errors.medicalLicense ? "border-red-500 border-2" : ""
                    }`}
                    placeholder="MD123456789"
                  />
                  {errors.medicalLicense && (
                    <p className="text-red-400 mt-1 text-sm">
                      {errors.medicalLicense}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Years of Experience */}
                <div>
                  <Label elem={"yearsOfExperience"}>Years of Experience</Label>
                  <input
                    type="number"
                    id="yearsOfExperience"
                    name="yearsOfExperience"
                    value={form.yearsOfExperience}
                    onChange={handleChange}
                    className={`w-full rounded-md p-3 bg-gray-700 text-gray-200 border border-gray-600 focus:border-blue-500 focus:outline-none ${
                      errors.yearsOfExperience ? "border-red-500 border-2" : ""
                    }`}
                    min="0"
                    placeholder="15"
                  />
                  {errors.yearsOfExperience && (
                    <p className="text-red-400 mt-1 text-sm">
                      {errors.yearsOfExperience}
                    </p>
                  )}
                </div>

                {/* Consultation Rate */}
                <div>
                  <Label elem={"consultationRate"}>
                    Consultation Rate ($/hour)
                  </Label>
                  <input
                    type="number"
                    id="consultationRate"
                    name="consultationRate"
                    value={form.consultationRate}
                    onChange={handleChange}
                    className={`w-full rounded-md p-3 bg-gray-700 text-gray-200 border border-gray-600 focus:border-blue-500 focus:outline-none ${
                      errors.consultationRate ? "border-red-500 border-2" : ""
                    }`}
                    min="0"
                    step="0.01"
                    placeholder="200.00"
                  />
                  {errors.consultationRate && (
                    <p className="text-red-400 mt-1 text-sm">
                      {errors.consultationRate}
                    </p>
                  )}
                </div>
              </div>

              {/* Education */}
              <div>
                <Label elem={"education"}>Education & Training</Label>
                <textarea
                  id="education"
                  name="education"
                  value={form.education}
                  onChange={handleChange}
                  className="w-full rounded-md p-3 bg-gray-700 text-gray-200 border border-gray-600 focus:border-blue-500 focus:outline-none resize-y"
                  rows={3}
                  placeholder="Medical school, residency, fellowship details"
                />
              </div>

              {/* Certifications */}
              <div>
                <Label elem={"certifications"}>
                  Certifications & Board Certifications
                </Label>
                <textarea
                  id="certifications"
                  name="certifications"
                  value={form.certifications}
                  onChange={handleChange}
                  className="w-full rounded-md p-3 bg-gray-700 text-gray-200 border border-gray-600 focus:border-blue-500 focus:outline-none resize-y"
                  rows={3}
                  placeholder="Board certifications, special training certificates, etc."
                />
              </div>

              {/* Languages Spoken */}
              <div>
                <Label elem={"languagesSpoken"}>Languages Spoken</Label>
                <input
                  type="text"
                  id="languagesSpoken"
                  name="languagesSpoken"
                  value={form.languagesSpoken}
                  onChange={handleChange}
                  className="w-full rounded-md p-3 bg-gray-700 text-gray-200 border border-gray-600 focus:border-blue-500 focus:outline-none"
                  placeholder="English, Spanish, French"
                />
              </div>

              {/* Bio */}
              <div>
                <Label elem={"bio"}>Professional Bio</Label>
                <textarea
                  id="bio"
                  name="bio"
                  value={form.bio}
                  onChange={handleChange}
                  className="w-full rounded-md p-3 bg-gray-700 text-gray-200 border border-gray-600 focus:border-blue-500 focus:outline-none resize-y"
                  rows={4}
                  placeholder="Brief description of your practice, expertise, and approach to patient care"
                />
              </div>
            </div>

            {/* Practice Information Section */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-200 border-b border-gray-600 pb-2">
                Practice Information
              </h2>

              {/* Available Hours */}
              <div>
                <Label elem={"availableHours"}>Available Hours</Label>
                <textarea
                  id="availableHours"
                  name="availableHours"
                  value={form.availableHours}
                  onChange={handleChange}
                  className="w-full rounded-md p-3 bg-gray-700 text-gray-200 border border-gray-600 focus:border-blue-500 focus:outline-none resize-y"
                  rows={3}
                  placeholder="Monday-Friday: 9:00 AM - 5:00 PM, Saturday: 9:00 AM - 1:00 PM"
                />
              </div>

              {/* Hospital Affiliation */}
              <div>
                <Label elem={"hospitalAffiliation"}>
                  Hospital Affiliations
                </Label>
                <textarea
                  id="hospitalAffiliation"
                  name="hospitalAffiliation"
                  value={form.hospitalAffiliation}
                  onChange={handleChange}
                  className="w-full rounded-md p-3 bg-gray-700 text-gray-200 border border-gray-600 focus:border-blue-500 focus:outline-none resize-y"
                  rows={2}
                  placeholder="List hospitals or medical centers you're affiliated with"
                />
              </div>
            </div>

            {/* Security Section */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-200 border-b border-gray-600 pb-2">
                Security
              </h2>

              <div>
                <button
                  type="button"
                  onClick={handlePasswordChange}
                  className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-500 transition-colors"
                >
                  Change Password
                </button>
                <p className="text-gray-400 text-sm mt-2">
                  Update your account password for security
                </p>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end pt-6 border-t border-gray-600">
              <Button onClick={handleSubmit}>
                {isLoading ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DoctorSettings;
