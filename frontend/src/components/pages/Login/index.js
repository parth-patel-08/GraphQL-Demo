import React from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { useFormik } from "formik"
import * as yup from "yup"
import { Box, Button, CircularProgress, TextField } from "@mui/material"
import { useMutation } from "@apollo/client"

import { VERIFY_USER } from "../../../graphql/user/mutations"
import { alert } from "../../common/AlertMessage"
import { setUser } from "../../../redux/user/userSlice"
import { parseJwt } from "../../../utils"

const Login = () => {
  const [verifyUser, { loading: isVerifying }] = useMutation(VERIFY_USER)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { values, errors, touched, handleSubmit, handleChange, handleBlur } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: yup.object().shape({
        email: yup.string().email().required("Email must be required"),
        password: yup.string().required("Password must be required"),
      }),
      onSubmit: async (values) => {
        try {
          const {
            data: {
              verifyUser: { token },
            },
          } = await verifyUser({ variables: values })

          localStorage.setItem("shopUserToken", token)
          const user = parseJwt(token)
          dispatch(setUser(user))
          navigate("/", { replace: true })
        } catch (error) {
          alert(error.message, "error")
        }
      },
    })

  return (
    <div className="h-full w-full flex justify-center items-center bg-sky-50">
      <Box className="max-w-md w-full p-5 rounded-xl" sx={{ boxShadow: 3 }}>
        <div className="text-4xl mb-6 text-center">Login</div>
        <form onSubmit={handleSubmit}>
          <input type="email" name="email" style={{ display: "none" }} />
          <input type="password" name="password" style={{ display: "none" }} />

          <div>
            <TextField
              size="small"
              className="mb-3 w-full"
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
              size="small"
              className="mb-3 w-full"
              type="password"
              name="password"
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
          <div className="flex justify-center">
            <Button
              type="submit"
              variant="contained"
              className="w-60"
              disabled={isVerifying}
            >
              Login
              {isVerifying && (
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

export default Login
