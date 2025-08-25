import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Role, type BaseFormData } from "../types/auth";

const initialFormState: BaseFormData = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  role: "",
};

export const useRegistrationForm = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState<any>(initialFormState);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const updateField = (name: string, value: string) => {
    setForm((prev: any) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const resetForm = () => {
    setForm(initialFormState);
    setErrors({});
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Base validation
    if (!form.firstName?.trim()) newErrors.firstName = "First name is required";
    if (!form.lastName?.trim()) newErrors.lastName = "Last name is required";
    if (!form.email?.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!form.password) {
      newErrors.password = "Password is required";
    } else if (form.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }
    if (!form.role) newErrors.role = "Role is required";

    // Role-specific validation
    if (form.role === Role.DOCTOR) {
      if (!form.specialization?.trim())
        newErrors.specialization = "Specialization is required";
      if (!form.bio?.trim()) newErrors.bio = "Bio is required";
      if (!form.location?.trim()) newErrors.location = "Location is required";
      if (form.rate && isNaN(Number(form.rate)))
        newErrors.rate = "Rate must be a number";
    }

    if (form.role === Role.PATIENT) {
      if (!form.dateOfBirth)
        newErrors.dateOfBirth = "Date of birth is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submitRegistration = async () => {
    if (!validateForm()) return false;

    setIsLoading(true);
    try {
      const submissionData = {
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        password: form.password,
        role: form.role,
        ...(form.role === Role.DOCTOR && {
          specialization: form.specialization,
          bio: form.bio,
          location: form.location,
          rate: Number(form.rate) || 0,
        }),
        ...(form.role === Role.PATIENT && {
          dateOfBirth: form.dateOfBirth,
        }),
      };

      const response = await fetch(
        `http://localhost:8088/api/v1/auth/register/${form.role.toLowerCase()}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(submissionData),
        }
      );

      if (!response.ok) {
        throw new Error(`Registration failed: ${response.status}`);
      }

      setForm(initialFormState);
      navigate("/activate");
      return true;
    } catch (error) {
      console.error("Registration error:", error);
      setErrors({ submit: "Registration failed. Please try again." });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    form,
    errors,
    isLoading,
    updateField,
    resetForm,
    submitRegistration,
  };
};
