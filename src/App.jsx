import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./routes/home/home.component";
import Dashboard from "./routes/dashboard/dashboard.component";
import Quotes from "./routes/quotes/quotes.component";
import Trading from "./routes/trading/trading.component";
import Reports from "./routes/reports/reports.component";
import Profile from "./routes/profile/profile.component";
import Settings from "./routes/settings/settings.component";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route index element={<Dashboard />} />
          <Route path="quotes" element={<Quotes />} />
          <Route path="trading" element={<Trading />} />
          <Route path="reports" element={<Reports />} />
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<Settings />} />
        </Route>
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </div>
  );
}

export default App;
