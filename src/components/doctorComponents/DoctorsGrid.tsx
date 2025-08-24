import type { Doctor } from "../../types";
import DoctorCard from "./DoctorCard";
import NoResults from "./NoResults";

interface DoctorsGridProps {
  doctors: Doctor[];
  onClearFilters: () => void;
}

const DoctorsGrid: React.FC<DoctorsGridProps> = ({
  doctors,
  onClearFilters,
}) => (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
    {doctors.length > 0 ? (
      doctors.map((doctor) => <DoctorCard key={doctor.id} doctor={doctor} />)
    ) : (
      <NoResults onClearFilters={onClearFilters} />
    )}
  </div>
);

export default DoctorsGrid;
