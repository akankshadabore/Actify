import { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as XLSX from 'xlsx';

import AccountTableHeader from './account/AccountTableHeader';
import AccountTableList from './account/AccountTableList';
import Pagination from './common/Pagination';

const AccountTable = () => {
    const { items } = useSelector((state) => state.accounts);
    const [search, setSearch] = useState('');
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const navigate = useNavigate();

    const allColumns = ['Account Name', 'Email', 'Phone No.', 'Website', 'Industry', 'Account Status', 'Remark'];
    const [visibleColumns, setVisibleColumns] = useState({
        'Account Name': true,
        'Email': true,
        'Phone No.': true,
        'Website': true,
        'Industry': true,
        'Account Status': true,
        'Remark': true
    });

    const toggleColumn = (column) => {
        setVisibleColumns(prev => ({
            ...prev,
            [column]: !prev[column]
        }));
    };

    const processedData = useMemo(() => {
        let data = [...items];

        if (search) {
            const lowerSearch = search.toLowerCase();
            data = data.filter(item =>
                Object.values(item).some(val =>
                    String(val).toLowerCase().includes(lowerSearch)
                )
            );
        }

        if (sortConfig.key) {
            data.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'asc' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'asc' ? 1 : -1;
                }
                return 0;
            });
        }

        return data;
    }, [items, search, sortConfig]);

    const totalPages = Math.ceil(processedData.length / itemsPerPage);
    const paginatedData = processedData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const exportToExcel = () => {
        const ws = XLSX.utils.json_to_sheet(processedData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Accounts");
        XLSX.writeFile(wb, "accounts_data.xlsx");
    };

    return (
        <div className="p-4 md:p-8">
            <AccountTableHeader
                search={search}
                setSearch={setSearch}
                onCreate={() => navigate('/create')}
                onExport={exportToExcel}
                visibleColumns={visibleColumns}
                toggleColumn={toggleColumn}
                allColumns={allColumns}
            />

            <AccountTableList
                data={paginatedData}
                visibleColumns={visibleColumns}
                allColumns={allColumns}
                sortConfig={sortConfig}
                onSort={handleSort}
            />

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
            />
        </div>
    );
};

export default AccountTable;
