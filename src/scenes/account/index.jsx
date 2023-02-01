import { useState } from "react";
import axios from "axios";
import { Box, Button, TextField } from "@mui/material";
import { Form } from "react-form-elements";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import api from "../../http-common"

const Account = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const navigate = useNavigate();

  const [user, setUser] = useState({
    CustomerFName: "",
    CustomerLName: "",
    PhoneNumber: "",
  });

  const handleChange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  const handleFormSubmit = (values) => {
    
    api.post(`/api/Candy/register`, values)
    .then((res) => {
        alert("Successfully created account!");
    })
    .catch(function (res) {
      console.log(res);
    });
  };

  return (
    <Box m="20px">
      <Header title="CREATE USER" subtitle="Create a New User Profile" />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <Form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="First Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.CustomerFName}
                name="CustomerFName"
                error={!!touched.CustomerFName && !!errors.CustomerFName}
                helperText={touched.CustomerFName && errors.CustomerFName}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Last Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.CustomerLName}
                name="CustomerLName"
                error={!!touched.CustomerLName && !!errors.CustomerLName}
                helperText={touched.CustomerLName && errors.CustomerLName}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="email"
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Contact Number"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.PhoneNumber}
                name="PhoneNumber"
                error={!!touched.PhoneNumber && !!errors.PhoneNumber}
                helperText={touched.PhoneNumber && errors.PhoneNumber}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="password"
                label="Password"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password}
                name="password"
                error={!!touched.password && !!errors.password}
                helperText={touched.password && errors.password}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="password"
                label="Confirm Password"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.ConfirmPassword}
                name="ConfirmPassword"
                error={!!touched.ConfirmPassword && !!errors.ConfirmPassword}
                helperText={touched.ConfirmPassword && errors.ConfirmPassword}
                sx={{ gridColumn: "span 4" }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button
                type="submit"
                color="secondary"
                variant="contained"
              >
                Create New User
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
  CustomerFName: yup.string().required("required"),
  CustomerLName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  PhoneNumber: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("required"),
  password: yup.string().required("required"),
  ConfirmPassword: yup.string().when("password", {
    is: (val) => (val && val.length > 0 ? true : false),
    then: yup
      .string()
      .oneOf([yup.ref("password")], "Both password need to be the same"),
  }),
});

const initialValues = {
  CustomerFName: "",
  CustomerLName: "",
  email: "",
  PhoneNumber: "",
  password: "",
  ConfirmPassword: "",
};

export default Account;