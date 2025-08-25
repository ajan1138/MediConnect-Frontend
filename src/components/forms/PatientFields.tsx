import React from "react";
import { FormInput } from "./FormInput";

interface PatientFieldsProps {
  form: any;
  errors: Record<string, string>;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

export const PatientFields: React.FC<PatientFieldsProps> = ({
  form,
  errors,
  onChange,
}) => (
  <FormInput
    label="Date of Birth"
    name="dateOfBirth"
    type="date"
    value={form.dateOfBirth || ""}
    onChange={onChange}
    error={errors.dateOfBirth}
    required
  />
);
