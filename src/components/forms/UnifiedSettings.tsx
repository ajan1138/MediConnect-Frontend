import React, { useEffect } from "react";
import Button from "../authComponents/Button";
import Header from "../settingsComponents/Header";
import { PersonalInfoSection } from "./PersonalInfoSection";
import { ContactInfoSection } from "./ContactInfoSection";
import { PatientSpecificSection } from "./PatientSpecificSection";
import { useSettingsForm } from "../../hooks/useSettingsForm";
import type {
  UserType,
  DoctorForm,
  PatientForm,
} from "../../types/settings.types";
import { DoctorSpecificSections } from "./DoctorSpecificSection";

interface UnifiedSettingsPageProps {
  userType: UserType;
}

export const UnifiedSettingsPage: React.FC<UnifiedSettingsPageProps> = ({
  userType,
}) => {
  const initialForm =
    userType === "doctor"
      ? ({
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
        } as DoctorForm)
      : ({
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
        } as PatientForm);

  const { form, errors, isLoading, handleChange, handleSubmit, setForm } =
    useSettingsForm(initialForm, userType);

  useEffect(() => {
    // Load mock data based on user type
    const mockData =
      userType === "doctor"
        ? {
            // Doctor mock data...
          }
        : {
            // Patient mock data...
          };
    setForm(mockData as any);
  }, [userType, setForm]);

  const title = userType === "doctor" ? "Doctor Settings" : "Patient Settings";
  const subtitle =
    userType === "doctor"
      ? "Update your professional profile and practice information"
      : "Update your profile information and medical details";

  return (
    <div className="min-h-screen bg-gray-900 px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gray-800 rounded-xl shadow-lg text-white overflow-hidden">
          <Header headerTitle={title}>{subtitle}</Header>

          <form onSubmit={handleSubmit} className="p-8 space-y-8">
            <PersonalInfoSection
              form={form}
              errors={errors}
              onChange={handleChange}
            />

            <ContactInfoSection
              form={form}
              errors={errors}
              onChange={handleChange}
              addressLabel={
                userType === "doctor" ? "Practice Address" : "Address"
              }
            />

            {userType === "doctor" && (
              <DoctorSpecificSections
                form={form as DoctorForm}
                errors={errors}
                onChange={handleChange}
              />
            )}

            {userType === "patient" && (
              <PatientSpecificSection
                form={form as PatientForm}
                errors={errors}
                onChange={handleChange}
              />
            )}

            {/* Security Section */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-200 border-b border-gray-600 pb-2">
                Security
              </h2>
              <div>
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-500 transition-colors"
                >
                  Change Password
                </button>
                <p className="text-gray-400 text-sm mt-2">
                  Update your account password for security
                </p>
              </div>
            </div>

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
