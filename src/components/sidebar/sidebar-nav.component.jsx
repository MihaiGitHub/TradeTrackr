import React, { useEffect, useContext } from "react";
import {
  useResolvedPath,
  useMatch,
  NavLink,
  useLocation,
  matchPath,
} from "react-router-dom";
import menus from "./app-menu.component";
import { slideUp } from "./slide-up.component";
import { slideToggle } from "./slide-toggle.component";

function NavItem({ menu, ...props }) {
  let location = useLocation();
  let match = matchPath(
    { path: menu.path, end: menu.path === "/" || !menu.children },
    location.pathname
  );

  let icon = menu.icon && (
    <div className="menu-icon">
      <i className={menu.icon}></i>
    </div>
  );
  let img = menu.img && (
    <div className="menu-icon-img">
      <img src={menu.img} alt="" />
    </div>
  );
  let caret = menu.children && !menu.badge && (
    <div className="menu-caret"></div>
  );
  let label = menu.label && (
    <span className="menu-label ms-5px">{menu.label}</span>
  );
  let badge = menu.badge && <div className="menu-badge">{menu.badge}</div>;
  let highlight = menu.highlight && (
    <i className="fa fa-paper-plane text-theme"></i>
  );
  let title = menu.title && (
    <div className="menu-text">
      {menu.title} {label} {highlight}
    </div>
  );

  useEffect(() => {
    const handleClick = function (e) {
      e.preventDefault();
      const target = this.nextElementSibling;

      // Only close siblings at the same level
      const parentMenu = this.closest(".menu-submenu") || this.closest(".menu");
      const siblingMenus = parentMenu ? Array.from(parentMenu.children) : [];

      siblingMenus.forEach((menu) => {
        const otherTarget = menu.querySelector(".menu-submenu");
        if (otherTarget && otherTarget !== target) {
          slideUp(otherTarget, expandTime);

          const otherTargetMenuItem = otherTarget.closest(".menu-item");
          if (otherTargetMenuItem && otherTargetMenuItem.classList) {
            otherTargetMenuItem.classList.remove("expand");
            otherTargetMenuItem.classList.add("closed");
          }
        }
      });

      const targetItemElm = target?.closest(".menu-item");
      if (targetItemElm && targetItemElm.classList) {
        if (
          targetItemElm.classList.contains("expand") ||
          (targetItemElm.classList.contains("active") && !target.style.display)
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
    };

    const handleSidebarMenuToggle = (menus, expandTime) => {
      menus.forEach((menu) => {
        menu.removeEventListener("click", handleClick); // Ensure old listeners are removed
        menu.addEventListener("click", handleClick);
      });
    };

    // Get sidebar expand time
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

    // Select menu items
    const menus = Array.from(
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
      [...menus, ...submenusLvl1, ...submenusLvl2],
      expandTime
    );

    return () => {
      [...menus, ...submenusLvl1, ...submenusLvl2].forEach((menu) => {
        menu.removeEventListener("click", handleClick);
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
}

function SidebarNav() {
  return (
    <div className="menu">
      <div className="menu-header">Navigation</div>
      {menus.map((menu, i) => (
        <NavItem key={i} menu={menu} />
      ))}
    </div>
  );
}

export default SidebarNav;
