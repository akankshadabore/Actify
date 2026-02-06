import { useState, useRef, useEffect } from 'react';
import { Search, FileSpreadsheet, ListFilter, Check } from 'lucide-react';

const AccountTableHeader = ({
    search,
    setSearch,
    onCreate,
    onExport,
    visibleColumns,
    toggleColumn,
    allColumns
}) => {
    const [isViewMenuOpen, setIsViewMenuOpen] = useState(false);
    const viewMenuRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (viewMenuRef.current && !viewMenuRef.current.contains(event.target)) {
                setIsViewMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="mb-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
                <div>
                    <div className="flex gap-2 mb-4">
                        <button className="px-4 py-2 bg-white border border-gray-300 rounded text-sm font-medium text-gray-700">
                            Account
                        </button>
                        <button
                            onClick={onCreate}
                            className="px-4 py-2 bg-gray-100 border border-transparent rounded text-sm font-medium text-gray-500 hover:bg-gray-200"
                        >
                            + Create
                        </button>
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900">Account Lists</h1>
                    <p className="text-gray-500">Here's a list of your accounts.</p>
                </div>

                <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                    <button
                        onClick={onExport}
                        className="p-2 border border-gray-300 rounded bg-white hover:bg-gray-50 text-green-600"
                        title="Download Excel"
                    >
                        <FileSpreadsheet size={20} />
                    </button>

                    <div className="relative" ref={viewMenuRef}>
                        <button
                            onClick={() => setIsViewMenuOpen(!isViewMenuOpen)}
                            className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded bg-white hover:bg-gray-50 text-gray-700"
                        >
                            <ListFilter size={18} />
                            <span>View</span>
                        </button>

                        {isViewMenuOpen && (
                            <div className="absolute left-0 md:left-auto md:right-0 mt-2 w-56 bg-white rounded-md shadow-lg border border-gray-200 z-10 p-2">
                                <div className="mb-2 px-2 py-1 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                    Toggle Columns
                                </div>
                                {allColumns.map((col) => (
                                    <button
                                        key={col}
                                        onClick={() => toggleColumn(col)}
                                        className="flex items-center w-full px-2 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded text-left"
                                    >
                                        <div className={`w-4 h-4 mr-3 border rounded flex items-center justify-center ${visibleColumns[col] ? 'bg-blue-600 border-blue-600' : 'border-gray-300'}`}>
                                            {visibleColumns[col] && <Check size={12} className="text-white" />}
                                        </div>
                                        {col}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="relative flex-1 md:flex-none">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search Here..."
                            className="pl-10 pr-4 py-2 border border-gray-300 rounded w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AccountTableHeader;
