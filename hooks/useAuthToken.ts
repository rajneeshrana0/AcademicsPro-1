// hooks/useAuthToken.js
import { useSession } from "next-auth/react";

export const useAuthToken = () => {
  const { data: session } = useSession();
  return session?.user?.id; 
};