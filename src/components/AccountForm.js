import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addAccount } from '../store/accountsSlice';


const AccountForm = () => {
    const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm({
        mode: 'onChange'
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        // Initialize or fetch data if needed
    }, []);

    const onSubmit = (data) => {
        const formattedData = {
            ...data,
            // Add any specific formatting if needed
        };
        dispatch(addAccount(formattedData));
        navigate('/');
    };

    return (
        <div className="p-4 md:p-8">
            <div className="flex gap-1 mb-6 border-b border-gray-200">
                <button className="px-6 py-2 bg-white rounded-t-lg text-sm font-medium text-gray-700 border-t border-l border-r border-gray-200 shadow-sm relative top-[1px]">
                    Personal
                </button>
                <button className="px-6 py-2 text-sm font-medium text-gray-500 hover:text-gray-700">Education</button>
                <button className="px-6 py-2 text-sm font-medium text-gray-500 hover:text-gray-700">Experience</button>
                <button className="px-6 py-2 text-sm font-medium text-gray-500 hover:text-gray-700">Other</button>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="bg-gradient-to-r from-pink-500 to-purple-600 px-8 py-6 text-white">
                    <h2 className="text-xl font-semibold mb-1">Personal Details</h2>
                    <p className="text-sm opacity-90">
                        Make changes to your Profile Account here. <span className="bg-red-500 px-1 rounded">Click save when you're done.</span>
                    </p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="p-4 md:p-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">

                        {/* Row 1: Names */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                First Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                className={`w-full p-2 border rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none ${errors.firstName ? 'border-red-500' : 'border-gray-300'}`}
                                placeholder="Ashish"
                                {...register("firstName", {
                                    required: "First Name is required"
                                })}
                            />
                            {errors.firstName && <span className="text-xs text-red-500 mt-1">{errors.firstName.message}</span>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Middle Name
                            </label>
                            <input
                                type="text"
                                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                                placeholder="new"
                                {...register("middleName")}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Last Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                className={`w-full p-2 border rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none ${errors.lastName ? 'border-red-500' : 'border-gray-300'}`}
                                placeholder="id"
                                {...register("lastName", {
                                    required: "Last Name is required"
                                })}
                            />
                            {errors.lastName && <span className="text-xs text-red-500 mt-1">{errors.lastName.message}</span>}
                        </div>

                        {/* Row 2: Contact */}
                        <div className="md:col-span-1">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Email <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="email"
                                className={`w-full p-2 border rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                                placeholder="ashish65@gmail.com"
                                {...register("email", {
                                    required: "Email is required",
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: "Invalid email address"
                                    }
                                })}
                            />
                            {errors.email && <span className="text-xs text-red-500 mt-1">{errors.email.message}</span>}
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Phone <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="tel"
                                className={`w-full p-2 border rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
                                placeholder="0987654321"
                                onInput={(e) => {
                                    e.target.value = e.target.value.replace(/[^0-9]/g, '');
                                }}
                                {...register("phone", {
                                    required: "Phone number is required",
                                    pattern: {
                                        value: /^[0-9]+$/,
                                        message: "Phone number must contain only numbers"
                                    }
                                })}
                            />
                            {errors.phone && <span className="text-xs text-red-500 mt-1">{errors.phone.message}</span>}
                        </div>

                        {/* Row 3: Address */}
                        <div className="col-span-1 md:col-span-3">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Address <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                className={`w-full p-2 border rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none h-24 resize-none ${errors.address ? 'border-red-500' : 'border-gray-300'}`}
                                placeholder="Type your address here."
                                {...register("address", { required: "Address is required" })}
                            ></textarea>
                            {errors.address && <span className="text-xs text-red-500 mt-1">{errors.address.message}</span>}
                        </div>

                        {/* Row 4: Location */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 col-span-1 md:col-span-3">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Pin Code <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    className={`w-full p-2 border rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none ${errors.pinCode ? 'border-red-500' : 'border-gray-300'}`}
                                    {...register("pinCode", { required: "Pin Code is required" })}
                                />
                                {errors.pinCode && <span className="text-xs text-red-500 mt-1">{errors.pinCode.message}</span>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Country <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    className={`w-full p-2 border rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none ${errors.country ? 'border-red-500' : 'border-gray-300'}`}
                                    {...register("country", { required: "Country is required" })}
                                />
                                {errors.country && <span className="text-xs text-red-500 mt-1">{errors.country.message}</span>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    State <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    className={`w-full p-2 border rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none ${errors.state ? 'border-red-500' : 'border-gray-300'}`}
                                    {...register("state", { required: "State is required" })}
                                />
                                {errors.state && <span className="text-xs text-red-500 mt-1">{errors.state.message}</span>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    City <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    className={`w-full p-2 border rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none ${errors.city ? 'border-red-500' : 'border-gray-300'}`}
                                    {...register("city", { required: "City is required" })}
                                />
                                {errors.city && <span className="text-xs text-red-500 mt-1">{errors.city.message}</span>}
                            </div>
                        </div>

                    </div>

                    <div className="flex justify-end pt-4 border-t border-gray-100">
                        <button
                            type="button"
                            onClick={() => navigate('/')}
                            className="mr-3 px-6 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50 font-medium"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-8 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded hover:opacity-90 font-medium shadow-md"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AccountForm;
