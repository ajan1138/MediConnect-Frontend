// src/pages/auth/LoginPage.tsx
import React, { useState } from "react";
import Label from "../../components/authComponents/Label";
import Input from "../../components/authComponents/Input";
import Button from "../../components/authComponents/Button";
import InputEmail from "../../components/forms/InputEmail";
import InputPassword from "../../components/forms/InputPassword";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setEmail((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const newErrors: typeof errors = {};
    if (!email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Email is invalid";

    if (!password) newErrors.password = "Password is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    // TODO: Implement login API call here
    console.log("Logging in with", { email, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4 py-12">
      <form
        onSubmit={handleSubmit}
        className="max-w-md w-full bg-gray-800 p-8 rounded-xl shadow-lg text-white space-y-6"
      >
        <h2 className="text-3xl font-bold text-center mb-6">Login</h2>

        {/* Email */}
        <div>
          <InputEmail value={email} onChange={validate} error={errors.email} />
        </div>

        {/* Password */}
        <div>
          <InputPassword />
        </div>
        {/* Submit + add handleClick*/}
        <Button>Login</Button>
      </form>
    </div>
  );
};

export default LoginPage;
