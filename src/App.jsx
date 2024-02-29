import { useState } from "react";
import "./App.css";
import Register from "./FuncComps/Register";
import Login from "./FuncComps/Login";
import Profile from "./FuncComps/Profile";
import Login2 from "./FuncComps/Login2";

function App() {
  return (
    <>
      <Register />
      <Login />
      <Login2 />
      <Profile />
    </>
  );
}

export default App;
