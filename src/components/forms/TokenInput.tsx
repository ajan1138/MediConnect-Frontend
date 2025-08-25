import React from "react";
import { FormInput } from "./FormInput";

interface TokenInputProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
  disabled?: boolean;
}

export const TokenInput: React.FC<TokenInputProps> = ({
  value,
  onChange,
  error,
  disabled = false,
}) => {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    onChange(e.target.value);
  };

  return (
    <FormInput
      label="Activation Code"
      name="token"
      type="text"
      value={value}
      onChange={handleChange}
      error={error}
      placeholder="123456"
      className={`text-center text-2xl font-mono tracking-widest ${
        disabled ? "opacity-50" : ""
      }`}
      required
    />
  );
};
