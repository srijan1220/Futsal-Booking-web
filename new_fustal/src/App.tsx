import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./admin/Layout";
import { HomePage } from "./admin/page/HomePage";
import AddNotification from "./admin/page/AddNotification";
import AdminBookings from "./admin/page/AdminBookings";
import EditNotification from "./admin/page/EditNotification";
import AdminEditFutsal from "./admin/page/AdminEditFutsal";
import AdminDashboard from "./admin/page/AdminDashboard";
import Login from "./app/Login";
import Signup from "./app/Signup";
import ForgetPassword from "./app/ForgetPassword";
import Landing from "./app/LandingPage";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/forgetpassword" element={<ForgetPassword />} />

        {/* Admin Routes */}
        <Route path="/admin/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="notification" element={<AddNotification />} />
          <Route path="booking" element={<AdminBookings />} />
          <Route path="editnotification/:id" element={<EditNotification />} />
          <Route path="editfutsal/:id" element={<AdminEditFutsal />} />
          <Route path="futsal" element={<AdminDashboard />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
