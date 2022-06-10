import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  GetCart,
  validateUser,
  LogoutSubmit,
  placeOrder,
} from "../apiManager/index";
import Card from "react-bootstrap/Card";
import Header from "../Components/Header";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { motion } from "framer-motion";

const UserCart = () => {
  const [cartData, setCartData] = useState([]);
  const navigate = useNavigate();

  const logoutclick = () => {
    LogoutSubmit();
    navigate("/home");
  };

  const getCartClick = async () => {
    const temp = await GetCart();
    // console.log(temp.data);
    setCartData(temp.data);
  };

  const homeClickHandler = () => {
    navigate("/userhome");
  };
  const ordersClickHandler = () => {
    navigate("/userorders");
  };

  const placeOrderClickHandler = async () => {
    // console.log(cartData);
    const result = await placeOrder(cartData);
    // console.log(result);
    if (result === 200) {
      navigate("/userhome");
    }
  };

  useEffect(() => {
    async function getValidate() {
      const validated = validateUser();
      if (validated === false) return navigate("/home");
    }
    getValidate();
    getCartClick();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Header page="cart" />
      <div style={{ padding: "4rem 0 0 0" }}>
        <Button
          onClick={placeOrderClickHandler}
          disabled={cartData.length ? false : true}
          variant="contained"
          color="secondary"
          style={{ position: "fixed", bottom: "4rem", right: "4rem" }}
        >
          Place Order
        </Button>

        <Grid container justifyContent="center" p={2}>
          {cartData.length ? (
            <>
              {cartData.map((element, id) => {
                return (
                  <Card
                    key={id}
                    style={{ width: "22rem", border: "none" }}
                    className="mx-2 mt-4 card_style"
                  >
                    <Card.Img
                      variant="top"
                      src={
                        element.item.Image
                          ? element.item.Image
                          : "https://www.gstatic.com/webp/gallery3/2_webp_ll.png"
                      }
                      style={{ height: "12rem" }}
                    />
                    <Card.Body>
                      <Card.Title>{element.item.Title}</Card.Title>
                      <Card.Text>
                        Price: ₹{element.item.Price}
                        {element.Text}
                      </Card.Text>
                      <Card.Text>
                        Count: {element.count}
                        {element.Text}
                      </Card.Text>
                      <div className="button_div d-flex justify-content-center">
                        {/* <Button
                      variant="primary"
                      onClick={() => console.log("Added to Cart")}
                      className="col-lg-12"
                    >
                      Add To Cart
                    </Button> */}
                      </div>
                    </Card.Body>
                  </Card>
                );
              })}
            </>
          ) : (
            <h1>No Items in Cart</h1>
          )}
        </Grid>
      </div>
    </motion.div>
  );
};

export default UserCart;
