"use client"

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import Wrapper from "@/layout/Wrapper";
import Home from "@/components/home-3";

// Main Page component
export default function Page() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser =
      typeof window !== "undefined" ? localStorage.getItem("user") : null;
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
    }
  }, []);

  useEffect(() => {
    // Redirect to the appropriate dashboard URL after login
    if (user) {
      const roleId = user.user.authorities[0].roleId;
      const dashboardURL = roleId === 1 ? "/candidates-dashboard/dashboard" : "/employers-dashboard/dashboard";
      router.replace(dashboardURL);
    }
  }, [user, router]);

  // Render loading state or redirect logic
  if (!user) {
    return <Wrapper><Home /></Wrapper>;
  }

  // Dynamically import dashboard components only when user is present
  const DynamicIndex = dynamic(() =>
    import("@/components/dashboard-pages/candidates-dashboard/dashboard")
  );

  const DynamicIndex2 = dynamic(() =>
    import("@/components/dashboard-pages/employers-dashboard/dashboard")
  );

  return (
    <Wrapper>
      {user.user.authorities[0].roleId === 1 && <DynamicIndex />}
      {user.user.authorities[0].roleId === 2 && <DynamicIndex2 />}
    </Wrapper>
  );
}
