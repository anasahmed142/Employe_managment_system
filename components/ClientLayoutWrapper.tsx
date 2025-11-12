"use client";

import { Toaster } from "@/components/ui/sonner";
import LocationTracker from "@/components/utility/LocationTracker";
import ReduxProvider from "@/providers/ReduxProvider";

export default function ClientLayoutWrapper({ children }: { children: React.ReactNode }) {
  return (
    <ReduxProvider>
      <LocationTracker />
      {children}
      <Toaster position="top-right" closeButton duration={1000} />
    </ReduxProvider>
  );
}
