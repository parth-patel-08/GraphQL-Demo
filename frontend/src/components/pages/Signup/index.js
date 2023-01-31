import React from "react"
import { useNavigate } from "react-router-dom"
import { useFormik } from "formik"
import * as yup from "yup"
import {
  Box,
  Button,
  CircularProgress,
  MenuItem,
  TextField,
} from "@mui/material"
import { useMutation } from "@apollo/client"
import pick from "lodash/pick"

import { CREATE_USER } from "../../../graphql/user/mutations"
import { alert } from "../../common/AlertMessage"

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

const Signup = () => {
  const [createUser, { loading: isSigningUp }] = useMutation(CREATE_USER)
  const navigate = useNavigate()

  const { values, errors, touched, handleSubmit, handleChange, handleBlur } =
    useFormik({
      initialValues: {
        name: "",
        phone: "",
        email: "",
        role: "",
        password: "",
        confirmPassword: "",
      },
      validationSchema: yup.object().shape({
        name: yup.string().required("Name must be required"),
        phone: yup
          .string()
          .matches(phoneRegExp, "Phone number is not valid")
          .required("Phone number must be required"),
        email: yup.string().email().required("Email must be required"),
        role: yup.string().required("Role must be required"),
        password: yup.string().required("Password must be required"),
        confirmPassword: yup
          .string()
          .required("Confirm password must be required")
          .oneOf([yup.ref("password"), null], "Passwords must match"),
      }),
      onSubmit: async (values) => {
        try {
          await createUser({
            variables: pick({ ...values, phone: String(values.phone) }, [
              "name",
              "email",
              "phone",
              "role",
              "password",
            ]),
          })
          navigate("/login")
        } catch (error) {
          alert(error.message, "error")
        }
      },
    })

  return (
    <div className="h-full w-full flex justify-center items-center bg-sky-50">
      <Box className="max-w-md w-full p-5 rounded-xl" sx={{ boxShadow: 3 }}>
        <div className="text-4xl mb-6 text-center">Signup</div>
        <form onSubmit={handleSubmit}>
          <div>
            <TextField
              size="small"
              className="mb-3 w-full"
              name="name"
              type="text"
              id="name"
              label="Name"
              variant="outlined"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.name}
              error={touched.name && Boolean(errors.name)}
            />
            <div className="h-6 text-xs text-red-500">
              {touched.name ? errors.name : ""}
            </div>
          </div>
          <div>
            <TextField
              size="small"
              className="mb-3 w-full"
              name="phone"
              type="number"
              id="phone"
              label="Phone"
              variant="outlined"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.phone}
              error={touched.phone && Boolean(errors.phone)}
            />
            <div className="h-6 text-xs text-red-500">
              {touched.phone ? errors.phone : ""}
            </div>
          </div>
          <div>
            <TextField
              size="small"
              className="mb-3 w-full"
              name="email"
              type="email"
              id="email"
              label="Email"
              variant="outlined"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
              error={touched.email && Boolean(errors.email)}
            />
            <div className="h-6 text-xs text-red-500">
              {touched.email ? errors.email : ""}
            </div>
          </div>
          <div>
            <TextField
              select
              size="small"
              className="mb-3 w-full"
              name="role"
              id="role"
              label="Role"
              variant="outlined"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.role}
              error={touched.role && Boolean(errors.role)}
            >
              <MenuItem value="buyer">Buyer</MenuItem>
              <MenuItem value="seller">Seller</MenuItem>
            </TextField>
            <div className="h-6 text-xs text-red-500">
              {touched.role ? errors.role : ""}
            </div>
          </div>
          <div>
            <TextField
              size="small"
              className="mb-3 w-full"
              name="password"
              type="password"
              id="password"
              label="Password"
              variant="outlined"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
              error={touched.password && Boolean(errors.password)}
            />
            <div className="h-6 text-xs text-red-500">
              {touched.password ? errors.password : ""}
            </div>
          </div>
          <div>
            <TextField
              size="small"
              className="mb-3 w-full"
              name="confirmPassword"
              type="password"
              id="confirmPassword"
              label="Confirm Password"
              variant="outlined"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.confirmPassword}
              error={touched.confirmPassword && Boolean(errors.confirmPassword)}
              autoComplete="new-password"
            />
            <div className="h-6 text-xs text-red-500">
              {touched.confirmPassword ? errors.confirmPassword : ""}
            </div>
          </div>
          <div className="flex justify-center">
            <Button
              type="submit"
              variant="contained"
              className="w-60"
              disabled={isSigningUp}
            >
              Signup
              {isSigningUp && (
                <CircularProgress
                  style={{
                    color: "#757575",
                    width: "16px",
                    height: "16px",
                    marginLeft: "5px",
                  }}
                />
              )}
            </Button>
          </div>
        </form>
      </Box>
    </div>
  )
}

export default Signup
