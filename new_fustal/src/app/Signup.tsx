"use client"

import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { toast } from "sonner"
import { useFormik, type FormikHelpers } from "formik"
import * as Yup from "yup"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff } from "lucide-react"
import { createUserApi } from "@/api/api"

interface FormValues {
  userName: string
  phoneNumber: string
  email: string
  password: string
  confirmPassword: string
}

const Signup = () => {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const initialValues: FormValues = {
    userName: "",
    phoneNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
  }

  const validationSchema = Yup.object().shape({
    userName: Yup.string().required("Name is required"),
    phoneNumber: Yup.string().required("Phone number is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), ""], "Passwords must match")
      .required("Confirm password is required"),
  })

  const handleSubmit = async (values: FormValues, { setSubmitting }: FormikHelpers<FormValues>) => {
    try {
      const { userName, phoneNumber, email, password } = values
      const res = await createUserApi({
        userName,
        phoneNumber,
        email,
        password,
      })
      if (res.data.success === false) {
        toast.error(res.data.message)
      } else {
        toast(res.data.message)
        navigate("/")
      }
    } catch (err) {
      toast("Server Error")
      console.error(err)
    } finally {
      setSubmitting(false)
    }
  }

  const formik = useFormik<FormValues>({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
  })

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 max-w-4xl w-full m-auto shadow-lg rounded-lg overflow-hidden">
        <div className="hidden md:block">
          <img className="object-cover w-full h-full" src="/../assets/images/3.png" alt="Signup Visual" />
        </div>
        <Card className="border-0 shadow-none rounded-none md:rounded-r-lg bg-white">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold text-center text-gray-700 mb-2">Welcome!</h2>
            <p className="text-center text-gray-500 mb-6">Please sign up for an account</p>

            <form onSubmit={formik.handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="userName" className="text-sm font-medium block">
                  Username
                </Label>
                <Input
                  id="userName"
                  name="userName"
                  value={formik.values.userName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Enter your name"
                  className="px-3 py-2 h-10"
                />
                {formik.touched.userName && formik.errors.userName && (
                  <p className="text-red-500 text-sm mt-1">{formik.errors.userName}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phoneNumber" className="text-sm font-medium block">
                  Phone Number
                </Label>
                <Input
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formik.values.phoneNumber}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Enter your phone number"
                  className="px-3 py-2 h-10"
                />
                {formik.touched.phoneNumber && formik.errors.phoneNumber && (
                  <p className="text-red-500 text-sm mt-1">{formik.errors.phoneNumber}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium block">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="you@example.com"
                  className="px-3 py-2 h-10"
                />
                {formik.touched.email && formik.errors.email && (
                  <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium block">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="********"
                    className="px-3 py-2 h-10 pr-10"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    onClick={() => setShowPassword(!showPassword)}
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff size={18} aria-hidden="true" /> : <Eye size={18} aria-hidden="true" />}
                    <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                  </button>
                </div>
                {formik.touched.password && formik.errors.password && (
                  <p className="text-red-500 text-sm mt-1">{formik.errors.password}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-sm font-medium block">
                  Confirm Password
                </Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="********"
                    className="px-3 py-2 h-10 pr-10"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    tabIndex={-1}
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={18} aria-hidden="true" />
                    ) : (
                      <Eye size={18} aria-hidden="true" />
                    )}
                    <span className="sr-only">{showConfirmPassword ? "Hide password" : "Show password"}</span>
                  </button>
                </div>
                {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                  <p className="text-red-500 text-sm mt-1">{formik.errors.confirmPassword}</p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full py-2.5 bg-green-600 hover:bg-green-700 text-white h-11 mt-2"
                disabled={formik.isSubmitting}
              >
                {formik.isSubmitting ? "Signing Up..." : "Sign Up"}
              </Button>
            </form>

            <div className="text-center mt-8 text-sm">
              <Link to="/" className="text-green-600 hover:text-green-500">
                Already have an account? Sign in
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Signup
