import React from "react";
import { FormInput } from "./FormInput";

interface DoctorFieldsProps {
  form: any;
  errors: Record<string, string>;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

export const DoctorFields: React.FC<DoctorFieldsProps> = ({
  form,
  errors,
  onChange,
}) => (
  <>
    <FormInput
      label="Specialization"
      name="specialization"
      value={form.specialization || ""}
      onChange={onChange}
      error={errors.specialization}
      placeholder="e.g. Cardiology, Pediatrics"
      required
    />

    <FormInput
      label="Bio"
      name="bio"
      value={form.bio || ""}
      onChange={onChange}
      error={errors.bio}
      placeholder="Tell patients about your experience and qualifications"
      rows={4}
      required
    />

    <FormInput
      label="Location"
      name="location"
      value={form.location || ""}
      onChange={onChange}
      error={errors.location}
      placeholder="e.g. New York, NY"
      required
    />

    <FormInput
      label="Consultation Rate (per hour)"
      name="consultationRate"
      type="number"
      value={form.consultationRate || ""}
      onChange={onChange}
      error={errors.consultationRate}
      placeholder="50.00"
    />
  </>
);
