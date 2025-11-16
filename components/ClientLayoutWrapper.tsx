"use client";

import { useAppSelector } from "@/store";
import LocationTracker from "./utility/LocationTracker";

const ClientLayoutWrapper = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAppSelector((state) => state.auth);

  return (
    <>
      {user && <LocationTracker />}
      {children}
    </>
  );
};

export default ClientLayoutWrapper;
