// src/components/authComponents/Input.tsx
import React from "react";

interface InputProps {
  id: string;
  name: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  placeholder?: string;
  className?: string;
}

const Input: React.FC<InputProps> = ({
  id,
  name,
  type,
  value,
  onChange,
  error,
  placeholder,
  className = "",
}) => {
  return (
    <div>
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full rounded-md p-2 text-gray-200 border border-gray-200 ${
          error ? "border-red-500 border-2" : ""
        } ${className}`}
      />
      {error && <p className="text-red-500 mt-1 text-sm">{error}</p>}
    </div>
  );
};

export default Input;
