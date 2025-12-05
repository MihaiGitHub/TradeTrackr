import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Dashboard from "./pages/dashboard";
import Quotes from "./pages/quotes";
import Screener from "./pages/screener";
import PaperTrading from "./pages/paper-trading";
import TradingBot from "./pages/trading-bot";
import Reports from "./pages/reports";
import Profile from "./pages/profile";
import Settings from "./pages/settings";

// src/
// ├── app/
// │   └── store.ts
// ├── features/
// │   └── users/
// │       ├── UsersList.tsx
// │       ├── usersSlice.ts
// │       └── types.ts
// ├── components/
// │   ├── charts/
// │   │   ├── StockAreaChart/
// │   │   │   ├── index.tsx
// │   │   │   ├── Tooltip.tsx
// │   │   │   ├── types.ts
// │   │   │   └── StockAreaChart.module.css
// │   │   ├── PieChart/
// │   │   │   ├── index.tsx
// │   │   │   ├── types.ts
// │   │   │   └── PieChart.module.css
// │   │   ├── BarChart/
// │   │   │   ├── index.tsx
// │   │   │   ├── types.ts
// │   │   │   └── BarChart.module.css
// │   │   └── common/              // shared chart code
// │   │       ├── ChartTooltip.tsx
// │   │       ├── ChartLegend.tsx
// │   │       └── chartColors.ts
// │   └── otherComponents/
// │       ├── Navbar/
// │       └── Sidebar/
// ├── pages/
// │   └── Dashboard/
// │       ├── index.tsx
// │       └── Dashboard.module.css
// ├── App.tsx
// └── index.tsx

const App: React.FC = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route index element={<Dashboard />} />
          <Route path="quotes" element={<Quotes />} />
          <Route path="screener" element={<Screener />} />
          <Route path="paper-trading" element={<PaperTrading />} />
          <Route path="trading-bot" element={<TradingBot />} />
          <Route path="reports" element={<Reports />} />
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<Settings />} />
        </Route>
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </div>
  );
};

export default App;
