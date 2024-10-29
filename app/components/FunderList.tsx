'use client';
import { useGetFundersQuery } from '@/redux/api/apiSlice';
import info, { asset } from '@/hooks/info';
import Image from 'next/image';
import Loading from './Loading';
import React, { useEffect, useState } from 'react';

export interface FunderProps {
    id: number;
    amount: string;
    phone: string;
    account: string;
    transactionId: string;
    name: string;
    roll: number | null;
    registration: string | number | null;
    email: string;
    password: string;
    comment: string;
    accountType: string;
    profileImage: string;
    paymentRefImage: string;
    createdAt: null | string;
    updatedAt: null | string;
    currency: null | string;
    isVerified: number | boolean;
}

export function showHideFormByManipulateDom(type = '') {
    const form = document.getElementById('fund-add-form');
    const handler = document.getElementById('handler');

    const key = 'form-state';
    const formState = localStorage.getItem(key);
    if (!formState) localStorage.setItem(key, 'false');

    if (form && handler && type === 'initiate') {
        if (localStorage.getItem(key) === 'true') {
            form.style.display = 'none';
            handler.textContent = 'ভিজিবল ফরর্ম';
            handler.style.backgroundColor = 'var(--secondary)';
        } else {
            form.style.display = 'flex';
            handler.textContent = 'হাইড ফরম';
            handler.style.backgroundColor = 'var(--primary)';
        }

        return;
    }

    if (form && handler) {
        if (localStorage.getItem(key) === 'true') {
            localStorage.setItem(key, 'false');
            form.style.display = 'flex';
            handler.textContent = 'হাইড ফরম';
            handler.style.backgroundColor = 'var(--primary)';
        } else {
            form.style.display = 'none';
            localStorage.setItem(key, 'true');
            handler.textContent = 'ভিজিবল ফরর্ম';
            handler.style.backgroundColor = 'var(--secondary)';
        }
        return;
    }
}

export const FunderLists: React.FC<{
    isAdmin?: boolean;
    statusChangeHandler?: (funder: FunderProps) => void | null;
}> = ({ isAdmin = false, statusChangeHandler = () => null }) => {
    useEffect(function () {
        setTimeout(() => showHideFormByManipulateDom('initiate'), 500);
    }, []);

    const { isError, isLoading, error, data } = useGetFundersQuery(undefined);
    info(true, 'useGetFundersQuery', { isError, isLoading, error, data });

    if (isLoading) return <Loading />;
    if (isError) return 'Error!';

    return (
        <div className="w-full py-10 px-2">
            <div className="w-full flex justify-between items-center">
                <h1 className="text-2xl font-li-ador-bold text-secondary border-b border-dashed border-secondary pb-2 mb-6">
                    ফান্ডকারীদের তালিকা
                </h1>
                {isAdmin ? (
                    <a
                        href={asset(
                            'api/funder/funder-download-developed-by-syedamirali'
                        )}
                        target="_blank"
                        id="handler"
                        className="font-li-ador-bold bg-secondary px-4 py-1 text-lg text-white hover:bg-primary rounded-md duration-500 hover:tracking-wide"
                    >
                        ফান্ডকারীদের তালিকা ডাউনলোড করুন
                    </a>
                ) : (
                    <button
                        id="handler"
                        className="font-li-ador-bold bg-primary px-4 py-1 text-lg text-white rounded-md duration-500 hover:tracking-wide"
                        onClick={() => showHideFormByManipulateDom()}
                    >
                        হাইড ফরম
                    </button>
                )}
            </div>

            <div className="overflow-x-auto font-li-ador">
                <table className="min-w-full bg-white border-collapse border border-gray-200">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border border-gray-200 px-4 py-2 text-center">
                                প্রোফাইল ইমেজ
                            </th>
                            <th className="border border-gray-200 px-4 py-2 text-center">
                                নাম
                            </th>
                            <th className="border border-gray-200 px-4 py-2 text-center">
                                ফান্ডিং এমাউন্ট
                            </th>
                            <th className="border border-gray-200 px-4 py-2 text-center">
                                রোল নম্বর
                            </th>
                            {isAdmin && (
                                <th className="border border-gray-200 px-4 py-2 text-center">
                                    ফোন নম্বর
                                </th>
                            )}
                            {isAdmin && (
                                <th className="border border-gray-200 px-4 py-2 text-center">
                                    একাউন্ট নাম্বার
                                </th>
                            )}
                            {isAdmin && (
                                <th className="border border-gray-200 px-4 py-2 text-center">
                                    ট্রানজেকশন আইডি
                                </th>
                            )}
                            <th className="border border-gray-200 px-4 py-2 text-center">
                                ভেরিফিকেশন স্ট্যাটাস
                            </th>
                            {isAdmin && (
                                <th className="border border-gray-200 px-4 py-2 text-center !max-w-60">
                                    চেঞ্জ ভেরিফিকেশন স্ট্যাটাস
                                </th>
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((funder: FunderProps) => (
                            <FunderItem
                                key={funder.id}
                                funder={funder}
                                isAdmin={isAdmin}
                                statusChangeHandler={statusChangeHandler}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const FunderItem: React.FC<{
    funder: FunderProps;
    isAdmin: boolean;
    statusChangeHandler: (funder: FunderProps, type?: string) => void | null;
}> = ({ funder, isAdmin, statusChangeHandler }) => {
    const [isChecked, setIsChecked] = useState<boolean>(
        funder.isVerified === 1 || funder.isVerified === true
    );

    return (
        <tr className="hover:bg-gray-50">
            <td className="border-t border-gray-200 px-4 py-2 text-center">
                {funder.profileImage ? (
                    <Image
                        src={asset(funder.profileImage || '')}
                        alt={`${funder.name}'s profile`}
                        width={40}
                        height={40}
                        className="rounded-full"
                    />
                ) : (
                    <p>No Image</p>
                )}
            </td>
            <td className="border-t border-gray-200 px-4 py-2 text-center text-nowrap">
                {funder.name}
            </td>
            <td className="border-t border-gray-200 px-4 py-2 text-center text-secondary font-bold">
                <i className="fa-solid fa-bangladeshi-taka-sign pr-1 text-slate-400"></i>
                {funder.amount}
            </td>
            <td className="border-t border-gray-200 px-4 py-2 text-center">
                {funder.roll}
            </td>
            {isAdmin && (
                <td className="border-t border-gray-200 px-4 py-2 text-center">
                    {funder.phone}
                </td>
            )}
            {isAdmin && (
                <td className="border-t border-gray-200 px-4 py-2 text-center">
                    {funder.account}
                </td>
            )}
            {isAdmin && (
                <td className="border-t border-gray-200 px-4 py-2 text-center">
                    {funder.transactionId}
                </td>
            )}
            <td className="border-t border-gray-200 px-4 py-2 text-center">
                {funder.isVerified === 1 || funder.isVerified ? (
                    <span className="bg-secondary px-6 py-1 w-auto text-white font-li-ador-bold rounded-full">
                        সফল
                    </span>
                ) : (
                    <span className="bg-primary px-6 py-1 w-auto text-white font-li-ador-bold rounded-full">
                        পেন্ডিং
                    </span>
                )}
            </td>
            {isAdmin && (
                <td className="border-t border-gray-200 px-4 py-1 flex items-center justify-center">
                    <label
                        htmlFor={`verified-${funder.id}`}
                        className="flex items-center cursor-pointer"
                    >
                        <div className="relative">
                            <input
                                id={`verified-${funder.id}`}
                                type="checkbox"
                                className="sr-only peer"
                                onChange={(e) => {
                                    statusChangeHandler(funder);
                                    setIsChecked(e.target.checked);
                                }}
                                checked={isChecked}
                            />
                            <div className="block bg-gray-300 w-14 h-8 rounded-full peer-checked:bg-secondary duration-500"></div>
                            <div className="dot absolute left-1.5 top-[5px] bg-slate-400 w-[22px] h-[22px] rounded-full duration-300 peer-checked:bg-white peer-checked:left-7"></div>
                        </div>
                    </label>
                    <button
                        className="ml-4 py-1.5 px-3 rounded-full text-white bg-red-400 duration-500 hover:bg-red-500"
                        onClick={() => statusChangeHandler(funder, 'delete')}
                    >
                        <i className="fa-solid fa-trash"></i>
                    </button>
                </td>
            )}
            {/* <td className="border-t border-gray-200 px-4 py-2 text-center space-x-2">
        <button
            //   onClick={() => onEdit(funder.id)}
            className="text-blue-500 hover:underline"
        >
            Edit
        </button>
        <button
            //   onClick={() => onDelete(funder.id)}
            className="text-red-500 hover:underline"
        >
            Delete
        </button>
    </td> */}
        </tr>
    );
};
