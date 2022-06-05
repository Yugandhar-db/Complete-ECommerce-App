import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LogoutSubmit, GetUserCart } from "../apiManager/index";
import axios from "axios";

const UserHome = () => {
  const navigate = useNavigate();
  const logoutclick = () => {
    LogoutSubmit();
    navigate("/home");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      axios
        .get("http://localhost:5000/verify", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          //   console.log("verification is in process...");
          console.log(response.data);
        });
    } else {
      navigate("/home");
    }
  }, []);

  return (
    <>
      <div>This is User Home Page</div>
      <button onClick={logoutclick}>Logout</button>
      <button onClick={logoutclick}>Get Cart Data</button>
    </>
  );
};

export default UserHome;
