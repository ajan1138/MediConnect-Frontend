import React from "react";
import { FormInput } from "./FormInput";
import type { BaseUserForm } from "../../types/settings.types";

interface ContactInfoSectionProps {
  form: BaseUserForm;
  errors: { [key: string]: string };
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  addressLabel?: string;
}

export const ContactInfoSection: React.FC<ContactInfoSectionProps> = ({
  form,
  errors,
  onChange,
  addressLabel = "Address",
}) => (
  <div className="space-y-6">
    <h2 className="text-xl font-semibold text-gray-200 border-b border-gray-600 pb-2">
      Contact Information
    </h2>

    <FormInput
      label="Phone Number"
      name="phone"
      type="tel"
      value={form.phone}
      onChange={onChange}
      error={errors.phone}
      placeholder="+1234567890"
    />

    <FormInput
      label={addressLabel}
      name="address"
      value={form.address}
      onChange={onChange}
      rows={2}
      placeholder={
        addressLabel === "Practice Address"
          ? "Practice address, city, state, zip code"
          : "Street address, city, state, zip code"
      }
    />

    <div className="grid md:grid-cols-2 gap-6">
      <FormInput
        label="Emergency Contact Name"
        name="emergencyContact"
        value={form.emergencyContact}
        onChange={onChange}
      />
      <FormInput
        label="Emergency Contact Phone"
        name="emergencyPhone"
        type="tel"
        value={form.emergencyPhone}
        onChange={onChange}
        error={errors.emergencyPhone}
        placeholder="+1234567890"
      />
    </div>
  </div>
);
