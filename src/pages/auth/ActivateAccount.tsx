// src/pages/auth/ActivateAccount.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Label from "../../components/authComponents/Label";
import Input from "../../components/authComponents/Input";

const ActivateAccount: React.FC = () => {
  const [token, setToken] = useState("");
  const [errors, setErrors] = useState<{ token?: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const validate = () => {
    const newErrors: typeof errors = {};
    if (!token.trim()) newErrors.token = "Activation code is required";
    else if (!/^\d{6}$/.test(token)) newErrors.token = "Code must be 6 digits";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setIsLoading(true);

    // TODO: Implement activation API call here
    console.log("Activating with token:", token);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // On success, redirect to login or dashboard
      navigate("/login");
    }, 1500);
  };

  const handleResendCode = () => {
    // TODO: Implement resend code logic
    console.log("Resending activation code");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4 py-12">
      <form
        onSubmit={handleSubmit}
        className="max-w-md w-full bg-gray-800 p-8 rounded-xl shadow-lg text-white space-y-6"
      >
        <h2 className="text-3xl font-bold text-center mb-6">
          Activate Account
        </h2>

        <p className="text-gray-300 text-center mb-6">
          We've sent a 6-digit activation code to your email. Please enter it
          below.
        </p>

        {/* Token Input */}
        <div>
          <Label elem="token">Activation Code</Label>
          <Input
            id="token"
            name="token"
            type="text"
            value={token}
            onChange={(e) => {
              // Only allow numbers
              const value = e.target.value.replace(/\D/g, "");
              setToken(value);
              setErrors((prev) => ({ ...prev, token: "" }));
            }}
            error={errors.token}
            placeholder="123456"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full bg-gradient-to-r from-blue-500 to-green-400 py-3 rounded-xl font-semibold text-white shadow-lg hover:scale-105 hover:shadow-2xl transition-all duration-300 ${
            isLoading ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          {isLoading ? "Activating..." : "Activate Account"}
        </button>

        {/* Resend Code */}
        <div className="text-center mt-4">
          <p className="text-gray-400">
            Didn't receive a code?{" "}
            <button
              type="button"
              onClick={handleResendCode}
              className="text-blue-400 hover:text-blue-300 font-medium focus:outline-none"
            >
              Resend Code
            </button>
          </p>
        </div>
      </form>
    </div>
  );
};

export default ActivateAccount;
