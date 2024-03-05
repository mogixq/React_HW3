import { useEffect, useState } from "react";
import "./App.css";
import Register from "./FuncComps/Register";
import Login from "./FuncComps/Login";
import Profile from "./FuncComps/Profile";
import Login2 from "./FuncComps/Login2";
import SystemAdmin from "./FuncComps/SystemAdmin";
import { Update } from "@mui/icons-material";

function App() {
  const [users, setUsers] = useState(false);
  // const [showLogged, setShowLogged] = useState("");
  const [pleaseConnect, setPleaseConnect] = useState("Please Log in");
  const [adminIsLogged, setAdminIsLogged] = useState(false);
  const [userIsLogged, setUserIsLogged] = useState(false);

  useEffect(() => {
    const loadedUsers = JSON.parse(localStorage.getItem("users")) || [];
    setUsers(loadedUsers);
  }, []);

  useEffect(() => {
    if (users == false) {
      return;
    }
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  // const loadUsers = () => {
  //   setUsers(JSON.parse(localStorage.getItem("users")));
  // };

  const setLogged = (logged) => {
    //change name of set logged
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
      //change to !users or check if users empty
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
    // let updatedArr = users.map((temp) =>
    //   {if (users.find(user)) {
    //     users.splice(users.find(user), 1)
    //   }}
    // )
    // setUsers(updatedArr)
    let tempUser = users.find((temp) => user.email == temp.email);

    if (tempUser) {
      users.splice(tempUser, 1);
      setUsers(users);
      localStorage.setItem("users", JSON.stringify(users));
    } else {
      console.log("user not found");
    }
  };

  const editUser = (user) => {
    let updatedArr = users.map((temp) => {
      if (temp.email == user.email) {
        temp = user;
      }
    });
    setUsers(updatedArr);
  };

  return (
    <>
      <Register usersProp={users} sendNewUser={setNewUser} />
      <Login2 usersProp={users} sendLogged={setLogged} />
      {pleaseConnect} {/*maybe put this line in the profile app itself */}
      {userIsLogged && <Profile sendHide={hideProfile} />}
      {adminIsLogged && (
        <SystemAdmin
          users={users}
          sendHide={hideProfile}
          sendDeleteUser={deleteUser}
          sendUpdateUser={editUser}
        />
      )}
    </>
  );
}

export default App;
