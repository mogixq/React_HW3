import { useEffect, useState } from "react";
import "./App.css";
import Register from "./FuncComps/Register";
import Login from "./FuncComps/Login";
import Profile from "./FuncComps/Profile";
import SystemAdmin from "./FuncComps/SystemAdmin";

function App() {
  const [users, setUsers] = useState(false);
  const [pleaseConnect, setPleaseConnect] = useState("Please Log in");
  const [adminIsLogged, setAdminIsLogged] = useState(false);
  const [userIsLogged, setUserIsLogged] = useState(false);

  useEffect(() => {
    const loadedUsers = JSON.parse(localStorage.getItem("users")) || [];
    setUsers(loadedUsers);
    sessionStorage.clear();
  }, []);

  useEffect(() => {
    if (users === false) {
      return;
    }
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

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

  const setNewUser = (newUser) => {
    console.log("newUser in setNewUser ", newUser);
    if (users == null) {
      setUsers([newUser]);
      return;
    }
    let usersNew = [...users, newUser];
    setUsers(usersNew);
  };

  const hideProfile = () => {
    setUserIsLogged(false);
    setAdminIsLogged(false);
    setPleaseConnect("Please Log in");
  };

  const deleteUser = (user) => {
    let tempUser = users.find((temp) => user.email == temp.email);

    if (tempUser) {
      let keep = users.filter((temp) => temp.email !== user.email);
      console.log(keep);
      setUsers(keep);
    } else {
      console.log("user not found");
    }
  };

  const editUser = (user) => {
    let updatedArr = users.map((temp) => {
      if (temp.email == user.email) {
        return user;
      } else {
        return temp;
      }
    });
    setUsers(updatedArr);
  };

  return (
    <>
      <Register usersProp={users} sendNewUser={setNewUser} />
      <Login usersProp={users} sendLogged={setLogged} />
      {pleaseConnect}
      {userIsLogged && (
        <Profile sendHide={hideProfile} sendUpdateUser={editUser} />
      )}
      {adminIsLogged && (
        <SystemAdmin
          users={users}
          sendHide={hideProfile}
          sendDeleteUser={deleteUser}
          userToEdit={editUser}
        />
      )}
    </>
  );
}

export default App;
