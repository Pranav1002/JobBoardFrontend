"use client";

import {

  Sidebar,
  Menu,
  MenuItem,
  SubMenu,
} from "react-pro-sidebar";

import mobileMenuData from "../../../data/mobileMenuData";
import SidebarFooter from "./SidebarFooter";
import SidebarHeader from "./SidebarHeader";
import {
  isActiveLink,
  isActiveParentChaild,
} from "../../../utils/linkActiveChecker";
import { usePathname, useRouter } from "next/navigation";


const Index = () => {
  const router = useRouter();

  return (
    <div
      className="offcanvas offcanvas-start mobile_menu-contnet"
      tabIndex="-1"
      id="offcanvasMenu"
      data-bs-scroll="true"
    >
      <SidebarHeader />

      <Sidebar>
        <Menu>
          {mobileMenuData.map((item) => (
            <MenuItem
              className={isActiveLink(item.routePath, router.pathname) ? "menu-active-link" : ""}
              key={item.id}
              onClick={() => router.push(item.routePath)}
            >
              {item.name}
            </MenuItem>
          ))}
        </Menu>
      </Sidebar>

      {/* <SidebarFooter /> */}
    </div>
  );
};

export default Index;