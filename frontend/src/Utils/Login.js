import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const fetchData = () => {
    // console.log(location);
    axios
      .post("http://localhost:5000/user/login", {
        email: location.state.email,
        password: location.state.password,
      })
      .then((response) => {
        console.log(response);
        localStorage.setItem("token", response.data.jwt);
        // navigate("/userhome");
      });
  };
  useEffect(() => {
    fetchData();
  }, []);

  const logout = () => {
    // console.log("Logged Out...!");
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    axios
      .post(
        "http://localhost:5000/user/logout",
        {},
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-type": "Application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        localStorage.removeItem("token");
        console.log("Sucessfully logged out..!");
        navigate("/home");
      })
      .catch((e) => console.log(e));
  };

  return (
    <>
      <h1>{location.state.email}</h1>
      <h2>{location.state.password}</h2>
      <button onClick={logout}>Click here to logout</button>
      {/* <p>{localStorage.getItem("token")}</p> */}
    </>
  );
};

export default LoginPage;
