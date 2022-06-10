// importing react library components
import React, { useEffect, useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { Card, ListGroup } from "react-bootstrap";
import { Divider, Grid } from "@mui/material";
import { motion } from "framer-motion";

// importing custom components and functions
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { validateUser, GetOrders } from "../apiManager";

// main function: Orders Page View
const UserOrders = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  const getOrdersClick = async () => {
    const temp = await GetOrders();
    setOrders(temp.data);
  };

  useEffect(() => {
    async function getValidate() {
      const validated = validateUser();
      if (validated === false) return navigate("/home");
    }
    getValidate();
    getOrdersClick();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Header page="orders" />

      <div style={{ padding: "4rem 4rem 4rem 4rem" }}>
        {orders.length ? (
          <div>
            <Grid
              container
              justifyContent="space-around"
              spacing={2}
              columnGap={2}
            >
              {orders.map((element, id) => {
                return (
                  <Card
                    border="primary"
                    style={{ width: "18rem" }}
                    key={element._id}
                  >
                    <Card.Header as="h4">Order {id + 1}</Card.Header>
                    <Divider />

                    <Card.Body>
                      <ListGroup className="list-group-flush">
                        {element.items.map((e) => {
                          return (
                            <ListGroup.Item key={e._id}>
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "space-between",
                                }}
                              >
                                <p>{e.item.Title}</p>
                                <p>{e.count}</p>

                                <img
                                  src={
                                    e.item.Image
                                      ? e.item.Image
                                      : "https://www.gstatic.com/webp/gallery3/2_webp_ll.png"
                                  }
                                  style={{ height: "2rem" }}
                                ></img>
                              </div>
                            </ListGroup.Item>
                          );
                        })}
                      </ListGroup>
                    </Card.Body>
                  </Card>
                );
              })}
            </Grid>
          </div>
        ) : (
          <h4>
            You haven't placed any orders. Look at all Products{" "}
            <NavLink to="/userhome">here</NavLink>
          </h4>
        )}
      </div>
      <Footer count={orders.length} />
    </motion.div>
  );
};

export default UserOrders;
