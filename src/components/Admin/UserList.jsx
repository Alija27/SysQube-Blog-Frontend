import React from 'react'
import axios from 'axios'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'


const UserList = () => {
    const { data, isLoading } = useQuery("users", async () => {
        const response = await axios.get("http://localhost:8000/api/users");
        return response.data;
    });
    console.log("data", data);



    if (isLoading) {
        return <div>Loading...</div>;
    }
    return (
        <div className="w-8/12 bg-white border border-gray-200 shadow-md mx-8">
            <div className="flex justify-between mb-6 border-b border-gray-200">
                <p className="m-1 mx-4 my-4 text-2xl font-bold"> All Users</p>
            </div>
            <table className="min-w-full  divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">

                            SN.
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">

                            Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">

                            Email
                        </th>
                        
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {data && data.length > 0 ? (
                        data.map((user, index) => (
                            <tr key={user.id} className="border-b min-w-full">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">{index + 1}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">{user.name}</div>
                                </td>

                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">{user.email}</div>
                                </td>
                                

                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={4} className="text-center text-red-500 text-lg font-semibold">
                                No Users Found
                            </td>
                        </tr>
                    )}

                </tbody>


            </table>



        </div>
    )
}

export default UserList