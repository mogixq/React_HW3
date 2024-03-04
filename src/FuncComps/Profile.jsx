import { useEffect, useState } from "react";

export default function Profile(props) {
  const [user, setUser] = useState('');

  useEffect(() => {
    showUserInfo();
  }, []);

  const showUserInfo = () => {
    setUser(JSON.parse(sessionStorage.getItem("loggedUser")));
  };

  const handleLogout = () => {
    logoutUser(user.email);
  };

  const logoutUser = (email)=>{
    let userToVerify = JSON.parse(sessionStorage.getItem("loggedUser"));
    if (userToVerify.email == email) {
      console.log('Logging out');
      sessionStorage.removeItem("loggedUser");
      props.sendHide();
    }else{
      console.log('email diff');
    }
  }

  return (
    <div
      style={{
        border: "solid black 2px",
        margin: 10,
        padding: 10,
      }}
    >
      Profile <br />
      <h3>{user.firstname} {user.lastname}</h3>

      <span>{user.email}</span>
      <br />
      <span>{user.street}</span>
      <br />
      <span>{user.date}</span>
      <br />
      <button>Edit Details</button> 
      <button>Game</button>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
