import { useState, useCallback } from "react";
import type { UserForm, UserType } from "../types/settings.types";

const validateCommonFields = (form: UserForm) => {
  const errors: { [key: string]: string } = {};

  if (!form.firstName.trim()) errors.firstName = "First name is required";
  if (!form.lastName.trim()) errors.lastName = "Last name is required";
  if (!form.email.trim()) errors.email = "Email is required";
  else if (!/\S+@\S+\.\S+/.test(form.email)) errors.email = "Email is invalid";
  if (!form.dateOfBirth) errors.dateOfBirth = "Date of birth is required";

  const phoneRegex = /^\+?[\d\s\-\(\)]+$/;
  if (form.phone && !phoneRegex.test(form.phone))
    errors.phone = "Please enter a valid phone number";
  if (form.emergencyPhone && !phoneRegex.test(form.emergencyPhone)) {
    errors.emergencyPhone = "Please enter a valid emergency phone number";
  }

  return errors;
};

const validateDoctorFields = (form: any) => {
  const errors: { [key: string]: string } = {};

  if (!form.specialization?.trim())
    errors.specialization = "Specialization is required";
  if (!form.medicalLicense?.trim())
    errors.medicalLicense = "Medical license is required";

  if (
    form.consultationRate &&
    (isNaN(Number(form.consultationRate)) || Number(form.consultationRate) < 0)
  ) {
    errors.consultationRate = "Please enter a valid consultation rate";
  }
  if (
    form.yearsOfExperience &&
    (isNaN(Number(form.yearsOfExperience)) ||
      Number(form.yearsOfExperience) < 0)
  ) {
    errors.yearsOfExperience = "Please enter valid years of experience";
  }

  return errors;
};

export const useSettingsForm = <T extends UserForm>(
  initialForm: T,
  userType: UserType
) => {
  const [form, setForm] = useState<T>(initialForm);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleChange = useCallback(
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >
    ) => {
      const { name, value } = e.target;
      setForm((prev) => ({ ...prev, [name]: value }));
      setErrors((prev) => ({ ...prev, [name]: "" }));
      setSaveSuccess(false);
    },
    []
  );

  const validate = useCallback(() => {
    let newErrors = validateCommonFields(form);

    if (userType === "doctor") {
      newErrors = { ...newErrors, ...validateDoctorFields(form) };
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [form, userType]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!validate()) return;

      setIsLoading(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        console.log(`Updating ${userType} settings:`, form);
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
      } catch (error) {
        console.error("Failed to update settings:", error);
      } finally {
        setIsLoading(false);
      }
    },
    [validate, userType, form]
  );

  return {
    form,
    errors,
    isLoading,
    saveSuccess,
    handleChange,
    handleSubmit,
    setForm,
  };
};
