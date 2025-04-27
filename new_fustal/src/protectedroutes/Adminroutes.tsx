import { Navigate, Outlet } from "react-router-dom";

const AdminRoutes = () => {
  const user = JSON.parse(localStorage.getItem("user") || "null");

  if (user && user.isAdmin === true) {
    return <Outlet />;
  } else {
    return <Navigate to="/login" replace />;
  }
};

export default AdminRoutes;
