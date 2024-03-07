import { useFormik } from "formik";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuthServiceContext } from "../context/AuthContext";
import { Box, Button, Container, Stack, TextField } from "@mui/material";
import { useSnackbar } from "notistack";
import * as Yup from "yup";

const loginSchema = Yup.object({
  username: Yup.string().required(),
  password: Yup.string().required(),
});

const Login = () => {
  const { login, isLoggedIn, loggedInUser } = useAuthServiceContext();

  const { enqueueSnackbar } = useSnackbar();

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: async (values, formikHelpers) => {
      formikHelpers.setSubmitting(true);
      const { username, password } = values;
      const loginOutcome = await login(username, password);

      if (loginOutcome) {
        navigate("/");
      } else {
        enqueueSnackbar("Login credentials invalid, try again!", {
          variant: "error",
        });
      }
      formikHelpers.setSubmitting(false);
    },
  });

  if (isLoggedIn && loggedInUser != null) {
    return <Navigate to={"/"} />;
  }

  return (
    <Box textAlign="center">
      <Box alignContent={"center"}>
        <h3>UBC TriDu App</h3>
      </Box>
      <form onSubmit={formik.handleSubmit}>
        <Container maxWidth="sm">
          <Stack spacing={2}>
            <TextField
              id="username"
              name="username"
              type="text"
              label="Username"
              value={formik.values.username}
              onChange={formik.handleChange}
              error={formik.touched.username && Boolean(formik.errors.username)}
              helperText={
                formik.touched.username ? formik.errors.username ?? "" : ""
              }
            ></TextField>

            <TextField
              id="password"
              name="password"
              type="password"
              label="Password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={
                formik.touched.password ? formik.errors.password ?? "" : ""
              }
            ></TextField>

            <Button
              variant="contained"
              type={"submit"}
              disabled={formik.isSubmitting}
            >
              Log In
            </Button>
          </Stack>
        </Container>
      </form>
    </Box>
  );
};

export default Login;
