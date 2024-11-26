'use client';

import { useSession } from "next-auth/react";

const WithAuth = (WrappedComponent) => {
  const AuthComponent = (props) => {
    const [session, loading] = useSession();

    if (loading) {
      return <div>Loading...</div>;
    }

    if (!session) {
      throw new Error('User is not authenticated');
    }

    return <WrappedComponent {...props} />;
  };

  return AuthComponent;
};

export default WithAuth;
