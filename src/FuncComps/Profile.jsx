import { useEffect, useState } from "react";
import EditDetails from "./EditDetails";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import EmailIcon from '@mui/icons-material/Email';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import CakeIcon from '@mui/icons-material/Cake';

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

  //logs the user out and ensures email parity , handling session storage clearing
  const logoutUser = (email) => {
    let userToVerify = JSON.parse(sessionStorage.getItem("loggedUser"));
    if (userToVerify.email == email) {
      console.log("Logging out");
      sessionStorage.clear();
      props.sendHide();
    } else {
      console.log("email diff");
    }
  };

  //handles showing the edit user details component
  const showEdit = () => {
    if (editVisible) {
      setEditVisible(false);
      return;
    }
    setEditVisible(true);
  };

  //sends the user to edit with updated fields to app, making sure one source of truth is kept 
  const userToEdit = (user) => {
    props.sendUpdateUser(user);
    showEdit();
  };

  const UserCardContainer = styled("div")({
    border: "solid #1E90FF 2px",
    margin: 10,
    padding: 10,
    borderRadius: 10,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#F5F5F5", // Subtle background color
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)", // Subtle shadow for depth
  });

  const UserInfoContainer = styled("div")({
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start", // Left-align user info
    marginLeft: 10, // Space between avatar and user info
  });

  const UserName = styled(Typography)({
    fontWeight: "bold",
    fontSize: 18, // Adjust font size as needed
  });

  const UserEmail = styled(Typography)({
    color: "#666", // Muted color for email
    fontSize: 14, // Adjust font size as needed
  });

  const UserAddress = styled(Typography)({
    color: "#333", // Clearer color for address
    fontSize: 14, // Adjust font size as needed
  });

  const UserActions = styled("div")({
    display: "flex",
    justifyContent: "space-between", // Distribute buttons horizontally
    marginTop: 10, // Space between user info and buttons
  });

  const StyledButton = styled(Button)(({ theme }) => ({
    // Inherit MUI button styles
    ...theme.typography.button,
    fontSize: 14, // Adjust font size as needed
    borderRadius: 5, // Rounded corners for buttons
    marginLeft: 5, // Space between buttons
  }));

  const UserDate = styled(Typography)({
    color: "#999", // Slightly lighter color for date
    fontSize: 12, // Adjust font size as needed
    marginBottom: 5, // Small margin after date
  });

  return (
    <UserCardContainer>
      <Avatar alt="Profile" src={user.picture} />
      <UserInfoContainer>
        <UserName>
          {user.firstname} {user.lastname}
        </UserName>
        <UserEmail><EmailIcon fontSize="small"/> {'\u00A0'} {user.email}</UserEmail>
        <UserAddress><MyLocationIcon fontSize="small"/> {'\u00A0'} {user.street+" , "+ user.city}</UserAddress>
        <UserDate><CakeIcon fontSize="small"/> {'\u00A0'} {user.date}</UserDate>  {/* Added UserDate component */}
      </UserInfoContainer>
      <UserActions>
        <StyledButton variant="contained" color="primary" onClick={showEdit}>
          Edit Details
        </StyledButton>
        <StyledButton
          variant="outlined"
          href="https://oldschool.runescape.com/"
        >
          Game
        </StyledButton>
        <StyledButton variant="contained" color="error" onClick={handleLogout}>
          Logout
        </StyledButton>
      </UserActions>
      {editVisible && (
        <EditDetails userToEdit={userToEdit} user={user} closeMe={showEdit} />
      )}
    </UserCardContainer>
  );
}
