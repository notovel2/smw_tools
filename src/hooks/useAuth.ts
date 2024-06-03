'use client'
import { auth } from "@/infrastructure/firebase";
import { useRouter } from "next/navigation";

const useAuth = () => {
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
