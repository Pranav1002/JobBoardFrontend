'use client'

import Wrapper from "@/layout/Wrapper";
import Home from "@/components/home-3";
import Index from "@/components/dashboard-pages/candidates-dashboard/dashboard";
import Index2 from "@/components/dashboard-pages/employers-dashboard/dashboard";
import { useEffect, useState } from "react";

export default function Page() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = typeof window !== 'undefined' ? localStorage.getItem('user') : null;
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
    }
  }, []);

  // Render the appropriate content based on whether a user is present in local storage
  if (user && user.user.authorities[0].roleId === 1) {
    return (
      <Wrapper>
        <Index />
      </Wrapper>
    );
  }
  else if (user && user.user.authorities[0].roleId === 2) {
    return (
      <Wrapper>
        <Index2/>
      </Wrapper>
      
    );
  }
  else {
    return (
      <Wrapper>
        <Home />
      </Wrapper>
    );
  }
}
