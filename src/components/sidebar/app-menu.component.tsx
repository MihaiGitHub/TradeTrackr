interface MenuItem {
  path: string;
  icon: string;
  title: string;
}

const Menu: MenuItem[] = [
  { path: "/", icon: "fa fa-sitemap", title: "Dashboard" },
  { path: "/quotes", icon: "fa fa-magnifying-glass", title: "View Quotes" },
  {
    path: "/screener",
    icon: "fa fa-filter",
    title: "Stock Screener",
  },
  { path: "/trading", icon: "fa fa-arrow-trend-up", title: "Paper Trading" },
  { path: "/reports", icon: "fa fa-chart-pie", title: "Reports" },
];

export default Menu;
