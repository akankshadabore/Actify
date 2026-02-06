import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addAccount } from '../store/accountsSlice';
import CustomSelect from './common/CustomSelect';

const AccountForm = () => {
    const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm({
        mode: 'onChange'
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();


    useEffect(() => {
        register('status');
        setValue('status', 'true');
    }, [register, setValue]);

    const currentStatus = watch('status');

    const onSubmit = (data) => {
        const formattedData = {
            ...data,
            status: data.status === 'true'
        };
        dispatch(addAccount(formattedData));
        navigate('/');
    };

    return (
        <div className="p-4 md:p-8">
            <div className="flex gap-1 mb-6 border-b border-gray-200">
                <button className="px-6 py-2 bg-white rounded-t-lg text-sm font-medium text-gray-700 border-t border-l border-r border-gray-200 shadow-sm relative top-[1px]">
                    Account Details
                </button>
                <button className="px-6 py-2 text-sm font-medium text-gray-500 hover:text-gray-700">Other Info</button>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="bg-gradient-to-r from-pink-500 to-purple-600 px-8 py-6 text-white">
                    <h2 className="text-xl font-semibold mb-1">Account Details</h2>
                    <p className="text-sm opacity-90">
                        Create a new account here. Click save when you're done.
                    </p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="p-4 md:p-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">

                        <div className="col-span-1 lg:col-span-3">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Account Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                className={`w-full p-2 border rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                                placeholder="Enter account name"
                                {...register("name", {
                                    required: "Account Name is required"
                                })}
                            />
                            {errors.name && <span className="text-xs text-red-500 mt-1">{errors.name.message}</span>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Email <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="email"
                                className={`w-full p-2 border rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                                placeholder="example@email.com"
                                onInput={(e) => {
                                    e.target.value = e.target.value.replace(/\s/g, '');
                                }}
                                {...register("email", {
                                    required: "Email is required",
                                    validate: {
                                        noSpaces: value => !/\s/.test(value) || "Email must not contain spaces"
                                    },
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: "Invalid email address"
                                    }
                                })}
                            />
                            {errors.email && <span className="text-xs text-red-500 mt-1">{errors.email.message}</span>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Phone No. <span className="text-red-500">*</span>
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

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Website
                            </label>
                            <input
                                type="url"
                                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                                placeholder="https://example.com"
                                {...register("website")}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Industry
                            </label>
                            <input
                                type="text"
                                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                                placeholder="Startups, Finance..."
                                {...register("industry")}
                            />
                        </div>

                        <div>
                            <CustomSelect
                                label="Account Status"
                                value={currentStatus}
                                onChange={(val) => setValue('status', val)}
                                options={[
                                    { label: 'Active', value: 'true' },
                                    { label: 'Inactive', value: 'false' }
                                ]}
                            />
                        </div>

                        <div className="col-span-1 lg:col-span-3">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Remark
                            </label>
                            <textarea
                                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none h-24 resize-none"
                                placeholder="Add any additional notes here..."
                                {...register("remark")}
                            ></textarea>
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
                            Save Account
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AccountForm;
