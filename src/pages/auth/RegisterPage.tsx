import React from "react";
import { Role } from "../../types/auth";
import { useRegistrationForm } from "../../hooks/useRegistrationForm";
import Button from "../../components/authComponents/Button";
import { FormInput } from "../../components/forms/FormInput";
import { FormSelect } from "../../components/forms/FormSelect";
import { DoctorFields } from "../../components/forms/DoctorFields";
import { PatientFields } from "../../components/forms/PatientFields";

const roleOptions = [
  { value: Role.PATIENT, label: "Patient" },
  { value: Role.DOCTOR, label: "Doctor" },
];

const RegisterPage: React.FC = () => {
  const { form, errors, isLoading, updateField, submitRegistration } =
    useRegistrationForm();

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    updateField(e.target.name, e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submitRegistration();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4 py-12">
      <form
        onSubmit={handleSubmit}
        className="max-w-xl w-full bg-gray-800 p-8 rounded-xl shadow-lg text-white space-y-6"
      >
        <h2 className="text-3xl font-bold text-center mb-6">Create Account</h2>

        {errors.submit && (
          <div className="bg-red-500/10 border border-red-500 rounded-md p-3">
            <p className="text-red-400 text-sm">{errors.submit}</p>
          </div>
        )}

        <FormSelect
          label="I am a"
          name="role"
          value={form.role}
          onChange={handleChange}
          options={roleOptions}
          error={errors.role}
          placeholder="-- Select Role --"
          required
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormInput
            label="First Name"
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            error={errors.firstName}
            placeholder="John"
            required
          />

          <FormInput
            label="Last Name"
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            error={errors.lastName}
            placeholder="Doe"
            required
          />
        </div>

        <FormInput
          label="Email Address"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          error={errors.email}
          placeholder="john.doe@example.com"
          required
        />

        <FormInput
          label="Password"
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          error={errors.password}
          placeholder="At least 8 characters"
          required
        />

        {form.role === Role.DOCTOR && (
          <>
            <div className="border-t border-gray-600 pt-6">
              <h3 className="text-xl font-semibold mb-4 text-blue-400">
                Doctor Information
              </h3>
              <div className="space-y-6">
                <DoctorFields
                  form={form}
                  errors={errors}
                  onChange={handleChange}
                />
              </div>
            </div>
          </>
        )}

        {form.role === Role.PATIENT && (
          <>
            <div className="border-t border-gray-600 pt-6">
              <h3 className="text-xl font-semibold mb-4 text-green-400">
                Patient Information
              </h3>
              <PatientFields
                form={form}
                errors={errors}
                onChange={handleChange}
              />
            </div>
          </>
        )}

        <div className="pt-4">
          <Button onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Creating Account...
              </span>
            ) : (
              "Create Account"
            )}
          </Button>
        </div>

        <div className="text-center">
          <p className="text-gray-400">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-blue-400 hover:text-blue-300 transition-colors"
            >
              Sign in
            </a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;
