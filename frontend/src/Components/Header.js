// importing react library components
import React, { useState, useEffect } from "react";
import { Grid, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Navbar } from "react-bootstrap";

// importing custom components and functions
import { validateUser, capitalizeFirstLetter } from "../apiManager";
import AccountMenu from "./HeaderMenu";

// main function : Header component
const Header = (props) => {
  const [isLogged, setIsLogged] = useState(false);

  const navigate = useNavigate();

  const ordersClickHandler = () => {
    navigate("/userorders");
  };
  const getCartClick = () => {
    navigate("/usercart");
  };
  const homeClickHandler = () => {
    navigate("/userhome");
  };
  useEffect(() => {
    async function getValidate() {
      const validated = await validateUser();
      setIsLogged(validated);
    }
    getValidate();
  }, []);

  const page = props.page;

  return (
    <div>
      {isLogged ? (
        <Navbar
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "0 2rem 0 2rem",
            alignItems: "center",
            backgroundColor: "#ddd",
            position: "fixed",
            left: 0,
            right: 0,
          }}
        >
          <div>
            <h3>You are in {capitalizeFirstLetter(page)} Page </h3>
          </div>
          <div>
            <Grid container columnGap={2} justifyContent="flex-end">
              <Grid item>
                <Button
                  variant={page == "home" ? "text" : "outlined"}
                  onClick={homeClickHandler}
                >
                  Go Home
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant={page == "cart" ? "text" : "outlined"}
                  onClick={getCartClick}
                >
                  My Cart
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant={page == "orders" ? "text" : "outlined"}
                  onClick={ordersClickHandler}
                >
                  My Orders
                </Button>
              </Grid>
            </Grid>
          </div>
          <div>
            <AccountMenu />
          </div>
        </Navbar>
      ) : (
        <h2>No Header Part</h2>
      )}
    </div>
  );
};

export default Header;
