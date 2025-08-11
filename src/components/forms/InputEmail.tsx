import React from "react";
import Label from "../authComponents/Label";

interface InputEmailProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  className?: string;
  id?: string;
  name?: string;
}

const InputEmail: React.FC<InputEmailProps> = ({
  value,
  onChange,
  error,
  className = "",
  id = "email",
  name = "email",
}) => {
  return (
    <div>
      <Label elem={id}>Email</Label>
      <input
        type="email"
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        className={`w-full rounded-md p-2 text-gray-200 border border-gray-200 ${
          error ? "border-red-500 border-2" : ""
        } ${className}`}
      />
      {error && <p className="text-red-500 mt-1 text-sm">{error}</p>}
    </div>
  );
};

export default InputEmail;
