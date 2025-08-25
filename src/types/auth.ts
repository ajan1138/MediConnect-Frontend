export enum Role {
  PATIENT = "PATIENT",
  DOCTOR = "DOCTOR",
}

export interface BaseFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: Role | "";
}

export interface DoctorFormData extends BaseFormData {
  role: Role.DOCTOR;
  specialization: string;
  bio: string;
  location: string;
  rate: string;
}

export interface PatientFormData extends BaseFormData {
  role: Role.PATIENT;
  dateOfBirth: string;
}

export type RegistrationFormData =
  | BaseFormData
  | DoctorFormData
  | PatientFormData;
