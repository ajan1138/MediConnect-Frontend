// src/pages/settings/PatientSettingsPage.tsx
import React, { useState, useEffect } from "react";
import Label from "../../components/authComponents/Label";
import Button from "../../components/authComponents/Button";
import InputEmail from "../../components/forms/InputEmail";

interface PatientSettingsFormState {
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: string;
  // Additional patient profile fields
  phone: string;
  address: string;
  emergencyContact: string;
  emergencyPhone: string;
  medicalHistory: string;
  allergies: string;
  currentMedications: string;
}

const PatientSettingsPage: React.FC = () => {
  const [form, setForm] = useState<PatientSettingsFormState>({
    firstName: "",
    lastName: "",
    email: "",
    dateOfBirth: "",
    phone: "",
    address: "",
    emergencyContact: "",
    emergencyPhone: "",
    medicalHistory: "",
    allergies: "",
    currentMedications: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Mock loading existing user data
  useEffect(() => {
    // In a real app, this would fetch from your API
    const mockUserData: PatientSettingsFormState = {
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      dateOfBirth: "1990-05-15",
      phone: "+1234567890",
      address: "123 Main St, City, State",
      emergencyContact: "Jane Doe",
      emergencyPhone: "+1234567891",
      medicalHistory: "No significant medical history",
      allergies: "None known",
      currentMedications: "None",
    };
    setForm(mockUserData);
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

    if (form.phone && !/^\+?[\d\s\-\(\)]+$/.test(form.phone))
      newErrors.phone = "Please enter a valid phone number";

    if (form.emergencyPhone && !/^\+?[\d\s\-\(\)]+$/.test(form.emergencyPhone))
      newErrors.emergencyPhone = "Please enter a valid emergency phone number";

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

      console.log("Updating patient settings:", form);
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
            <h1 className="text-3xl font-bold">Patient Settings</h1>
            <p className="text-gray-300 mt-2">
              Update your profile information and medical details
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
                <Label elem={"address"}>Address</Label>
                <textarea
                  id="address"
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  className="w-full rounded-md p-3 bg-gray-700 text-gray-200 border border-gray-600 focus:border-blue-500 focus:outline-none resize-y"
                  rows={2}
                  placeholder="Street address, city, state, zip code"
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

            {/* Medical Information Section */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-200 border-b border-gray-600 pb-2">
                Medical Information
              </h2>

              {/* Medical History */}
              <div>
                <Label elem={"medicalHistory"}>Medical History</Label>
                <textarea
                  id="medicalHistory"
                  name="medicalHistory"
                  value={form.medicalHistory}
                  onChange={handleChange}
                  className="w-full rounded-md p-3 bg-gray-700 text-gray-200 border border-gray-600 focus:border-blue-500 focus:outline-none resize-y"
                  rows={4}
                  placeholder="Please describe any significant medical history, past surgeries, chronic conditions, etc."
                />
              </div>

              {/* Allergies */}
              <div>
                <Label elem={"allergies"}>Allergies</Label>
                <textarea
                  id="allergies"
                  name="allergies"
                  value={form.allergies}
                  onChange={handleChange}
                  className="w-full rounded-md p-3 bg-gray-700 text-gray-200 border border-gray-600 focus:border-blue-500 focus:outline-none resize-y"
                  rows={3}
                  placeholder="List any known allergies (medications, foods, environmental, etc.)"
                />
              </div>

              {/* Current Medications */}
              <div>
                <Label elem={"currentMedications"}>Current Medications</Label>
                <textarea
                  id="currentMedications"
                  name="currentMedications"
                  value={form.currentMedications}
                  onChange={handleChange}
                  className="w-full rounded-md p-3 bg-gray-700 text-gray-200 border border-gray-600 focus:border-blue-500 focus:outline-none resize-y"
                  rows={3}
                  placeholder="List all current medications, dosages, and frequency"
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
            <div className="flex justify-end pt-6 border-t border-gray-600 from-green-600 to-green-400">
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

export default PatientSettingsPage;
