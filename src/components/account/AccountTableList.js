import { MoreHorizontal } from 'lucide-react';

const AccountTableList = ({
    data,
    visibleColumns,
    allColumns,
    sortConfig,
    onSort
}) => {
    return (
        <div className="bg-white rounded-lg shadow overflow-hidden overflow-x-auto">
            <table className="min-w-[1200px] table-fixed divide-y divide-gray-200">
                <thead className="bg-blue-50">
                    <tr>
                        {allColumns.map((header, idx) => {
                            if (!visibleColumns[header]) return null;

                            const keyMap = {
                                'Account Name': 'name',
                                'Email': 'email',
                                'Phone No.': 'phone',
                                'Website': 'website',
                                'Industry': 'industry',
                                'Account Status': 'status',
                                'Remark': 'remark'
                            };
                            const widthMap = {
                                'Account Name': 'w-[160px]',
                                'Email': 'w-[220px]',
                                'Phone No.': 'w-[150px]',
                                'Website': 'w-[200px]',
                                'Industry': 'w-[200px]',
                                'Account Status': 'w-[130px]',
                                'Remark': 'w-[250px]'
                            };
                            const key = keyMap[header];
                            return (
                                <th
                                    key={idx}
                                    className={`px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-blue-100 ${widthMap[header]}`}
                                    onClick={() => onSort(key)}
                                >
                                    <div className="flex items-center gap-1 group">
                                        {header}
                                        <div className="flex flex-col w-3">
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
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider w-[100px]">Actions</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {data.length > 0 ? (
                        data.map((item) => (
                            <tr key={item.id} className="hover:bg-gray-50 h-[60px]">
                                {visibleColumns['Account Name'] && (
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 truncate w-[160px]" title={item.name}>{item.name}</td>
                                )}
                                {visibleColumns['Email'] && (
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 truncate w-[220px]" title={item.email}>{item.email}</td>
                                )}
                                {visibleColumns['Phone No.'] && (
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 truncate w-[150px]" title={item.phone}>{item.phone}</td>
                                )}
                                {visibleColumns['Website'] && (
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 hover:underline truncate w-[200px]" title={item.website}>
                                        <a href={item.website} target="_blank" rel="noopener noreferrer">{item.website}</a>
                                    </td>
                                )}
                                {visibleColumns['Industry'] && (
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 truncate w-[200px]" title={item.industry}>{item.industry || 'n/a'}</td>
                                )}
                                {visibleColumns['Account Status'] && (
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 truncate w-[130px]">{item.status ? 'true' : 'false'}</td>
                                )}
                                {visibleColumns['Remark'] && (
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 truncate w-[250px]" title={item.remark}>{item.remark || '-'}</td>
                                )}

                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium w-[100px]">
                                    <button className="text-gray-400 hover:text-gray-600">
                                        <MoreHorizontal size={20} />
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="8" className="px-6 py-12 text-center text-gray-500">
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
