'use client';

import React, { useState } from 'react';
// import { useFetch } from '@/hooks/useFetch'; 
import { usePost } from '@/hooks/usePost';  
// import toast, { Toaster } from 'react-hot-toast'; 

type UserResponse = {
  id: string;
  name: string;
  email: string;
};

// type IdResponse = {
//   schoolId: string;
// };

const CreateStudent = () => {
    // Fetch schoolId for the user
//   const { data: fetchedId, isLoading: idLoading, error: idError } = useFetch<IdResponse>('/api/auth/user');
  // POST request for creating a student
  const { data: postResponse, isLoading: postLoading,  } = usePost<UserResponse>();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    country: '',
    pincode: '',
  });

function handleSubmit(){

    console.log("Sbunnit clicked")
}



  return (
    <div className="max-w-md mx-auto mt-8 p-4 bg-white shadow-md rounded">
      {/* <Toaster position="top-right" reverseOrder={false} /> Toast container */}
      <h1 className="text-xl font-semibold text-gray-800 mb-4">Create Student</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Phone</label>
          <input
            type="text"
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Address</label>
          <input
            type="text"
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">City</label>
          <input
            type="text"
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">State</label>
          <input
            type="text"
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            value={formData.state}
            onChange={(e) => setFormData({ ...formData, state: e.target.value })}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Country</label>
          <input
            type="text"
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            value={formData.country}
            onChange={(e) => setFormData({ ...formData, country: e.target.value })}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Pincode</label>
          <input
            type="text"
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            value={formData.pincode}
            onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
            required
          />
        </div>
        <button
          type="submit"
          className="block w-full bg-blue-500 text-white py-2 px-4 rounded mt-4"
        //   disabled={postLoading || !fetchedId?.schoolId}
        >
          {postLoading ? 'Creating...' : 'Create Student'}
        </button>
      </form>
      {postResponse && (
        <p className="text-green-500 mt-4">
          Student created: {postResponse.name} ({postResponse.email})
        </p>
      )}
    </div>
  );
};

export default CreateStudent;
