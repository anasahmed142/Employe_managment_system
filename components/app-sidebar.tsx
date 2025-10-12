"use client"

import * as React from "react"
import {
  IconCamera,
  IconDashboard,
  IconDatabase,
  IconFileAi,
  IconFileDescription,
  IconHelp,
  IconInnerShadowTop,
  IconReport,
  IconSearch,
  IconSettings,
  IconUsers,
  IconList
} from "@tabler/icons-react"
import { NavDocuments } from "@/components/nav-documents"
import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
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
      url: "/dashboard/employe_dashboard/",
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
      url: "/dashboard/employe_dashboard/",
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
   
  ],

  navClouds: [
    {
      title: "Capture",
      icon: IconCamera,
      isActive: true,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Proposal",
      icon: IconFileDescription,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Prompts",
      icon: IconFileAi,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "#",
      icon: IconSettings,
    },
    {
      title: "Get Help",
      url: "#",
      icon: IconHelp,
    },
    {
      title: "Search",
      url: "#",
      icon: IconSearch,
    },
  ],
  documents: [
    {
      name: "Data Library",
      url: "#",
      icon: IconDatabase,
    },
    {
      name: "Reports",
      url: "#",
      icon: IconReport,
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
                <IconInnerShadowTop className="!size-5" />
                <span className="text-base font-semibold">Employe..</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={user?.role === "admin" ? data.navMainadmin : data.navMainEmploye   } />
        <NavDocuments items={data.documents} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user || undefined} />
      </SidebarFooter>
    </Sidebar>
  )
}
