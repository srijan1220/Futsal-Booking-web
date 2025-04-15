import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "sonner"
import { Link, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input"; // Optional: You can replace this with plain <input> if needed
import { Button } from "@/components/ui/button"; // Optional: Replace with plain <button> if needed
import { loginUserApi } from "@/api/api";

const Login = () => {
  const navigate = useNavigate();

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
        .then((res:any) => {
          if (res.data.success === false) {
            toast.error(res.data.message);
            toast(res.data.message)
          } else {
            toast(res.data.message)
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
        .catch((err:any) => {
            toast("Server Error")
          console.log(err.message);
        });
    },
  });

  return (
    <div className="min-h-screen flex items-center bg-gray-100">
      <div className="grid grid-cols-1 md:grid-cols-2 max-w-4xl m-auto shadow-lg">
        {/* Image container */}
        <div>
          <img
            className="object-cover w-full h-full"
            src="/../assets/images/3.png"
            alt="Login Visual"
          />
        </div>

        {/* Login form container */}
        <div className="flex flex-col justify-center p-8 bg-white">
          <div className="mb-4">
            <h2 className="text-xl font-bold text-center text-gray-700">
              Welcome Back!
            </h2>
            <p className="text-center text-gray-500">
              Please sign in to your account
            </p>
          </div>

          <form onSubmit={formik.handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="userName"
                className="text-sm font-medium text-gray-700"
              >
                Username
              </label>
              <Input
                id="userName"
                name="userName"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.userName}
              />
              {formik.touched.userName && formik.errors.userName && (
                <p className="text-red-500 text-sm">{formik.errors.userName}</p>
              )}
            </div>

            <div className="mb-4">
              <label
                htmlFor="password"
                className="text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <Input
                id="password"
                name="password"
                type="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
              {formik.touched.password && formik.errors.password && (
                <p className="text-red-500 text-sm">{formik.errors.password}</p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full mt-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              Sign in
            </Button>
          </form>

          <div className="flex items-center justify-between mt-6">
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
