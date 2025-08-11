// src/utils/validation.ts
export const validateEmail = (email: string) => /\S+@\S+\.\S+/.test(email);

export const validateRequired = (value: string) => value.trim().length > 0;

export const validatePassword = (password: string) => password.length >= 8;

export const validateRate = (rate: string | number) => {
  const num = Number(rate);
  return !isNaN(num) && num >= 0;
};
