import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./admin/Layout";
import { HomePage } from "./admin/page/HomePage";
import AdminRoutes from "./protectedroutes/Adminroutes";
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
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/forgetpassword" element={<ForgetPassword />} />

        <Route path="/" element={<Landing />}>
          <Route index element={<HomePage />} />

          <Route element={<AdminRoutes />}>
            <Route path="admin" element={<Layout />}>
              <Route path="notification" element={<AddNotification />} />
              <Route path="booking" element={<AdminBookings />} />
              <Route path="editnotification/:id" element={<EditNotification />} />
              <Route path="editfutsal/:id" element={<AdminEditFutsal />} />
              <Route path="futsal" element={<AdminDashboard />} />
            </Route>
          </Route>

        </Route>

      </Routes>
    </Router>
  );
}

export default App;
