"use client";
import { useAppSelector } from "@/store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user } = useAppSelector((state) => state.auth);
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    if (user === undefined || user === null) {
      // agar login nahi hai
      router.replace("/auth/login");
    } else {
      setChecking(false); // user available hai
    }
  }, [user, router]);

  if (checking) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }

  return <>{children}</>;
}
