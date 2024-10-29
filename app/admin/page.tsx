'use client';
import React, { useEffect } from 'react';
import { FunderLists, FunderProps } from '../components/FunderList';
import info from '@/hooks/info';
import { useChangeVerifyStatusMutation } from '@/redux/api/apiSlice';
import Loading from '../components/Loading';

const AdminRoot: React.FC = ({}) => {
    const [changeVerifyStatus, { isLoading, isError, error, data, isSuccess }] =
        useChangeVerifyStatusMutation();

    function statusChangeHandler(funder: FunderProps, type: string = 'change') {
        const passKey: string | null = new URL(
            window.location.href
        ).searchParams.get('pass-key');

        if (!passKey) {
            alert('Passkey not Found');
            return null;
        }

        if (type === 'delete') {
            if (!confirm('আপনি কি সম্পূর্ণ এটি মুছে ফেলতে চান?')) return null;
        }

        changeVerifyStatus({ id: funder.id, passKey, type });
        info(funder, passKey);
        return null;
    }

    useEffect(
        function () {
            if (isError) {
                alert(
                    'এই মুহূর্তে পেমেন্ট যাচাইযকরণ ব্যাহত হয়েছে! কিছুক্ষন পর আবার চেষ্টা করুন!'
                );
            }

            if (isSuccess) {
                alert('পেমেন্ট যাচাইকরণ সফল হয়েছে!');
            }

            info(true, 'useChangeVerifyStatusMutation', {
                isLoading,
                isError,
                error,
                data,
                isSuccess,
            });
        },
        [isLoading, isError, error, data, isSuccess]
    );

    return (
        <div className="w-full min-h-screen flex flex-col items-center justify-center">
            {isLoading && <Loading />}
            <div className="container p-2">
                <FunderLists
                    isAdmin
                    statusChangeHandler={statusChangeHandler}
                />
            </div>
        </div>
    );
};

export default AdminRoot;
