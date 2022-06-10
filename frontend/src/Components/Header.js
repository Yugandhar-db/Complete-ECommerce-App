import React, { useState, useEffect } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import PhoneIcon from "@mui/icons-material/Phone";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import { Grid } from "@mui/material";

import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import { validateUser, LogoutSubmit } from "../apiManager/index";
import AccountMenu from "./HeaderMenu";

const Header = (props) => {
  const [isLogged, setIsLogged] = useState(false);
  const [value, setValue] = React.useState(0);

  const navigate = useNavigate();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
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
  //   console.log(`Page Prop Value : ${props.page}`);

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
            <h3>This is Header Part </h3>
          </div>
          <div>
            <Grid container columnGap={2} justifyContent="flex-end">
              <Grid item>
                <Button
                  variant={page == "home" ? "text" : "outlined"}
                  onClick={homeClickHandler}
                >
                  Go to Home
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant={page == "cart" ? "text" : "outlined"}
                  onClick={getCartClick}
                >
                  Go to Cart
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
