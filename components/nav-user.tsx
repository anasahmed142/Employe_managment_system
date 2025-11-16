"use client"

import { IconLogout } from "@tabler/icons-react"
import { useRouter } from "next/navigation"

import { getLocation } from "@/lib/geolocation"
import { logoutApi } from "@/services/authService"
import { persistor, useAppDispatch, useAppSelector } from "@/store"
import { logout } from "@/store/AuthSlice"

import { toast } from "sonner"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { openCamera } from "@/lib/camera"

const NavUser = () => {
  const user = useAppSelector((state) => state.auth.user)
  const dispatch = useAppDispatch()
  const router = useRouter()

  const handleLogout = async () => {
    const toastId = toast.loading("Logging you out...")
    try {
      const currentLocation = await getLocation()
      const photo = await openCamera();
      const locationPayload = {
        latitude: currentLocation.latitude,
        longitude: currentLocation.longitude,
        accuracy: currentLocation.accuracy,
        altitude: currentLocation.altitude ?? null,
        altitudeAccuracy: currentLocation.altitudeAccuracy ?? null,
        heading: currentLocation.heading ?? null,
        speed: currentLocation.speed ?? null,
      }

      await logoutApi({
        email: user?.email || "",
        location: locationPayload,
        photo,
      })

      dispatch(logout())
      persistor.purge()
      toast.success("Logged out successfully", { id: toastId })
      router.replace("/auth/login")
    } catch (error) {
      console.error("Logout failed", error)
      toast.error("Logout failed, please try again", { id: toastId })
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          className="relative h-8 w-8 rounded-full"
        >
          <Avatar className="h-8 w-8">
            <AvatarImage src={user?.avatar || undefined} alt={user?.name || "User"} />
            <AvatarFallback>
              {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuItem onClick={handleLogout}>
          <IconLogout className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default NavUser
