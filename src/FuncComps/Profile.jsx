import { useEffect, useState } from "react";

export default function Profile(props) {
  const [user, setUser] = useState('');

  useEffect(() => {
    showUserInfo();
  }, []);

  const showUserInfo = () => {
    setUser(JSON.parse(sessionStorage.getItem("loggedUser")));
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
      <h3>{user.username}</h3>

      <span>temp email</span>
      <br />
      <span>temp street</span>
      <br />
      <span>temp dob</span>
      <br />
      <button>Edit Details</button>
      <button>Game</button>
      <button>Logout</button>
    </div>
  );
}
