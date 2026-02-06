import { ChevronLeft, ChevronRight } from 'lucide-react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    return (
        <div className="mt-4 flex items-center justify-end gap-4 text-sm text-gray-600">
            <span>Page {currentPage} of {totalPages || 1}</span>
            <div className="flex items-center border rounded overflow-hidden">
                <button
                    className="p-2 hover:bg-gray-100 disabled:opacity-50"
                    onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                >
                    <ChevronLeft size={16} />
                </button>
                <div className="px-4 py-2 border-l border-r border-gray-200 bg-white">
                    {currentPage}
                </div>
                <button
                    className="p-2 hover:bg-gray-100 disabled:opacity-50"
                    onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                >
                    <ChevronRight size={16} />
                </button>
            </div>
        </div>
    );
};

export default Pagination;
