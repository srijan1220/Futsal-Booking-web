import * as React from "react";
import {
  IconDashboard,
  IconInnerShadowTop,
  IconListDetails,
  IconMagnet,
  IconNotification,
} from "@tabler/icons-react";
import { Link, useLocation } from "react-router-dom";

import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/",
      icon: IconDashboard,
    },
    {
      title: "Fustal",
      url: "/fustal",
      icon: IconMagnet,
    },
    {
      title: "Notification",
      url: "/notification",
      icon: IconNotification,
    },
    {
      title: "Bookings",
      url: "/booking",
      icon: IconListDetails,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const location = useLocation();

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <Link to="/">
                <IconInnerShadowTop className="!size-5" />
                <span className="text-base font-semibold">
                  Futsal Booking App
                </span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarMenu>
          {data.navMain.map((item) => {
            const isActive = location.pathname === item.url;
            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <Link
                    to={item.url}
                    className={`flex items-center gap-2 px-3 py-2 rounded-md ${
                      isActive ? "bg-gray-200 font-semibold" : ""
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
