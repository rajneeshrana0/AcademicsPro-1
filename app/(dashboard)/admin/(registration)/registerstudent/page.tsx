'use client';





const CreateStudent = () => {




  function handleSubmit() {

    alert('Student Created Successfully');
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


            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"


            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Phone</label>
          <input
            type="text"
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"


            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Address</label>
          <input
            type="text"
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"


            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">City</label>
          <input
            type="text"
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"


            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">State</label>
          <input
            type="text"
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"


            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Country</label>
          <input
            type="text"
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"


            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Pincode</label>
          <input
            type="text"
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"


            required
          />
        </div>
        <button
          type="submit"
          className="block w-full bg-blue-500 text-white py-2 px-4 rounded mt-4"

        >
          Create Student

        </button>
      </form>



    </div>
  );
};

export default CreateStudent;
