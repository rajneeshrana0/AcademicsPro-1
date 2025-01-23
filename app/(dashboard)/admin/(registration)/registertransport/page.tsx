"use client"
import { useRef,  useEffect } from "react";
import { useSession } from "next-auth/react";  
import { useFormData } from "@/hooks/useFormData";  

export default function Transport() {
  const { data: session } = useSession();  
  const schoolId = session?.user?.schoolId; 

  const nameRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const phoneRef = useRef<HTMLInputElement | null>(null);
  const addressRef = useRef<HTMLInputElement | null>(null);
  const cityRef = useRef<HTMLInputElement | null>(null);
  const stateRef = useRef<HTMLInputElement | null>(null);
  const countryRef = useRef<HTMLInputElement | null>(null);
  const pincodeRef = useRef<HTMLInputElement | null>(null);
  const profilePicRef = useRef<HTMLInputElement | null>(null);

  const { isSubmitting, error, success, submitForm } = useFormData();  

  useEffect(() => {
    if (!schoolId) {
      setError("School ID is missing. Please ensure you are logged in.");
    }
  }, [schoolId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!schoolId) {
      setError("School ID is required.");
      return;
    }

    const formData = new FormData();
    formData.append("name", nameRef.current?.value || "");
    formData.append("email", emailRef.current?.value || "");
    formData.append("phone", phoneRef.current?.value || "");
    formData.append("address", addressRef.current?.value || "");
    formData.append("city", cityRef.current?.value || "");
    formData.append("state", stateRef.current?.value || "");
    formData.append("country", countryRef.current?.value || "");
    formData.append("pincode", pincodeRef.current?.value || "");
    formData.append("schoolId", schoolId); 
    if (profilePicRef.current?.files) formData.append("profilePic", profilePicRef.current.files[0]);

    // Use the  hook to submit the form
    submitForm({
      url: "/api/auth/transportregister",
      formData,
    });
  };

  return (
    <div className="max-w-lg mx-auto p-8 bg-white shadow-lg rounded-lg mt-10">
      <h2 className="text-3xl font-semibold text-center text-gray-700 mb-6">Register Transport</h2>

      {error && <div className="text-red-500 text-center mb-4">{error}</div>}
      {success && <div className="text-green-500 text-center mb-4">{success}</div>}

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="space-y-4">
          {["Name", "Email", "Phone", "Address", "City", "State", "Country", "Pincode"].map((label) => (
            <div key={label}>
              <label className="block text-gray-600">{label}</label>
              <input
                type="text"
                ref={label === "Name" ? nameRef : label === "Email" ? emailRef : label === "Phone" ? phoneRef : label === "Address" ? addressRef : label === "City" ? cityRef : label === "State" ? stateRef : label === "Country" ? countryRef : pincodeRef}
                className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg"
                required
              />
            </div>
          ))}

          <div>
            <label className="block text-gray-600">Profile Picture</label>
            <input
              type="file"
              ref={profilePicRef}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              required
            />
          </div>

          <div className="flex justify-center mt-6">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-1/2 py-3 px-6 text-white font-semibold rounded-lg ${isSubmitting ? "bg-gray-500" : "bg-blue-500 hover:bg-blue-600"}`}
            >
              {isSubmitting ? "Submitting..." : "Register Transport"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}


function setError(error: string): void {
    throw new Error(error);
}

