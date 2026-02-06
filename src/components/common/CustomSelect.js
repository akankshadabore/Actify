import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

const CustomSelect = ({ label, options, value, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const selectedOption = options.find(opt => opt.value === value) || options[0];

    return (
        <div ref={dropdownRef} className="relative">
            {label && (
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    {label}
                </label>
            )}
            <div
                onClick={() => setIsOpen(!isOpen)}
                className="w-full p-2 border border-gray-300 rounded focus-within:ring-2 focus-within:ring-purple-500 focus-within:border-transparent
                 bg-white cursor-pointer flex justify-between items-center"
            >
                <span className="text-gray-900">
                    {selectedOption ? selectedOption.label : 'Select...'}
                </span>
                <ChevronDown size={16} className="text-gray-500" />
            </div>

            {isOpen && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded shadow-lg">
                    {options.map((option) => (
                        <div
                            key={option.value}
                            className="px-4 py-2 hover:bg-gray-50 cursor-pointer flex items-center justify-between"
                            onClick={() => {
                                onChange(option.value);
                                setIsOpen(false);
                            }}
                        >
                            <span>{option.label}</span>
                            {value === option.value && <Check size={16} className="text-blue-600" />}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CustomSelect;
