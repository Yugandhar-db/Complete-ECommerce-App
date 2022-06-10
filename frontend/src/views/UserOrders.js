import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { validateUser, LogoutSubmit, GetOrders } from "../apiManager/index";
import Card from "react-bootstrap/Card";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import ListGroup from "react-bootstrap/ListGroup";
import Divider from "@mui/material/Divider";
import Header from "../Components/Header";
import { motion } from "framer-motion";
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
    // console.log(orders);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {" "}
      <Header page="orders" />
      <div style={{ padding: "4rem 0 0 0" }}>
        <div>Orders Page</div>

        {orders.length ? (
          <div>
            <Grid
              container
              justifyContent="flex-start"
              spacing={2}
              columnGap={2}
              direction="row"
            >
              {orders.map((element, id) => {
                return (
                  <Card border="primary" style={{ width: "18rem" }}>
                    <Card.Header as="h4">Order {id + 1}</Card.Header>
                    <Divider />

                    <Card.Body>
                      <ListGroup className="list-group-flush">
                        {element.items.map((e) => {
                          return (
                            <ListGroup.Item>
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
          <h4>No Orders as of now</h4>
        )}
      </div>
    </motion.div>
  );
};

export default UserOrders;
