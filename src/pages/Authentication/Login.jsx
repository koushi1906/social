import { Button } from "@mui/material";
import { TextField } from "@mui/material";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { loginUserAction } from "../../Redux/Auth/auth.action";

const initialValues = { email: "", password: "" };
const validationSchema = {
  email: Yup.string().email("Invalid Email").required("Email is Required"),
  password: Yup.string()
    .min(6, "Password must be atleast 6 characters")
    .required("Password is required"),
};
const Login = () => {
  const [formValue, setFormValue] = useState();
  const dispatch = useDispatch();
  const handleSubmit = (values) => {
    console.log("Handle Submmit", values);
    dispatch(loginUserAction({data: values}))
  };
  const navigate = useNavigate();
  return (
    <>
      <Formik
        onSubmit={handleSubmit}
        // validationSchema={validationSchema}
        initialValues={initialValues}
      >
        <Form className="space-y-5">
          <div className="space-y-5">
            <div className="">
              <Field
                as={TextField}
                name="email"
                placeholder="email"
                type="email"
                variant="outlined"
                fullWidth
              />
              <ErrorMessage
                name="email"
                component={"div"}
                className="text-red-500"
              />
            </div>
            <div className="">
              <Field
                as={TextField}
                name="password"
                placeholder="password"
                type="password"
                variant="outlined"
                fullWidth
              />
              <ErrorMessage
                name="password"
                component={"div"}
                className="text-red-500"
              />
            </div>
          </div>
          <Button sx={{padding: ".8rem 0rem"}} fullWidth type="submit" variant="contained" color="primary">Login</Button>
        </Form>
      </Formik>
      <div className="flex gap-2 items-center justify-center pt-5">
        <p>Don't have an account?</p>
        <Button onClick={() => navigate("/register")}>Register</Button>
      </div>
    </>
  );
};

export default Login;
