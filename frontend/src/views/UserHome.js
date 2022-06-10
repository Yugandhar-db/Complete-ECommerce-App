// importing react library components
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button, Grid } from "@mui/material";
import Card from "react-bootstrap/Card";

// importing custom components and functions
import {
  LogoutSubmit,
  GetProducts,
  validateUser,
  AddToCart,
} from "../apiManager";
import Header from "../Components/Header";

// main function: User Home Page
const UserHome = () => {
  const [pdtcs, setProducts] = useState([]);
  const navigate = useNavigate();

  const getProductClick = async () => {
    const temp = await GetProducts();
    console.log(temp.data);
    setProducts(temp.data);
  };

  const addClickHandler = (id) => {
    AddToCart(id);
  };

  useEffect(() => {
    async function getValidate() {
      const validated = await validateUser();
      if (validated === false) return navigate("/home");
    }
    getValidate();
    getProductClick();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Header page="home" />
      <div style={{ padding: "4rem 0 0 0" }}>
        <div>This is User Home Page</div>

        <div>
          <Grid container justifyContent="center" p={2}>
            {pdtcs.map((element, id) => {
              return (
                <Card
                  key={id}
                  style={{ width: "22rem", border: "none" }}
                  className="mx-2 mt-4 card_style"
                >
                  <Card.Img
                    variant="top"
                    src={
                      element.Image
                        ? element.Image
                        : "https://www.gstatic.com/webp/gallery3/2_webp_ll.png"
                    }
                    style={{ height: "12rem" }}
                  />
                  <Card.Body>
                    <Card.Title>{element.Title}</Card.Title>
                    <Card.Text>
                      Price: ₹{element.Price}
                      {element.Text}
                    </Card.Text>
                    <div className="button_div d-flex justify-content-center">
                      <Button
                        variant="contained"
                        color="secondary"
                        size="small"
                        onClick={() => addClickHandler(element._id)}
                        className="col-lg-12"
                        style={{ zIndex: -1 }}
                      >
                        Add To Cart
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              );
            })}
          </Grid>
        </div>
      </div>
    </motion.div>
  );
};

export default UserHome;
