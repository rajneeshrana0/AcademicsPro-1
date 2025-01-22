'use client';

import { useFetch } from '@/hooks/useFetch';
import { useEffect, useState } from 'react';

const CreateStudent = () => {
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

  const [schoolId, setSchoolId] = useState<string | null>(null); // State to store the school ID
  const [loading, setLoading] = useState(false); // Loading state for API request
  const [error, setError] = useState<string | null>(null); // Error state for API request

  // Fetch school ID from the session
  interface SessionData {
    user: {
      schoolId: string;
    };
  }

  const { data: sessionData, error: sessionError } = useFetch<SessionData>('/api/auth/session');

  useEffect(() => {
    if (sessionData) {
      console.log('Session Data Fetched:', sessionData); // Log session data
      if (sessionData.user.schoolId) {
        setSchoolId(sessionData.user.schoolId);
        console.log('School ID set:', sessionData.user.schoolId); // Log school ID
      } else {
        console.warn('No school ID found in session data'); // Warning if school ID is missing
      }
    }
    if (sessionError) {
      console.error('Error fetching session:', sessionError); // Log session fetch error
    }
  }, [sessionData, sessionError]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    console.log(`Updated ${name}:`, value); // Log form input changes
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!schoolId) {
      console.error('Unable to determine school ID. Please ensure you are logged in.');
      alert('Unable to determine school ID. Please ensure you are logged in.');
      return;
    }

    const payload = {
      ...formData,
      schoolId,
    };

    console.log('Submitting payload:', payload); // Log payload being sent to the API

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/auth/studentregister', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      setLoading(false);

      if (response.ok && data.success) {
        alert('Student Created Successfully');
        setFormData({
          name: '',
          email: '',
          phone: '',
          address: '',
          city: '',
          state: '',
          country: '',
          pincode: '',
        });
      } else {
        alert(data?.message || 'An error occurred while creating the student.');
        console.warn('API Error:', data?.message);
      }
    } catch (error) {
      setLoading(false);
      console.error('Error creating student:', error);
      setError('Failed to create the student. Please try again.');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-4 bg-white shadow-md rounded">
      <h1 className="text-xl font-semibold text-gray-800 mb-4">Create Student</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Phone</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">City</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">State</label>
          <input
            type="text"
            name="state"
            value={formData.state}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Country</label>
          <input
            type="text"
            name="country"
            value={formData.country}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Pincode</label>
          <input
            type="text"
            name="pincode"
            value={formData.pincode}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>
        <button
          type="submit"
          className="block w-full bg-blue-500 text-white py-2 px-4 rounded mt-4"
          disabled={loading || !schoolId}
        >
          {loading ? 'Creating...' : 'Create Student'}
        </button>
      </form>
      {!schoolId && <p className="text-red-500 mt-2">Fetching school ID...</p>}
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {/* {sessionError && <p className="text-red-500 mt-2">Error fetching session: {sessionError.message}</p>} */}
    </div>
  );
};

export default CreateStudent;
