import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./admin/Layout";
import { HomePage } from "./admin/page/HomePage";
import AddNotification from "./admin/page/AddNotification";

import AdminBookings from "./admin/page/AdminBookings";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="notification" element={<AddNotification />} />
          <Route path="booking" element={<AdminBookings />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
