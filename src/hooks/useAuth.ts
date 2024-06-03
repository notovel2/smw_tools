'use client'
import React from "react";
import { auth } from "@/infrastructure/firebase";
import { User } from "@/types/User";
import { useRouter } from "next/navigation";

const useAuth = () => {
  const [user, setUser] = React.useState<User>();
  const router = useRouter();

  auth.onAuthStateChanged((user) => {
    if (!user) {
      router.push('/login');
    }
  })

  return {
  };
};

export default useAuth;
