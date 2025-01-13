// pages/superadmin/page.tsx
"use client";
import { useSession } from 'next-auth/react';

export default function SuperadminPage() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (session) {
    return (
      <div>
        <h1>Welcome USER, {session.user.email}!</h1>
        {/* ... other content that requires session data ... */}
      </div>
    );
  }

  return <div>You are not authorized to access this page.</div>;
}