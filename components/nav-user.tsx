
"use client"

import {
  IconCreditCard,
  IconDotsVertical,
  IconLogout,
  IconNotification,
  IconUserCircle,
} from "@tabler/icons-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { logoutApi } from "@/services/authService"
import { persistor, useAppDispatch, useAppSelector } from "@/store"
import { logout } from "@/store/AuthSlice"
import { toast } from "sonner"
import { useRouter } from "next/navigation";
import { useRef, useState } from "react"
import Webcam from "react-webcam"

export function NavUser({
  user,
}: {
  user?: {
    name: string
    email: string
    avatar?: string
  }|null
}) {
  const { isMobile } = useSidebar()
  const dispatch = useAppDispatch();
  const router = useRouter();
  const webcamRef = useRef<Webcam>(null);
  const [screenshot, setScreenshot] = useState<string | null>(null);
  
  const getUser  = useAppSelector((state) => state.auth);
  
  const handleLogout = async () => {
    try {
      const email = getUser.user?.email ;
      if (!email) {
        toast.error("No user email found for logout");
        return;
      }
      
      const imageSrc = webcamRef.current?.getScreenshot();
      if (!imageSrc) {
        toast.error("Could not capture screenshot");
        return;
      }
      setScreenshot(imageSrc);
      
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        
        const res = await logoutApi({ email, photo: imageSrc, location: { latitude, longitude } }); 
        dispatch(logout()); 
        await persistor.purge();
        toast.success(res.data.message || "Logged out successfully");
        router.replace("/auth/login"); 
      });

    } catch (err) {
      console.error("Logout error:", err);
      toast.error("Logout failed, please try again");
    }
  };


  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg grayscale">
                <AvatarImage src={user?.avatar} alt={user?.name} />
                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{user?.name}</span>
                <span className="text-muted-foreground truncate text-xs">
                  {user?.email}
                </span>
              </div>
              <IconDotsVertical className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={user?.avatar} alt={user?.name} />
                  <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{user?.name}</span>
                  <span className="text-muted-foreground truncate text-xs">
                    {user?.email}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <IconUserCircle />
                Account
              </DropdownMenuItem>
              <DropdownMenuItem>
                <IconCreditCard />
                Billing
              </DropdownMenuItem>
              <DropdownMenuItem>
                <IconNotification />
                Notifications
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem  onClick={handleLogout} >
              <IconLogout  />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        style={{ display: "none" }}
      />
    </SidebarMenu>
  )
}
