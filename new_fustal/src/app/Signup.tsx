import { useNavigate, Link } from "react-router-dom";
import { toast } from "sonner"
import { useFormik, FormikHelpers } from "formik";
import * as Yup from "yup";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { createUserApi } from "@/api/api";

interface FormValues {
  userName: string;
  phoneNumber: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Signup = () => {
  const navigate = useNavigate();

  const initialValues: FormValues = {
    userName: "",
    phoneNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object().shape({
    userName: Yup.string().required("Name is required"),
    phoneNumber: Yup.string().required("Phone number is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), ""], "Passwords must match")
      .required("Confirm password is required"),
  });

  const handleSubmit = async (
    values: FormValues,
    { setSubmitting }: FormikHelpers<FormValues>
  ) => {
    try {
      const { userName, phoneNumber, email, password } = values;
      const res = await createUserApi({
        userName,
        phoneNumber,
        email,
        password,
      });
      if (res.data.success === false) {
        toast.error(res.data.message);
        toast(res.data.message)
      } else {
        toast(res.data.message)
        navigate("/");
      }
    } catch (err) {
      toast("Server Error");
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const formik = useFormik<FormValues>({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="grid grid-cols-1 md:grid-cols-2 max-w-4xl m-auto shadow-lg">
        <div className="hidden md:block">
          <img
            className="object-cover w-full h-full"
            src="/../assets/images/3.png"
            alt="Signup Visual"
          />
        </div>
        <Card className="p-8 rounded-none md:rounded-lg bg-white">
          <CardContent>
            <h2 className="text-xl font-bold text-center text-gray-700 mb-2">
              Welcome!
            </h2>
            <p className="text-center text-gray-500 mb-6">
              Please sign up for an account
            </p>

            <form onSubmit={formik.handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="userName">Username</Label>
                <Input
                  id="userName"
                  name="userName"
                  value={formik.values.userName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Enter your name"
                />
                {formik.touched.userName && formik.errors.userName && (
                  <p className="text-red-500 text-sm">
                    {formik.errors.userName}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="phoneNumber">Phone Number</Label>
                <Input
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formik.values.phoneNumber}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Enter your phone number"
                />
                {formik.touched.phoneNumber && formik.errors.phoneNumber && (
                  <p className="text-red-500 text-sm">
                    {formik.errors.phoneNumber}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="you@example.com"
                />
                {formik.touched.email && formik.errors.email && (
                  <p className="text-red-500 text-sm">{formik.errors.email}</p>
                )}
              </div>

              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="********"
                />
                {formik.touched.password && formik.errors.password && (
                  <p className="text-red-500 text-sm">
                    {formik.errors.password}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="********"
                />
                {formik.touched.confirmPassword &&
                  formik.errors.confirmPassword && (
                    <p className="text-red-500 text-sm">
                      {formik.errors.confirmPassword}
                    </p>
                  )}
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={formik.isSubmitting}
              >
                {formik.isSubmitting ? "Signing Up..." : "Sign Up"}
              </Button>
            </form>

            <div className="text-center mt-6 text-sm">
              <Link to="/" className="text-green-600 hover:text-green-500">
                Already have an account? Sign in
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Signup;
