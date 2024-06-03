'use client'
import { auth } from "@/infrastructure/firebase";
import { signOut } from "@firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const LogoutPage = () => {
  const router = useRouter();

  useEffect(() => {
    signOut(auth)
      .then(() => router.push('/login'));
  }, []);

  return (
    <div>Logging out</div>
  );
};

export default LogoutPage;
