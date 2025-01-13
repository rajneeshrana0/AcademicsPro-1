"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";

export default function RegisterAdminPage() {
  const { data: session } = useSession();
  const [school, setSchool] = useState([]);
  const [email, setEmail] = useState("");
  const [selectedSchoolId, setSelectedSchoolId] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("/api/superadmin/registerschool")
      .then((res) => res.json())
      .then((data) => {
        setSchool(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching schools:", error);
        setIsLoading(false);
      });
  }, []);

  const handleSchoolChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSchoolId(event.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          role: "admin",
          schoolId: selectedSchoolId,
          createdBy: session?.user?.email,
        }),
      });

      const text = await res.text();
      if (res.ok) {
        const data = text ? JSON.parse(text) : {};
        console.log(data);
        alert("Admin registered successfully!");
        setEmail("");
        setSelectedSchoolId("");
      } else {
        const errorData = text ? JSON.parse(text) : { message: "Unknown error occurred" };
        alert(errorData.message || "Something went wrong!");
      }
    } catch (error) {
      console.error("An error occurred:", error);
      alert("Failed to register admin, please try again later.");
    }
  };

  if (isLoading) {
    return <div>Loading schools...</div>;
  }

  return (
    <>
      <h1 className="text-2xl font-bold mb-12">Admin Register</h1>
      <div>
        <label htmlFor="schoolSelect" className="block mb-2">
          Select a School:
        </label>
        <select
          id="schoolSelect"
          name="school"
          className="border-2 border-gray-300 p-2 rounded-lg w-full text-black"
          value={selectedSchoolId}
          onChange={handleSchoolChange}
        >
          <option value="">Select a school</option>
          {school.map((school: { id: string; name: string }) => (
            <option key={school.id} value={school.id}>
              {school.name}
            </option>
          ))}
        </select>
      </div>
      <form className="flex flex-col items-center gap-y-8" onSubmit={handleSubmit}>
        <input
          className="mt-12 text-black"
          type="email"
          placeholder="Admin Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Register Admin</button>
      </form>
    </>
  );
}