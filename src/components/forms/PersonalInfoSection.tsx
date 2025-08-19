import React from "react";
import { FormInput } from "./FormInput";
import type { BaseUserForm } from "../../types/settings.types";
import InputEmail from "./InputEmail";

interface PersonalInfoSectionProps {
  form: BaseUserForm;
  errors: { [key: string]: string };
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

export const PersonalInfoSection: React.FC<PersonalInfoSectionProps> = ({
  form,
  errors,
  onChange,
}) => (
  <div className="space-y-6">
    <h2 className="text-xl font-semibold text-gray-200 border-b border-gray-600 pb-2">
      Personal Information
    </h2>

    <div className="grid md:grid-cols-2 gap-6">
      <FormInput
        label="First Name"
        name="firstName"
        value={form.firstName}
        onChange={onChange}
        error={errors.firstName}
        required
      />
      <FormInput
        label="Last Name"
        name="lastName"
        value={form.lastName}
        onChange={onChange}
        error={errors.lastName}
        required
      />
    </div>

    <InputEmail value={form.email} onChange={onChange} error={errors.email} />

    <FormInput
      label="Date of Birth"
      name="dateOfBirth"
      type="date"
      value={form.dateOfBirth}
      onChange={onChange}
      error={errors.dateOfBirth}
      required
    />
  </div>
);
