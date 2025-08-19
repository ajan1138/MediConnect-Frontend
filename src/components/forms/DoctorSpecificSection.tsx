import React from "react";
import { FormInput } from "./FormInput";
import type { DoctorForm } from "../../types/settings.types";

interface DoctorSpecificSectionsProps {
  form: DoctorForm;
  errors: { [key: string]: string };
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

export const DoctorSpecificSections: React.FC<DoctorSpecificSectionsProps> = ({
  form,
  errors,
  onChange,
}) => (
  <>
    {/* Professional Information */}
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-200 border-b border-gray-600 pb-2">
        Professional Information
      </h2>

      <div className="grid md:grid-cols-2 gap-6">
        <FormInput
          label="Specialization"
          name="specialization"
          value={form.specialization}
          onChange={onChange}
          error={errors.specialization}
          placeholder="e.g., Cardiology, Dermatology, etc."
          required
        />
        <FormInput
          label="Medical License Number"
          name="medicalLicense"
          value={form.medicalLicense}
          onChange={onChange}
          error={errors.medicalLicense}
          placeholder="MD123456789"
          required
        />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <FormInput
          label="Years of Experience"
          name="yearsOfExperience"
          type="number"
          value={form.yearsOfExperience}
          onChange={onChange}
          error={errors.yearsOfExperience}
          placeholder="15"
        />
        <FormInput
          label="Consultation Rate ($/hour)"
          name="consultationRate"
          type="number"
          value={form.consultationRate}
          onChange={onChange}
          error={errors.consultationRate}
          placeholder="200.00"
        />
      </div>

      <FormInput
        label="Education & Training"
        name="education"
        value={form.education}
        onChange={onChange}
        rows={3}
        placeholder="Medical school, residency, fellowship details"
      />

      <FormInput
        label="Certifications & Board Certifications"
        name="certifications"
        value={form.certifications}
        onChange={onChange}
        rows={3}
        placeholder="Board certifications, special training certificates, etc."
      />

      <FormInput
        label="Languages Spoken"
        name="languagesSpoken"
        value={form.languagesSpoken}
        onChange={onChange}
        placeholder="English, Spanish, French"
      />

      <FormInput
        label="Professional Bio"
        name="bio"
        value={form.bio}
        onChange={onChange}
        rows={4}
        placeholder="Brief description of your practice, expertise, and approach to patient care"
      />
    </div>

    {/* Practice Information */}
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-200 border-b border-gray-600 pb-2">
        Practice Information
      </h2>

      <FormInput
        label="Available Hours"
        name="availableHours"
        value={form.availableHours}
        onChange={onChange}
        rows={3}
        placeholder="Monday-Friday: 9:00 AM - 5:00 PM, Saturday: 9:00 AM - 1:00 PM"
      />

      <FormInput
        label="Hospital Affiliations"
        name="hospitalAffiliation"
        value={form.hospitalAffiliation}
        onChange={onChange}
        rows={2}
        placeholder="List hospitals or medical centers you're affiliated with"
      />
    </div>
  </>
);
