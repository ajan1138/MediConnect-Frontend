import React from "react";

interface FormTextareaProps {
  id: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  error?: string;
  rows?: number;
  placeholder?: string;
}

export const FormTextarea: React.FC<FormTextareaProps> = ({
  id,
  name,
  value,
  onChange,
  error,
  rows = 3,
  placeholder,
}) => (
  <textarea
    id={id}
    name={name}
    value={value}
    onChange={onChange}
    className={`w-full rounded-md p-2 text-gray-200 border border-gray-200 resize-y ${
      error ? "border-red-500 border-2" : ""
    }`}
    rows={rows}
    placeholder={placeholder}
  />
);
