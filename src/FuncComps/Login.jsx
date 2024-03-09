import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const defaultTheme = createTheme();

export default function SignIn(props) {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    loginUser(data);
  };

  const loginUser = (data) => {
    let username = data.get("usernameLog");
    let password = data.get("passwordLog");

    let user = props.usersProp.find(
      (user) => user.username == username && user.password == password
    ); 

    if (user && !sessionStorage.loggedUser) {
      console.log("USER FOUND, logging in");
      sessionStorage.setItem("loggedUser", JSON.stringify(user));
      sendLogged("userIsLogged");
    } else if (
      !user &&
      data.get("usernameLog") == "admin" &&
      data.get("passwordLog") == "admin" && !sessionStorage.loggedUser
    ) {
      sessionStorage.setItem("loggedUser", "admin");
      sendLogged("adminIsLogged");
    } else {
      console.log("user is not valid, try again");
    }
  };

  const sendLogged = (whoIsLogged) => {
    props.sendLogged(whoIsLogged);
  };

  return (
    <div
      style={{
        border: "solid #1E90FF 2px",
        margin: 10,
        padding: 10,
        borderRadius: 10,
      }}
    >
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="usernameLog"
                label="Username"
                name="usernameLog"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="passwordLog"
                label="Password"
                type="password"
                id="passwordLog"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </div>
  );
}
