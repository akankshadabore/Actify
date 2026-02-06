import React, { useState } from 'react';
import { LayoutDashboard, User, Users, Contact, Briefcase, MessageSquare, ChevronDown, ChevronRight } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import clsx from 'clsx';

const SidebarItem = ({ icon: Icon, text, subItems, isOpen, toggle, onClose }) => {
    return (
        <div className="mb-1">
            <div
                className={clsx(
                    "flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-gray-50 text-gray-700",
                    isOpen && "bg-blue-50 text-blue-600"
                )}
                onClick={toggle}
            >
                <div className="flex items-center gap-3">
                    <Icon size={18} />
                    <span className="font-medium text-sm">{text}</span>
                </div>
                {subItems && (
                    isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />
                )}
            </div>

            {isOpen && subItems && (
                <div className="bg-gray-50 py-1">
                    {subItems.map((item, idx) => (
                        <NavLink
                            key={idx}
                            to={item.path}
                            onClick={onClose}
                            className={({ isActive }) => clsx(
                                "block pl-12 pr-4 py-2 text-sm hover:text-blue-600",
                                isActive ? "text-blue-600 bg-blue-100 font-medium" : "text-gray-500"
                            )}
                        >
                            {item.label}
                        </NavLink>
                    ))}
                </div>
            )}
        </div>
    );
};

const Sidebar = ({ onClose }) => {
    const [openSection, setOpenSection] = useState('Account');

    const toggleSection = (section) => {
        setOpenSection(openSection === section ? null : section);
    };

    return (
        <div className="w-64 bg-white h-screen border-r border-gray-200 flex flex-col fixed left-0 top-0 overflow-y-auto">
            <div className="p-6 border-b border-gray-100">
                <h1 className="text-xl font-bold text-blue-600">UserInterface :</h1>
            </div>

            <div className="py-4 flex-1">
                <SidebarItem
                    icon={LayoutDashboard}
                    text="Dashboard"
                />

                <SidebarItem
                    icon={User}
                    text="Account"
                    isOpen={openSection === 'Account'}
                    toggle={() => toggleSection('Account')}
                    subItems={[
                        { label: 'Accounts', path: '/' },
                        { label: 'Account Report', path: '/report' },
                        { label: 'Account Upload', path: '/upload' },
                    ]}
                    onClose={onClose}
                />

                <SidebarItem icon={Contact} text="Contact" subItems={[]} />
                <SidebarItem icon={Users} text="Lead" subItems={[]} />
                <SidebarItem icon={Briefcase} text="Deal" subItems={[]} />
                <SidebarItem icon={MessageSquare} text="Feedback" />
            </div>
        </div>
    );
};

export default Sidebar;
