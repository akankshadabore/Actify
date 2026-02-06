import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="flex bg-gray-50 min-h-screen">
            {/* Mobile Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sidebar - Mobile: Fixed/Overlay, Desktop: Static */}
            <div className={`
        fixed inset-y-0 left-0 z-30 w-64 bg-white transition-transform duration-300 transform 
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0 md:static
      `}>
                <Sidebar onClose={() => setIsSidebarOpen(false)} />
            </div>

            <div className="flex-1 flex flex-col min-w-0">
                {/* Mobile Header with Hamburger */}
                <div className="md:hidden bg-white border-b border-gray-200 p-4 flex items-center justify-between">
                    <span className="font-bold text-blue-600 text-lg">UserInterface</span>
                    <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-gray-600">
                        {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {/* Main Content */}
                <div className="flex-1 overflow-auto">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Layout;
