import { Search } from "lucide-react";

interface NoResultsProps {
  onClearFilters: () => void;
}

const NoResults: React.FC<NoResultsProps> = ({ onClearFilters }) => (
  <div className="col-span-full">
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/30 p-12 text-center">
      <div className="w-24 h-24 mx-auto bg-gray-700/30 rounded-full flex items-center justify-center mb-4">
        <Search className="w-10 h-10 text-gray-500" />
      </div>
      <h3 className="text-xl font-semibold mb-2">No doctors found</h3>
      <p className="text-gray-400 mb-6">
        Try adjusting your search criteria or filters
      </p>
      <button
        className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
        onClick={onClearFilters}
      >
        Clear all filters
      </button>
    </div>
  </div>
);

export default NoResults;
