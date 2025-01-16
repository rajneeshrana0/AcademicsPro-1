'use client';

import React from 'react';
import { useFetch } from '@/hooks/useFetch';

type User = {
  id: number;
  name: string;
  email: string;
  role: string;
  schoolId: string;
};

const UserList = () => {
  const { data, isLoading, error } = useFetch<User[]>('/api/auth/users');

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl font-semibold">Loading...</p>
      </div>
    );
  if (error)
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl font-semibold text-red-500">Error: {error}</p>
      </div>
    );

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-center mb-6">User List</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {data?.map((user) => (
          <div
            key={user.id}
            className="p-4 border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <h2 className="text-lg font-semibold text-gray-800">{user.name}</h2>
            <p className="text-gray-600">Role: {user.role}</p>
            <p className="text-gray-600">Email: {user.email}</p>
            <p className='text-gray-600'>SchoolId:{user.schoolId}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserList;
