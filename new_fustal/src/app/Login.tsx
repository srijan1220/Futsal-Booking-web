"use client";

import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import { loginUserApi } from "@/api/api";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      userName: "",
      password: "",
    },
    validationSchema: Yup.object({
      userName: Yup.string().required("Username is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: (values) => {
      loginUserApi(values)
        .then((res: any) => {
          if (res.data.success === false) {
            toast.error(res.data.message);
          } else {
            toast(res.data.message);
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", JSON.stringify(res.data.userData));

            const user = res.data.userData;
            if (user.isAdmin) {
              navigate("/admin/futsal");
              window.location.reload();
            } else {
              navigate("/dashboard");
              window.location.reload();
            }
          }
        })
        .catch((err: any) => {
          toast("Server Error");
          console.log(err.message);
        });
    },
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex items-center bg-gray-100">
      <div className="grid grid-cols-1 md:grid-cols-2 max-w-4xl m-auto shadow-lg rounded-lg overflow-hidden">
        {/* Image container */}
        <div className="h-full">
          <img
            className="object-cover w-full h-full"
            src="/../assets/images/3.png"
            alt="Login Visual"
          />
        </div>

        {/* Login form container */}
        <div className="flex flex-col justify-center p-8 bg-white">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-center text-gray-700 mb-2">
              Welcome Back!
            </h2>
            <p className="text-center text-gray-500">
              Please sign in to your account
            </p>
          </div>

          <form onSubmit={formik.handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label
                htmlFor="userName"
                className="text-sm font-medium text-gray-700 block"
              >
                Username
              </label>
              <Input
                id="userName"
                name="userName"
                type="text"
                className="px-3 py-2 h-10"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.userName}
              />
              {formik.touched.userName && formik.errors.userName && (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.userName}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label
                htmlFor="password"
                className="text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  className="px-3 py-2 h-10 pr-10"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <EyeOff size={18} aria-hidden="true" />
                  ) : (
                    <Eye size={18} aria-hidden="true" />
                  )}
                  <span className="sr-only">
                    {showPassword ? "Hide password" : "Show password"}
                  </span>
                </button>
              </div>
              {formik.touched.password && formik.errors.password && (
                <p className="text-red-500 text-sm">{formik.errors.password}</p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 h-11 mt-2"
            >
              Sign in
            </Button>
          </form>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-8 gap-4 text-center sm:text-left">
            <Link
              to="/forgetpassword"
              className="text-sm text-green-600 hover:text-green-500"
            >
              Forgot your password?
            </Link>
            <Link
              to="/register"
              className="text-sm text-green-600 hover:text-green-500"
            >
              Don't have an account? Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
