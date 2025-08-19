import React from "react";
import Label from "../authComponents/Label";

interface FormInputProps {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  error?: string;
  placeholder?: string;
  rows?: number;
  required?: boolean;
}

export const FormInput: React.FC<FormInputProps> = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  error,
  placeholder,
  rows,
  required,
}) => {
  const baseClass = `w-full rounded-md p-3 bg-gray-700 text-gray-200 border border-gray-600 focus:border-blue-500 focus:outline-none ${
    error ? "border-red-500 border-2" : ""
  }`;

  return (
    <div>
      <Label elem={name}>{label}</Label>
      {rows ? (
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          className={`${baseClass} resize-y`}
          placeholder={placeholder}
          rows={rows}
          required={required}
        />
      ) : (
        <input
          type={type}
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          className={baseClass}
          placeholder={placeholder}
          required={required}
          {...(type === "date" && {
            max: new Date().toISOString().split("T")[0],
          })}
          {...(type === "number" && { min: "0" })}
          {...(name === "consultationRate" && { step: "0.01" })}
        />
      )}
      {error && <p className="text-red-400 mt-1 text-sm">{error}</p>}
    </div>
  );
};
