"use client";
import { useSession } from "next-auth/react"; 
import Image from 'next/image'; 
import { useFetch } from "@/hooks/useFetch";


interface UserProfile {
  email: string;
  phone: string;
  profilePic: string;
  address: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
  role: string;
  schoolId: string;
  createdAt: string;
  updatedAt: string;
  name: string;
 
}

export default function Page() {
  const { data: session } = useSession(); 
  const userId = session?.user?.id; 

 
  const { data, error, isLoading } = useFetch<UserProfile>(
    userId ? `/api/superadmin/users/${userId}` : ''
  );

  if (!userId) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg font-semibold text-gray-700">
          User ID not found. Please log in.
        </p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg font-semibold text-gray-700 animate-pulse">
          Loading...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg font-semibold text-red-500">
          Error: {error}
        </p>
      </div>
    );
  }

 
  const profileFields = [
    { label: "Email", value: data?.email },
    { label: "Phone", value: data?.phone },
    { label: "Address", value: `${data?.address || ""}, ${data?.city || ""}, ${data?.state || ""}, ${data?.country || ""}`.replace(/^, |, $/g, "") },
    { label: "Pincode", value: data?.pincode },
    { label: "Role", value: data?.role },
    { label: "School ID", value: data?.schoolId },
    { label: "Created At", value: data?.createdAt ? new Date(data.createdAt).toLocaleString() : null },
    { label: "Updated At", value: data?.updatedAt ? new Date(data.updatedAt).toLocaleString() : null },
  ].filter((field) => field.value); 

  return (
    <div className="flex items-center justify-center bg-background/20 shadow-sm shadow-foreground ">
      <div className="w-full max-w-lg p-6 ">
        <div className="flex flex-col items-center">
            {data?.profilePic && (
              <Image
                src={data.profilePic}
                alt={`${data?.name || "User"}'s profile picture`}
                width={128}
                height={128}
                className="rounded-full border-2 border-blue-500 shadow-md h-24 w-24"
              />
            )}
          
          <h1 className="mt-4 text-2xl font-bold text-gray-800">
            {data?.name || "Anonymous User"}
          </h1>
          {data?.role && <p className="text-sm text-gray-500">{data.role}</p>}
        </div>

        <div className="mt-6 space-y-4">
          {profileFields.map((field, index) => (
            <div
              key={index}
              className="flex items-center justify-between border-b pb-2"
            >
              <span className="font-bold text-foreground">{field.label}:</span>
              <span className="text-foreground">{field.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
