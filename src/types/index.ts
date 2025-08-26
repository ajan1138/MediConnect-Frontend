export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: string;
  isAccountLocked: boolean;
  isEnabled: boolean;
}

export interface Doctor {
  id: number;
  user: User;
  specialization: string;
  bio: string;
  location: string;
  isApproved: boolean;
  rate: number;
  createdDate: string;
  lastModifiedDate: string;
}

export interface Filters {
  searchQuery: string;
  specialization: string;
  location: string;
  rate: string;
  approved: boolean;
}

export interface SortOption {
  value: string;
  label: string;
}
