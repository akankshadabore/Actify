import { MoreHorizontal } from 'lucide-react';



const AccountTableList = ({
    data,
    visibleColumns,
    allColumns,
    sortConfig,
    onSort
}) => {
    const columnConfig = {
        'First Name': { key: 'firstName', width: '150px' },
        'Middle Name': { key: 'middleName', width: '150px' },
        'Last Name': { key: 'lastName', width: '150px' },
        'Email': { key: 'email', width: '250px' },
        'Phone': { key: 'phone', width: '150px' },
        'Address': { key: 'address', width: '300px' },
        'Pin Code': { key: 'pinCode', width: '120px' },
        'Country': { key: 'country', width: '150px' },
        'State': { key: 'state', width: '150px' },
        'City': { key: 'city', width: '150px' }
    };

    return (
        <div className="bg-white rounded-lg shadow overflow-hidden overflow-x-auto">
            <table className="min-w-[1200px] table-fixed divide-y divide-gray-200">
                <colgroup>
                    {allColumns.map((header) => {
                        if (!visibleColumns[header]) return null;
                        const width = columnConfig[header]?.width || '150px';
                        return <col key={header} style={{ width }} />;
                    })}
                    <col style={{ width: '100px' }} />
                </colgroup>

                <thead className="bg-blue-50">
                    <tr>
                        {allColumns.map((header, idx) => {
                            if (!visibleColumns[header]) return null;
                            const { key } = columnConfig[header];

                            return (
                                <th
                                    key={idx}
                                    className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-blue-100 overflow-hidden"
                                    onClick={() => onSort(key)}
                                >
                                    <div className="flex items-center gap-1 group">
                                        <span className="truncate" title={header}>{header}</span>
                                        <div className="flex flex-col w-3 flex-shrink-0">
                                            {sortConfig.key === key ? (
                                                <span className="text-[10px] leading-3">{sortConfig.direction === 'asc' ? '▲' : '▼'}</span>
                                            ) : (
                                                <span className="text-[10px] leading-3 opacity-0 group-hover:opacity-30">▲</span>
                                            )}
                                        </div>
                                    </div>
                                </th>
                            );
                        })}
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider overflow-hidden">Actions</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {data.length > 0 ? (
                        data.map((item) => (
                            <tr key={item.id} className="hover:bg-gray-50 h-[60px]">
                                {visibleColumns['First Name'] && (
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 truncate" title={item.firstName}>{item.firstName}</td>
                                )}
                                {visibleColumns['Middle Name'] && (
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 truncate">{item.middleName || '-'}</td>
                                )}
                                {visibleColumns['Last Name'] && (
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 truncate">{item.lastName}</td>
                                )}
                                {visibleColumns['Email'] && (
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 truncate" title={item.email}>{item.email}</td>
                                )}
                                {visibleColumns['Phone'] && (
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 truncate">{item.phone}</td>
                                )}
                                {visibleColumns['Address'] && (
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 truncate" title={item.address}>{item.address}</td>
                                )}
                                {visibleColumns['Pin Code'] && (
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 truncate">{item.pinCode}</td>
                                )}
                                {visibleColumns['Country'] && (
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 truncate">{item.country}</td>
                                )}
                                {visibleColumns['State'] && (
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 truncate">{item.state}</td>
                                )}
                                {visibleColumns['City'] && (
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 truncate">{item.city}</td>
                                )}

                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button className="text-gray-400 hover:text-gray-600">
                                        <MoreHorizontal size={20} />
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={allColumns.filter(c => visibleColumns[c]).length + 1} className="px-6 py-12 text-center text-gray-500">
                                No results found
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default AccountTableList;
