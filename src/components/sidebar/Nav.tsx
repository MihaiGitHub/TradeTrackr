import React, { useEffect } from "react";
import { NavLink, useLocation, matchPath } from "react-router-dom";
import menus from "./Menu";
import { slideUp } from "./SlideUp";
import { slideToggle } from "./SlideToggle";

interface MenuItem {
  path: string;
  icon?: string;
  img?: string;
  title?: string;
  label?: string;
  badge?: string | React.ReactNode;
  highlight?: boolean;
  children?: MenuItem[];
}

interface NavItemProps {
  menu: MenuItem;
  [key: string]: any; // for extra props like `className` etc.
}

const NavItem: React.FC<NavItemProps> = ({ menu, ...props }) => {
  const location = useLocation();
  const match = matchPath(
    { path: menu.path, end: menu.path === "/" || !menu.children },
    location.pathname
  );

  const icon = menu.icon && (
    <div className="menu-icon">
      <i className={menu.icon}></i>
    </div>
  );
  const img = menu.img && (
    <div className="menu-icon-img">
      <img src={menu.img} alt="" />
    </div>
  );
  const caret = menu.children && !menu.badge && (
    <div className="menu-caret"></div>
  );
  const label = menu.label && (
    <span className="menu-label ms-5px">{menu.label}</span>
  );
  const badge = menu.badge && <div className="menu-badge">{menu.badge}</div>;
  const highlight = menu.highlight && (
    <i className="fa fa-paper-plane text-theme"></i>
  );
  const title = menu.title && (
    <div className="menu-text">
      {menu.title} {label} {highlight}
    </div>
  );

  useEffect(() => {
    const handleClick = function (this: HTMLElement, e: Event) {
      e.preventDefault();
      const target = this.nextElementSibling as HTMLElement | null;

      const parentMenu = this.closest(".menu-submenu") || this.closest(".menu");
      const siblingMenus = parentMenu ? Array.from(parentMenu.children) : [];

      siblingMenus.forEach((menu) => {
        const otherTarget = menu.querySelector(
          ".menu-submenu"
        ) as HTMLElement | null;
        if (otherTarget && otherTarget !== target) {
          slideUp(otherTarget, expandTime);

          const otherTargetMenuItem = otherTarget.closest(".menu-item");
          if (otherTargetMenuItem && otherTargetMenuItem.classList) {
            otherTargetMenuItem.classList.remove("expand");
            otherTargetMenuItem.classList.add("closed");
          }
        }
      });

      if (target) {
        const targetItemElm = target.closest(".menu-item");
        if (targetItemElm && targetItemElm.classList) {
          if (
            targetItemElm.classList.contains("expand") ||
            (targetItemElm.classList.contains("active") &&
              !target.style.display)
          ) {
            targetItemElm.classList.remove("expand");
            targetItemElm.classList.add("closed");
            slideToggle(target, expandTime);
          } else {
            targetItemElm.classList.add("expand");
            targetItemElm.classList.remove("closed");
            slideToggle(target, expandTime);
          }
        }
      }
    };

    const handleSidebarMenuToggle = (menus: Element[], expandTime: number) => {
      menus.forEach((menu) => {
        menu.removeEventListener("click", handleClick as EventListener);
        menu.addEventListener("click", handleClick as EventListener);
      });
    };

    const targetSidebar = document.querySelector(
      ".app-sidebar:not(.app-sidebar-end)"
    );
    const expandTime = targetSidebar?.getAttribute(
      "data-disable-slide-animation"
    )
      ? 0
      : 300;

    const menuBaseSelector = ".app-sidebar .menu > .menu-item.has-sub";
    const submenuBaseSelector = " > .menu-submenu > .menu-item.has-sub";

    const menusLvl0 = Array.from(
      document.querySelectorAll(menuBaseSelector + " > .menu-link")
    );
    const submenusLvl1 = Array.from(
      document.querySelectorAll(
        menuBaseSelector + submenuBaseSelector + " > .menu-link"
      )
    );
    const submenusLvl2 = Array.from(
      document.querySelectorAll(
        menuBaseSelector +
          submenuBaseSelector +
          submenuBaseSelector +
          " > .menu-link"
      )
    );

    handleSidebarMenuToggle(
      [...menusLvl0, ...submenusLvl1, ...submenusLvl2],
      expandTime
    );

    return () => {
      [...menusLvl0, ...submenusLvl1, ...submenusLvl2].forEach((menu) => {
        menu.removeEventListener("click", handleClick as EventListener);
      });
    };
  }, []);

  return (
    <div
      className={
        "menu-item" +
        (match ? " active" : "") +
        (menu.children ? " has-sub" : "")
      }
    >
      {!menu.children && (
        <NavLink className="menu-link" to={menu.path} {...props}>
          {img} {icon} {title}
          {caret} {badge}
        </NavLink>
      )}
    </div>
  );
};

const SidebarNav: React.FC = () => {
  return (
    <div className="menu">
      <div className="menu-header">Navigation</div>
      {menus.map((menu, i) => (
        <NavItem key={i} menu={menu} />
      ))}
    </div>
  );
};

export default SidebarNav;
