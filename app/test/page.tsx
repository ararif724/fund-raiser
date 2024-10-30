'use client'
import React, { useEffect, useState } from 'react'
import { FunderProps } from '../components/FunderList'

const Page: React.FC = () => {
    const [data, setData] = useState<FunderProps[] | null>(null)

    useEffect(() => {
        (async () => {
            try {
                const response = await fetch('/api/funder')
                const result = await response.json()
                setData(result)
            } catch (error) {
                console.log('Error:', error)
            }
        })()
    }, [])

    return (
        <div className="p-4">
            <h1 className="text-xl font-semibold mb-4">Funder List</h1>
            <div className="overflow-x-auto">
                <table className="min-w-full border-collapse border border-gray-300 text-sm text-left">
                    <thead>
                        <tr className="bg-gray-100 border-b">
                            <th className="border border-gray-300 px-4 py-2">ID</th>
                            <th className="border border-gray-300 px-4 py-2">Amount</th>
                            <th className="border border-gray-300 px-4 py-2">Phone</th>
                            <th className="border border-gray-300 px-4 py-2">Account</th>
                            <th className="border border-gray-300 px-4 py-2">Transaction ID</th>
                            <th className="border border-gray-300 px-4 py-2">Name</th>
                            <th className="border border-gray-300 px-4 py-2">Roll</th>
                            <th className="border border-gray-300 px-4 py-2">Registration</th>
                            <th className="border border-gray-300 px-4 py-2">Email</th>
                            <th className="border border-gray-300 px-4 py-2">Comment</th>
                            <th className="border border-gray-300 px-4 py-2">Account Type</th>
                            <th className="border border-gray-300 px-4 py-2">Created At</th>
                            <th className="border border-gray-300 px-4 py-2">Updated At</th>
                            <th className="border border-gray-300 px-4 py-2">Currency</th>
                            <th className="border border-gray-300 px-4 py-2">Is Verified</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.map((funder) => (
                            <tr key={funder.id} className="border-b hover:bg-gray-50">
                                <td className="border border-gray-300 px-4 py-2">{funder.id}</td>
                                <td className="border border-gray-300 px-4 py-2">{funder.amount}</td>
                                <td className="border border-gray-300 px-4 py-2">{funder.phone}</td>
                                <td className="border border-gray-300 px-4 py-2">{funder.account}</td>
                                <td className="border border-gray-300 px-4 py-2">{funder.transactionId}</td>
                                <td className="border border-gray-300 px-4 py-2">{funder.name}</td>
                                <td className="border border-gray-300 px-4 py-2">{funder.roll}</td>
                                <td className="border border-gray-300 px-4 py-2">{funder.registration}</td>
                                <td className="border border-gray-300 px-4 py-2">{funder.email}</td>
                                <td className="border border-gray-300 px-4 py-2">{funder.comment}</td>
                                <td className="border border-gray-300 px-4 py-2">{funder.accountType}</td>
                                <td className="border border-gray-300 px-4 py-2">{funder.createdAt}</td>
                                <td className="border border-gray-300 px-4 py-2">{funder.updatedAt}</td>
                                <td className="border border-gray-300 px-4 py-2">{funder.currency}</td>
                                <td className="border border-gray-300 px-4 py-2">{funder.isVerified ? 'Yes' : 'No'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Page
