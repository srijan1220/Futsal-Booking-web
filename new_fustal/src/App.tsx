import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './admin/Layout';
import { HomePage } from './admin/page/HomePage';
import AdminRoutes from './protectedroutes/Adminroutes';
import AddNotification from './admin/page/AddNotification';
import AdminBookings from './admin/page/AdminBookings';
import EditNotification from './admin/page/EditNotification';
import AdminEditFutsal from './admin/page/AdminEditFutsal';
import AdminDashboard from './admin/page/AdminDashboard';
import Login from './app/Login';
import Signup from './app/Signup';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />

        <Route path="/" element={<Layout />}>

          <Route index element={<HomePage />} />

          <Route element={<AdminRoutes />}>
            <Route path="notification" element={<AddNotification />} />
            <Route path="booking" element={<AdminBookings />} />
            <Route path="admin/editnotification/:id" element={<EditNotification />} />
            <Route path="admin/editfustal/:id" element={<AdminEditFutsal />} />
            <Route path="fustal" element={<AdminDashboard />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
