import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  startIndex: number;
  itemsPerPage: number;
  totalItems: number;
  onPageChange: (page: number) => void;
  onNextPage: () => void;
  onPrevPage: () => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  startIndex,
  itemsPerPage,
  totalItems,
  onPageChange,
  onNextPage,
  onPrevPage,
}) => (
  <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/30 p-6">
    <div className="flex justify-between items-center">
      <p className="text-gray-400">
        Showing {startIndex + 1} to{" "}
        {Math.min(startIndex + itemsPerPage, totalItems)} of {totalItems}{" "}
        results
      </p>

      <div className="flex gap-2">
        <button
          disabled={currentPage === 1}
          onClick={onPrevPage}
          className="p-2 bg-gray-700/50 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700 transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`w-10 h-10 rounded-lg transition-colors ${
              currentPage === page
                ? "bg-blue-600 text-white"
                : "bg-gray-700/50 hover:bg-gray-700 text-gray-300"
            }`}
          >
            {page}
          </button>
        ))}

        <button
          disabled={currentPage === totalPages}
          onClick={onNextPage}
          className="p-2 bg-gray-700/50 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700 transition-colors"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  </div>
);

export default Pagination;
