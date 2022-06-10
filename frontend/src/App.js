import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./views/Home";
import UserHome from "./views/UserHome";
import UserCart from "./views/UserCart";
import UserOrders from "./views/UserOrders";
import { AnimatePresence } from "framer-motion";

const App = () => {
  return (
    <AnimatePresence>
      <div className="App">
        <Routes>
          <Route path="/" element={<h1>Home...</h1>}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/forgotpassword" element={<x />}></Route>
          <Route path="/userhome" element={<UserHome />}></Route>
          <Route path="/usercart" element={<UserCart />}></Route>
          <Route path="/userorders" element={<UserOrders />}></Route>
          {/* <Route path="/orders" element={<CollapsibleTable />}></Route> */}
        </Routes>
      </div>
    </AnimatePresence>
  );
};

export default App;
