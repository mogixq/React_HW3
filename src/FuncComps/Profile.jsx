import { useEffect, useState } from "react";
import EditDetails from "./EditDetails";
import Avatar from "@mui/material/Avatar";

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
      sessionStorage.clear()
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

  const userToEdit = (user) => {
    props.sendUpdateUser(user);
    showEdit()
  };

  return (
    <div
      style={{
        border: "solid #1E90FF 2px",
        margin: 10,
        padding: 10,
        borderRadius: 10,
      }}
    >
      Profile <br />
      <Avatar alt="ALA" src={user.picture}/>
      <h3>
        {user.firstname} {user.lastname}
      </h3>
      <span>{user.email}</span>
      <br />
      <span>{user.street}</span>
      <br />
      <span>{user.date}</span>
      <br />
      <button className="btn btn-secondary" onClick={showEdit}>
        Edit Details
      </button>
      <button>
        <a href="https://oldschool.runescape.com/">Game</a>
      </button>
      <button className="btn btn-danger" onClick={handleLogout}>
        Logout
      </button>{" "}
      <br />
      {editVisible && <EditDetails userToEdit={userToEdit} user={user} closeMe={showEdit}/>}
    </div>
  );
}
