import { useEffect, useState } from "react";
import "./App.css";
import Register from "./FuncComps/Register";
import Login from "./FuncComps/Login";
import Profile from "./FuncComps/Profile";
import Login2 from "./FuncComps/Login2";
import SystemAdmin from "./FuncComps/SystemAdmin";

function App() {
  const [users, setUsers] = useState([]);
  // const [showLogged, setShowLogged] = useState("");
  const [pleaseConnect, setPleaseConnect] = useState("Please Log in");
  const [adminIsLogged, setAdminIsLogged] = useState(false);
  const [userIsLogged, setUserIsLogged] = useState(false);

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
    if (logged == "userIsLogged") {
      setPleaseConnect("");
      setUserIsLogged(true);
    } else if (logged == "adminIsLogged") {
      console.log("adming Logged!, handle logic");
      setAdminIsLogged(true);
      setPleaseConnect("");

    } else if (logged == "noneIsLogged") {
      console.log("handle none logic");
    }
  };

  return (
    <>
      <Register usersProp={users} />
      <Login2 usersProp={users} sendLogged={setLogged} />
      {pleaseConnect}
      {userIsLogged && <Profile />}
      {adminIsLogged && <SystemAdmin />}
    </>
  );
}

export default App;
