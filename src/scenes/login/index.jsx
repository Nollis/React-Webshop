import { Box, Button, TextField } from "@mui/material";
import { Form } from 'react-form-elements';
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import api from "../../http-common"
import {useCookies} from "react-cookie";

const Login = () => {
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const [cookies, setCookie] = useCookies(['UserId']);

    const handleFormSubmit = (values) => {

        // fetch(`https://localhost:7127/api/Candy/login`, {
        //     method: 'POST', // *GET, POST, PUT, DELETE, etc.
        //     mode: 'cors', // no-cors, *cors, same-origin
        //     cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        //     credentials: 'include', // include, *same-origin, omit
        //     headers: {
        //     'Content-Type': 'application/json'
        //     // 'Content-Type': 'application/x-www-form-urlencoded',
        //     },
        //     redirect: 'follow', // manual, *follow, error
        //     referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        //     body: JSON.stringify(values) // body data type must match "Content-Type" header
        // });
        
        api(`/api/Candy/login`, {
            method: "post",
            data: values,
            withCredentials: false}).then((res) => {
            const UID = res.data.userId.replace(/\%20/g, '');
            console.log(res.data);
            if (res.data !== '') {
                setCookie('UserId', UID, {path: '/'} );
                setCookie('CartId', JSON.stringify(res.data.cartId), {path: '/'} );
                alert("Successfully logged in!");
            }
            else {
                alert("Loggin failed!");
            }
        })
        .catch(function (res) {
          console.log(res);
        });

        api(`/api/Candy/checkadmin`, {
            method: "get",
            withCredentials: false}).then((result) => {
            console.log(result.data);
            
            if (result.data !== '') {
                setCookie('Admin', JSON.stringify(result.data), {path: '/'} );
            }
            else {
                console.log("Admin failed!");
            }
        })
        .catch(function (result) {
          console.log(result);
        });
    }
    return (
    <Box m="20px">
        <Header title="LOG IN" subtitle="Log in to your account" />

        <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
        >
            {({ values, errors, touched, handleBlur, handleChange,  handleSubmit }) => (
                <Form onSubmit={handleSubmit}>
                    <Box display="grid" gap="30px" gridTemplateColumns="repeat(4, minmax(0, 1fr))" sx={{"& > div": { gridColumn: isNonMobile ? undefined : "span 4"},
                }}>
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
                    </Box>
                    <Box display="flex" justifyContent="end" mt="20px">
                        <Button type="submit" color="secondary" variant="contained">
                            Log in
                        </Button>
                    </Box>
                </Form>
            )}
        </Formik>

    </Box>
    );
}

const checkoutSchema = yup.object().shape({
    email: yup.string().email("invalid email").required("required"),
    password: yup.string().required("required")
  });

const initialValues = {
    email: "",
    password: "",
  };

export default Login;