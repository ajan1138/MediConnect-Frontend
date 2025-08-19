export interface BaseUserForm {
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: string;
  phone: string;
  address: string;
  emergencyContact: string;
  emergencyPhone: string;
}

export interface DoctorForm extends BaseUserForm {
  specialization: string;
  medicalLicense: string;
  yearsOfExperience: string;
  education: string;
  certifications: string;
  languagesSpoken: string;
  bio: string;
  consultationRate: string;
  availableHours: string;
  hospitalAffiliation: string;
}

export interface PatientForm extends BaseUserForm {
  medicalHistory: string;
  allergies: string;
  currentMedications: string;
}

export type UserForm = DoctorForm | PatientForm;
export type UserType = "doctor" | "patient";
