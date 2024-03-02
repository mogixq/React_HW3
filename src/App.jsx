import { useEffect, useState } from "react";
import "./App.css";
import Register from "./FuncComps/Register";
import Login from "./FuncComps/Login";
import Profile from "./FuncComps/Profile";
import Login2 from "./FuncComps/Login2";

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => { 
    loadUsers();
  },[] );

  useEffect(() => { 
    console.log(users);
  },[users] );

  const loadUsers = () => {
    setUsers(JSON.parse(localStorage.getItem("users")))
  };
  
  return (
    <>
      <Register usersProp={users} />
      <Login />
      <Login2 usersProp={users} />
      <Profile />
    </>
  );
}

export default App;
