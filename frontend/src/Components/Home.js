import React, { useState, useRef, useEffect } from "react";
import Grid from "@mui/material/Grid";
import { Container } from "@mui/system";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import CardHeader from "react-bootstrap/esm/CardHeader";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Alert } from "@mui/material";
import { LoginSubmit } from "../apiManager/index";

const Home = () => {
  let navigate = useNavigate();

  const loginclick = async () => {
    const logged = await LoginSubmit(
      loginEmailRef.current.value,
      loginPassRef.current.value
    );
    if (logged) {
      navigate("/userhome");
    } else {
      console.log("Incorrect password...");
      navigate("/home");
    }
  };

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [signinData, setSigninData] = useState({
    username: "",
    email: "",
    password: "",
    dob: "",
  });
  const loginRef = useRef({
    email: "",
    password: "",
  });

  const loginEmailRef = useRef(null);
  const loginPassRef = useRef(null);
  const signinRef = useRef({
    username: "",
    email: "",
    password: "",
    dob: "",
  });

  const signinSubmit = () => {
    setSigninData(() => ({
      email: signinRef.current.email.value,
      password: signinRef.current.password.value,
      username: signinRef.current.username.value,
      dob: signinRef.current.dob.value,
    }));
  };
  const navigateForgetPsswd = () => {
    navigate("/forgotpassword");
  };

  return (
    <>
      <Grid container justifyContent="center" p={2}>
        <h1>Welcome..!</h1>
      </Grid>
      <Container sx={{ bgcolor: "#cfe8fc" }}>
        <Grid container spacing={3} p={2} sx={{}}>
          <Grid
            item
            lg={4}
            sx={{
              backgroundColor: "#ddd",
              m: 2,
            }}
          >
            <CardHeader>Log In</CardHeader>
            <CardContent
              sx={{
                "& > :not(style)": { m: 1, width: "25ch" },
              }}
            >
              <TextField
                id="outlined-basic"
                inputRef={loginEmailRef}
                label="Email"
                variant="outlined"
              />
              <TextField
                id="outlined-basic"
                inputRef={loginPassRef}
                label="Password"
                variant="outlined"
              />
            </CardContent>
            <CardActions justify="space-between">
              <Button size="small" onClick={loginclick}>
                Submit
              </Button>
            </CardActions>
            <hr></hr>
            <Grid item lg={4} sx={{ backgroundColor: "#ddd", border: "#000" }}>
              <CardHeader>Forgot Password</CardHeader>
              <CardContent style={{ width: "200px" }}>
                <TextField
                  id="outlined-basic"
                  label="Email"
                  variant="outlined"
                />
              </CardContent>
              <CardActions justify="space-between">
                <Button size="small" onClick={navigateForgetPsswd}>
                  Click here to Reset
                </Button>
              </CardActions>
            </Grid>
          </Grid>

          <Grid
            item
            lg={4}
            sx={{ backgroundColor: "#ddd", border: "#000", m: 2 }}
          >
            <CardHeader>Sign In</CardHeader>
            <CardContent
              sx={{
                "& > :not(style)": { m: 1, width: "25ch" },
              }}
            >
              <TextField
                id="outlined-basic"
                label="Username"
                variant="outlined"
                inputRef={(el) => (signinRef.current.password = el)}
              />
              <TextField
                id="outlined-basic"
                label="Email"
                inputRef={(el) => (signinRef.current.password = el)}
                variant="outlined"
              />
              <TextField
                id="outlined-basic"
                label="Password"
                variant="outlined"
                inputRef={(el) => (signinRef.current.password = el)}
              />
              <TextField
                id="outlined-basic"
                label="Date of Birth"
                variant="outlined"
                inputRef={(el) => (signinRef.current.password = el)}
              />
            </CardContent>
            <CardActions justify="space-between">
              <Button size="small" onClick={signinSubmit}>
                Submit
              </Button>
            </CardActions>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Home;
