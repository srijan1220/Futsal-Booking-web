import { Outlet, useLocation } from "react-router-dom";
import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

function Layout() {
  const location = useLocation();
  const getPageTitle = () => {
    const pathParts = location.pathname.split("/").filter(Boolean);

    if (pathParts.length === 0) {
      return "Landing Page"; // If the user is on "/"
    }

    if (pathParts[0] === "admin") {
      if (pathParts.length === 1) {
        return "Dashbaord"; // "/admin"
      }
      const page = pathParts[1];
      switch (page) {
        case "futsal":
          return "Futsal";
        case "notification":
          return "Notification";
        case "booking":
          return "Bookings";
        default:
          return page.charAt(0).toUpperCase() + page.slice(1);
      }
    }

    // For login, register, forgetpassword, etc.
    const page = pathParts[0];
    return page.charAt(0).toUpperCase() + page.slice(1);
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">{getPageTitle()}</BreadcrumbLink>
              </BreadcrumbItem>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col pt-0">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

export default Layout;
