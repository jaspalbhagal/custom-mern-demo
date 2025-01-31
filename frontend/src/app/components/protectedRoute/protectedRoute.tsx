import React, { FC, ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/context/AuthContext";

const ProtectedRoute: FC<{ children: ReactNode }> = ({ children }) => {
  const { token } = useAuth();
  const router = useRouter();
  
  useEffect(() => {
    if (!token) {
      router.push("/login");
    }
  }, [token, router]);

  return <>{children}</>;
};

export default ProtectedRoute;
