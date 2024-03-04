import { useEffect, useState } from "react";
import EditDetails from "./EditDetails";

export default function Profile(props) {
  const [user, setUser] = useState("");
  const [editVisible, setEditVisible] = useState(false);
  useEffect(() => {
    showUserInfo();
  }, []);

  const showUserInfo = () => {
    setUser(JSON.parse(sessionStorage.getItem("loggedUser")));
  };

  const handleLogout = () => {
    logoutUser(user.email);
  };

  const logoutUser = (email) => {
    let userToVerify = JSON.parse(sessionStorage.getItem("loggedUser"));
    if (userToVerify.email == email) {
      console.log("Logging out");
      sessionStorage.removeItem("loggedUser");
      props.sendHide();
    } else {
      console.log("email diff");
    }
  };

  const showEdit = () => {
    if (editVisible) {
      setEditVisible(false);
      return;
    }
    setEditVisible(true);
  };

  return (
    <div
      style={{
        border: "solid black 2px",
        margin: 10,
        padding: 10,
      }}
    >
      Profile <br />
      <h3>
        {user.firstname} {user.lastname}
      </h3>
      <span>{user.email}</span>
      <br />
      <span>{user.street}</span>
      <br />
      <span>{user.date}</span>
      <br />
      <button onClick={showEdit}>Edit Details</button>
      <button>Game</button>
      <button onClick={handleLogout}>Logout</button> <br />
      {editVisible && <EditDetails />}
    </div>
  );
}
