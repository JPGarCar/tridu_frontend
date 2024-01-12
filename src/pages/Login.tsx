import { useFormik } from "formik";
import {Navigate, useNavigate} from "react-router-dom";
import { useAuthServiceContext } from "../context/AuthContext";
import {Alert, AlertColor, Box, Button, Container, Snackbar, Stack, TextField} from "@mui/material";
import {useState} from "react";

interface AlertState {
    open: boolean,
    severity: AlertColor | undefined,
    message: string,
}

const Login = () => {

    const { login, isLoggedIn } = useAuthServiceContext();
    const navigate = useNavigate();

    const [alertState, setAlertState] = useState<AlertState>({
        open: false,
        severity: undefined,
        message: "",
    });

    const handleFailAlertClose = () => { setAlertState((state) => ({...state, open: false})); };

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        onSubmit: async (values) => {
            const { username, password } = values;
            const loginOutcome = await login(username, password);

            if (loginOutcome) {
                navigate("/");
            } else {
                setAlertState({
                    open: true,
                    severity: "error",
                    message: "Login credentials invalid, try again!"
                });
            }
        }
    });

    if (isLoggedIn) {
        return (<Navigate to={"/"} />);
    }

    return (
        <Box textAlign="center">
            <Box alignContent={"center"}>
                <h3>UBC TriDu App</h3>
            </Box>
            <form onSubmit={formik.handleSubmit}>
                <Container maxWidth="sm">
                    <Stack spacing={2}>
                        <TextField id="username" name="username" type="text" label="Username" value={formik.values.username}
                                   onChange={formik.handleChange}></TextField>

                        <TextField id="password" name="password" type="password" label="Password" value={formik.values.password}
                                   onChange={formik.handleChange}></TextField>

                        <Button variant="contained" type={"submit"}>Log In</Button>
                    </Stack>
                </Container>
            </form>
            <Snackbar open={alertState.open} autoHideDuration={5000} onClose={handleFailAlertClose}>
                <Alert severity={alertState.severity}>
                    {alertState.message}
                </Alert>
            </Snackbar>
        </Box>
    );

};

export default Login;

