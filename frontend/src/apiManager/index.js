import axios from "axios";

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
          console.log("Sucessfully logged In..!");
          return response.data;
        }
      });

    return data;
  } catch (err) {
    throw err;
  }
};

const LogoutSubmit = () => {
  axios
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
      console.log("Sucessfully logged out..!");
      // navigate("/home");
    })
    .catch((e) => console.log(e));
};

const GetUserCart = async () => {
  axios.get("http://localhost:5000/user/logout", {
    headers: {
      "Content-type": "Application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export { LoginSubmit, LogoutSubmit, GetUserCart };
