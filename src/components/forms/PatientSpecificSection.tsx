import React from "react";
import { FormInput } from "./FormInput";
import type { PatientForm } from "../../types/settings.types";

interface PatientSpecificSectionProps {
  form: PatientForm;
  errors: { [key: string]: string };
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

export const PatientSpecificSection: React.FC<PatientSpecificSectionProps> = ({
  form,
  errors,
  onChange,
}) => (
  <div className="space-y-6">
    <h2 className="text-xl font-semibold text-gray-200 border-b border-gray-600 pb-2">
      Medical Information
    </h2>

    <FormInput
      label="Medical History"
      name="medicalHistory"
      value={form.medicalHistory}
      onChange={onChange}
      rows={4}
      placeholder="Please describe any significant medical history, past surgeries, chronic conditions, etc."
    />

    <FormInput
      label="Allergies"
      name="allergies"
      value={form.allergies}
      onChange={onChange}
      rows={3}
      placeholder="List any known allergies (medications, foods, environmental, etc.)"
    />

    <FormInput
      label="Current Medications"
      name="currentMedications"
      value={form.currentMedications}
      onChange={onChange}
      rows={3}
      placeholder="List all current medications, dosages, and frequency"
    />
  </div>
);
