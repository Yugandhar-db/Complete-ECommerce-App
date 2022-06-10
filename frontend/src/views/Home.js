import React, { useState, useRef, useEffect } from "react";
import Grid from "@mui/material/Grid";
import { Container } from "@mui/system";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import CardHeader from "react-bootstrap/esm/CardHeader";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import { LoginSubmit, validateUser, SigninSubmit } from "../apiManager/index";
import Header from "../Components/Header";
import { motion } from "framer-motion";

const Home = () => {
  let navigate = useNavigate();

  const loginRef = useRef({
    email: "",
    password: "",
  });

  const signinRef = useRef({
    username: "",
    email: "",
    password: "",
    dob: "",
  });

  const loginclick = async () => {
    const logged = await LoginSubmit(
      loginRef.current.email.value,
      loginRef.current.password.value
    );
    if (logged) {
      navigate("/userhome");
    } else {
      console.log("Incorrect password...");
      navigate("/home");
    }
  };

  const signinClick = async () => {
    // console.log(signinRef.current.email.value);
    const signed = await SigninSubmit(
      signinRef.current.username.value,
      signinRef.current.email.value,
      signinRef.current.password.value,
      signinRef.current.dob.value
    );
    if (signed) {
      navigate("/userhome");
    } else {
      console.log("Something went wrong..!");
      navigate("/home");
    }
  };
  const navigateForgetPsswd = () => {
    navigate("/forgotpassword");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("useEffetc ===> ", token);
    async function getValidate() {
      const validated = await validateUser();
      if (validated === true) return navigate("/userhome");
    }
    getValidate();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Header />
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
                inputRef={(el) => {
                  loginRef.current.email = el;
                }}
                label="Email"
                variant="outlined"
              />
              <TextField
                id="outlined-basic"
                inputRef={(el) => {
                  loginRef.current.password = el;
                }}
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
                inputRef={(el) => (signinRef.current.username = el)}
              />
              <TextField
                id="outlined-basic"
                label="Email"
                inputRef={(el) => (signinRef.current.email = el)}
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
                inputRef={(el) => (signinRef.current.dob = el)}
              />
            </CardContent>
            <CardActions justify="space-between">
              <Button size="small" onClick={signinClick}>
                Submit
              </Button>
            </CardActions>
          </Grid>
        </Grid>
      </Container>
    </motion.div>
  );
};

export default Home;
