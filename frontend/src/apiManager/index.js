import axios from "axios";

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const LoginSubmit = async (email, password) => {
  try {
    const data = await axios
      .post("http://localhost:5000/user/login", {
        email,
        password,
      })
      .then((response) => {
        if (response.status === 200) {
          localStorage.setItem("token", response.data.jwt);
          return response.data;
        }
      });
    return data;
  } catch (err) {
    throw err;
  }
};

const LogoutSubmit = async () => {
  await axios
    .post(
      "http://localhost:5000/user/logout",
      {},
      {
        headers: {
          "Content-type": "Application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
    .then((response) => {
      localStorage.removeItem("token");
      return response.data;
    })
    .catch((e) => console.log(e));
};

const GetProducts = async () => {
  const result = await axios
    .get("http://localhost:5000/products", {
      headers: {
        "Content-type": "Application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((response) => {
      return response;
    });

  return result;
};

const GetCart = async () => {
  const result = await axios
    .get("http://localhost:5000/cart", {
      headers: {
        "Content-type": "Application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((response) => {
      return response;
    });

  return result;
};

const validateUser = async () => {
  const token = localStorage.getItem("token");
  console.log(token);

  if (token) {
    const temp = axios
      .get("http://localhost:5000/verify", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        return true;
      })
      .catch((err) => {
        return false;
      });
    return temp;
  } else {
    return false;
  }
};

const AddToCart = async (itemId) => {
  axios
    .post(
      "http://localhost:5000/cart/add",
      { items: itemId },
      {
        headers: {
          "Content-type": "Application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
    .then((response) => {})
    .catch((err) => {
      console.log(err);
    });
};

const placeOrder = async (cartData) => {
  const ordercount = cartData.map((e) => {
    return { item: e.item._id, count: e.count };
  });

  const placed = axios
    .post(
      "http://localhost:5000/orders/order",
      { data: ordercount },
      {
        headers: {
          "Content-type": "Application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
    .then((response) => {
      return response.status;
    })
    .catch((err) => {
      return err;
    });

  return placed;
};

const GetOrders = async () => {
  const result = await axios
    .get("http://localhost:5000/orders", {
      headers: {
        "Content-type": "Application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((response) => {
      return response;
    });

  return result;
};

const SigninSubmit = async (username, email, password, dob) => {
  try {
    const data = await axios
      .post("http://localhost:5000/user", {
        username: username,
        email: email,
        password: password,
      })
      .then((response) => {
        if (response.status === 201) {
          localStorage.setItem("token", response.data.jwt);
          return response.data;
        }
      });
    return data;
  } catch (err) {
    throw err;
  }
};

export {
  LoginSubmit,
  LogoutSubmit,
  GetProducts,
  GetCart,
  validateUser,
  AddToCart,
  placeOrder,
  GetOrders,
  SigninSubmit,
  capitalizeFirstLetter,
};
