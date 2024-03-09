import { useEffect, useState } from "react";
import "./App.css";
import Register from "./FuncComps/Register";
import Login from "./FuncComps/Login";
import Profile from "./FuncComps/Profile";
import SystemAdmin from "./FuncComps/SystemAdmin";

function App() {
  // State variables
  const [users, setUsers] = useState(false); // Stores array of user objects
  const [pleaseConnect, setPleaseConnect] = useState("Please Log in"); // Display login prompt
  const [adminIsLogged, setAdminIsLogged] = useState(false); // Track admin login status
  const [userIsLogged, setUserIsLogged] = useState(false); // Track user login status

  // Fetch users from local storage on component mount
  useEffect(() => {
    const loadedUsers = JSON.parse(localStorage.getItem("users")) || [];
    setUsers(loadedUsers);
    sessionStorage.clear();
  }, []);

  // Save updated users to local storage
  useEffect(() => {
    if (users === false) {
      return;
    }
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  // Handle login status updates
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

  // Add a new user to the users array
  const setNewUser = (newUser) => {
    console.log("newUser in setNewUser ", newUser);
    if (users == null) {
      setUsers([newUser]);
      return;
    }
    let usersNew = [...users, newUser];
    setUsers(usersNew);
  };

  // Reset login states and display login prompt
  const hideProfile = () => {
    setUserIsLogged(false);
    setAdminIsLogged(false);
    setPleaseConnect("Please Log in");
  };

  // Remove a user from the users array
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

  // Update an existing user in the users array
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

  // Render components based on login status
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
