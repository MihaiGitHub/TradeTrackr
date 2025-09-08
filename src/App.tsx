import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/home.component";
import Dashboard from "./pages/dashboard/dashboard.component";
import Quotes from "./pages/quotes/quotes.component";
import Screener from "./pages/screener/screener.component";
import Trading from "./pages/trading/trading.component";
import Reports from "./pages/reports/reports.component";
import Profile from "./pages/profile/profile.component";
import Settings from "./pages/settings/settings.component";

const App: React.FC = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route index element={<Dashboard />} />
          <Route path="quotes" element={<Quotes />} />
          <Route path="screener" element={<Screener />} />
          <Route path="trading" element={<Trading />} />
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
