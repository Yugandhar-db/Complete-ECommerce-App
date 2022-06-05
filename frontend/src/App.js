import logo from "./logo.svg";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import ForgotPassword from "./Components/ForgotPassword";
import LoginPage from "./Utils/Login";
import UserHome from "./Components/UserHome";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<h1>Home...</h1>}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/forgotpassword" element={<ForgotPassword />}></Route>
        <Route path="/userhome" element={<UserHome />}></Route>
      </Routes>
    </div>
  );
}

export default App;
