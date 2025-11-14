"use client"

import * as React from "react"
import {
  IconDashboard,
  IconUsers,
  IconList,
  IconUserPlus,
  IconMapPin
} from "@tabler/icons-react"
import { NavMain } from "@/components/nav-main"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { useAppSelector } from "@/store"

const data = {
  user: {
    name: "dev",
    email: "m@example.com",
    avatar: "IconUsers",
  } ,
  navMainEmploye: [
    {
      title: "Dashboard",
      url: "/dashboard/employe_dashboard",
      icon: IconDashboard,
    },
     {
      title: "Profile",
      url: "/dashboard/employe_dashboard/profilePage",
      icon: IconUsers,
    },
   
  ],
  navMainadmin: [
    {
      title: "Dashboard",
      url: "/dashboard/employe_dashboard",
      icon: IconDashboard,
    },
     {
      title: "Profile",
      url: "/dashboard/employe_dashboard/profilePage",
      icon: IconUsers,
    },
     {
      title: "All User",
      url: "/dashboard/employe_dashboard/allUsers",
      icon: IconList,
    },
     {
      title: "Add Employee",
      url: "/dashboard/employe_dashboard/add-employee",
      icon: IconUserPlus,
    },
    {
      title: "Location History",
      url: "/dashboard/employe_dashboard/location-history",
      icon: IconMapPin,
    },
   
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const user = useAppSelector((state) => state.auth.user);
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#">
                <span className="text-base font-semibold">{user?.role === "admin" ? "Admin" : "Employee"}</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={user?.role === "admin" ? data.navMainadmin : data.navMainEmploye   } />
      </SidebarContent>
    </Sidebar>
  )
}
