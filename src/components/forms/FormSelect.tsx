import React from "react";
import Label from "../authComponents/Label";

interface Option {
  value: string;
  label: string;
}

interface FormSelectProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: Option[];
  error?: string;
  placeholder?: string;
  required?: boolean;
}

export const FormSelect: React.FC<FormSelectProps> = ({
  label,
  name,
  value,
  onChange,
  options,
  error,
  placeholder = "-- Select --",
  required,
}) => {
  const baseClasses = `w-full rounded-md p-3 bg-gray-700 text-gray-200 border border-gray-600 focus:border-blue-500 focus:outline-none ${
    error ? "border-red-500 border-2" : ""
  }`;

  return (
    <div>
      <Label elem={name}>{label}</Label>
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className={baseClasses}
        required={required}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="text-red-400 mt-1 text-sm">{error}</p>}
    </div>
  );
};
