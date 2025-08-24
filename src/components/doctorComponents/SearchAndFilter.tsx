import { ChevronDown, Filter, Search } from "lucide-react";
import { SPECIALIZATIONS } from "../../constants/doctors";

interface SearchAndFiltersProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  sortBy: string;
  setSortBy: (value: string) => void;
  showFilters: boolean;
  setShowFilters: (value: boolean) => void;
  specializationFilter: string;
  setSpecializationFilter: (value: string) => void;
  locationFilter: string;
  setLocationFilter: (value: string) => void;
  rateFilter: string;
  setRateFilter: (value: string) => void;
  approvedFilter: boolean;
  setApprovedFilter: (value: boolean) => void;
  onClearFilters: () => void;
}

const SearchAndFilters: React.FC<SearchAndFiltersProps> = ({
  searchQuery,
  setSearchQuery,
  sortBy,
  setSortBy,
  showFilters,
  setShowFilters,
  specializationFilter,
  setSpecializationFilter,
  locationFilter,
  setLocationFilter,
  rateFilter,
  setRateFilter,
  approvedFilter,
  setApprovedFilter,
  onClearFilters,
}) => (
  <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/30 mb-8">
    <div className="flex flex-col lg:flex-row gap-4">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search by doctor name, specialization, location, or email..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-gray-700/50 border border-gray-600/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex gap-3">
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-4 py-3 bg-gray-700/50 border border-gray-600/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="name">Sort by Name</option>
          <option value="rate_low">Fee: Low to High</option>
          <option value="rate_high">Fee: High to Low</option>
        </select>

        <button
          className="flex items-center gap-2 px-4 py-3 bg-gray-700/50 border border-gray-600/30 rounded-lg hover:bg-gray-700 transition-colors"
          onClick={() => setShowFilters(!showFilters)}
        >
          <Filter className="w-5 h-5" />
          Filters
          <ChevronDown
            className={`w-4 h-4 transition-transform ${
              showFilters ? "rotate-180" : ""
            }`}
          />
        </button>
      </div>
    </div>

    {showFilters && (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6 pt-6 border-t border-gray-700/30">
        <div>
          <label className="block text-sm text-gray-400 mb-2">
            Specialization
          </label>
          <select
            value={specializationFilter}
            onChange={(e) => setSpecializationFilter(e.target.value)}
            className="w-full p-2 bg-gray-700/50 border border-gray-600/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Specializations</option>
            {SPECIALIZATIONS.map((specialization) => (
              <option key={specialization} value={specialization}>
                {specialization}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-2">Location</label>
          <input
            type="text"
            placeholder="Enter location"
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
            className="w-full p-2 bg-gray-700/50 border border-gray-600/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-2">
            Consultation Fee
          </label>
          <select
            value={rateFilter}
            onChange={(e) => setRateFilter(e.target.value)}
            className="w-full p-2 bg-gray-700/50 border border-gray-600/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Any Fee Range</option>
            <option value="0-100">$0 - $100</option>
            <option value="101-200">$101 - $200</option>
            <option value="201-300">$201 - $300</option>
            <option value="301+">$301+</option>
          </select>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="approved"
            checked={approvedFilter}
            onChange={(e) => setApprovedFilter(e.target.checked)}
            className="mr-2 w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
          />
          <label htmlFor="approved" className="text-sm text-gray-300">
            Only Approved Doctors
          </label>
        </div>

        <div className="flex items-end">
          <button
            onClick={onClearFilters}
            className="w-full px-4 py-2 bg-red-600/20 text-red-400 border border-red-600/30 rounded-lg hover:bg-red-600/30 transition-colors"
          >
            Clear Filters
          </button>
        </div>
      </div>
    )}
  </div>
);

export default SearchAndFilters;
