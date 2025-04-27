import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Registration from "./pages/Registration";
// for react toast message
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Footer from "./components/Footer";
import LandingFooter from "./components/LandingFooter";
import LandingNavbar from "./components/LandingNavbar";
import Navbar from "./components/Navbar";
import AllNotifications from "./pages/AllNotifications";
import BookingForm from "./pages/BookingForm";
import Dashboard from "./pages/Dashboard";
import EditMybookings from "./pages/EditMybookings";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import MyBookings from "./pages/Mybookings";
import UserProfile from "./pages/Updateprofile";
import AddNotification from "./pages/admin/AddNotification";
import AdminBookings from "./pages/admin/AdminBookings";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminEditFutsal from "./pages/admin/AdminEditFutsal";
import AdminSidebar from "./pages/admin/AdminSidebar";
import EditNotification from "./pages/admin/EditNotification";
import AdminRoutes from "./protected/AdminRoutes";
import UserRoutes from "./protected/UserRoutes";
function App() {
  const user = JSON.parse(localStorage.getItem("user"));
  const isAdmin = user && user.isAdmin;
  return (
    <Router>
      <ToastContainer />
      <Routes>
        <Route path="/navbar" element={<Navbar />} />
        <Route path="/landingnavbar" element={<LandingNavbar />} />
        <Route path="/footer" element={<Footer />} />
        <Route path="/landingfooter" element={<LandingFooter />} />
       

        <Route path="/register" element={<Registration />} />
        <Route path="/forgetpassword" element={<ForgetPassword />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Landing />} />

        <Route element={<UserRoutes />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/booking/:id" element={<BookingForm />} />
          <Route path="/mybooking" element={<MyBookings />} />
          <Route path="/myedit/:id" element={<EditMybookings />} />
          <Route path="/update" element={<UserProfile />} />
          <Route path="/allnotification" element={<AllNotifications />} />
        </Route>

        <Route element={<AdminRoutes />}>
          {/* Admin routes */}
          <Route path="/admin/futsal" element={<AdminDashboard />} />
          <Route path="/admin/dashboard" element={<AdminSidebar />} />
          <Route path="/admin/booking" element={<AdminBookings />} />
          <Route path="/admin/notification" element={<AddNotification />} />
          <Route
            path="/admin/editnotification/:id"
            element={<EditNotification />}
          />

          {/* Edit product */}
          <Route path="/admin/edit/:id" element={<AdminEditFutsal />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
