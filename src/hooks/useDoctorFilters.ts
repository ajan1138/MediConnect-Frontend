import { useMemo } from "react";
import type { Doctor } from "../types";
import { filterDoctors, sortDoctors } from "../utils/doctorUtils";

export const useDoctorFilters = (
  doctors: Doctor[],
  searchQuery: string,
  specializationFilter: string,
  locationFilter: string,
  rateFilter: string,
  approvedFilter: boolean,
  sortBy: string
) => {
  const filteredDoctors = useMemo(() => {
    return filterDoctors(
      doctors,
      searchQuery,
      specializationFilter,
      locationFilter,
      rateFilter,
      approvedFilter
    );
  }, [
    doctors,
    searchQuery,
    specializationFilter,
    locationFilter,
    rateFilter,
    approvedFilter,
  ]);

  const sortedDoctors = useMemo(() => {
    return sortDoctors(filteredDoctors, sortBy);
  }, [filteredDoctors, sortBy]);

  return { filteredDoctors, sortedDoctors };
};
