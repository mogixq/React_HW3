import { useEffect, useState } from "react";
import "./App.css";
import Register from "./FuncComps/Register";
import Login from "./FuncComps/Login";
import Profile from "./FuncComps/Profile";
import Login2 from "./FuncComps/Login2";

function App() {
  const [users, setUsers] = useState([]);
  const [showLogged, setShowLogged] = useState('')
  const [pleaseConnect, setPleaseConnect] = useState('Please Log in')
  useEffect(() => {
    loadUsers();
  }, []);

  useEffect(() => {
    console.log(users);
  }, [users]);

  const loadUsers = () => {
    setUsers(JSON.parse(localStorage.getItem("users")));
  };

  const setLogged = (logged) => {
    if (logged) {
      setPleaseConnect('');//maybe change to check sessionstorage
      setShowLogged(true);
    }
  };

  return (
    <>
      <Register usersProp={users} />
      <Login2 usersProp={users} sendLogged={setLogged} />
      {pleaseConnect}
      {showLogged && <Profile />}
      
    </>
  );
}

export default App;
