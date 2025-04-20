import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./admin/Layout";
import { HomePage } from "./admin/page/HomePage";
import AddNotification from "./admin/page/AddNotification";
import { EditNotification } from "./admin/page/EditNotification";
import AdminBookings from "./admin/page/AdminBookings";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="add-notification" element={<AddNotification />} />
          <Route path="edit-notification" element={<EditNotification />} />
          <Route path="bookings" element={<AdminBookings />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
