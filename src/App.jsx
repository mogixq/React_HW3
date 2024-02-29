import { useState } from "react";
import "./App.css";
import Register from "./FuncComps/Register";
import Login from "./FuncComps/Login";
import Profile from "./FuncComps/Profile";

function App() {
  return (
    <>
      <Register />
      <Login />
      <Profile />
    </>
  );
}

export default App;
