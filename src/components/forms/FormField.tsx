import React from "react";
import Label from "../authComponents/Label";

interface FormFieldProps {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  error?: string;
  placeholder?: string;
  required?: boolean;
  rows?: number;
  className?: string;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  error,
  placeholder,
  required,
  rows,
  className = "",
}) => {
  const baseClasses = `w-full rounded-md p-3 bg-gray-700 text-gray-200 border border-gray-600 focus:border-blue-500 focus:outline-none ${
    error ? "border-red-500 border-2" : ""
  } ${className}`;

  const InputComponent = rows ? "textarea" : "input";

  return (
    <div>
      <Label elem={name}>{label}</Label>
      <InputComponent
        type={rows ? undefined : type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className={baseClasses}
        placeholder={placeholder}
        required={required}
        rows={rows}
        {...(type === "date" && {
          max: new Date().toISOString().split("T")[0],
        })}
      />
      {error && <p className="text-red-400 mt-1 text-sm">{error}</p>}
    </div>
  );
};
