import * as React from "react";
import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { MuiTelInput } from "mui-tel-input";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export default function Register(props) {
  const [user, setUser] = useState({}); //maybe del
  const [value, setValue] = useState("");
  const [errorState, setErrorState] = useState({ state : false});

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  //updating the state with the inputs
  const handleChange = (event) => {
    const { id, value } = event.target;
    if (!value) {
      setErrorState({ ...errorState, [id]: "This field is required" }); // Update error message
      return;
    } else {
      setErrorState({ ...errorState, [id]: "" }); // Clear error message
    }
    setUser((prevState) => ({ ...prevState, [id]: value }));
  };

  const numberChange = (newValue) => {
    setValue(newValue);
    handleChange({ target: { name: "phone", value: newValue } });
  };

  //can be called registerUser and the logic put in the if instead
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!user.username) {
      setErrorState({ ...errorState, [id]: "This field is required" })
      setErrorState({...errorState, [state]: true })
    }
    else if (true) {
      registerUser();
    } else {
      // Form is invalid, do nothing
    }
  };

  //add the user to the user in localstorage
  const registerUser = () => {
    //TO ADD :check if local storage is null otherwise no spread operator
    if (props.usersProp == null) {
      localStorage.setItem("users", JSON.stringify([user]));
      return;
    }
    let usersNew = [...props.usersProp, user];
    localStorage.setItem("users", JSON.stringify(usersNew));
    //needs to be sent to parent!!!!!!!!!!!!!!!!!@@#!#!@#@!#@!
  };

  //{'\u00A0'} spacer like &nbsp
  return (
    <div
      style={{
        border: "solid black 2px",
        margin: 10,
        padding: 10,
      }}
    >
      Register <br />
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <TextField
          required
          //error={errorState}
          error={!!errorState.username} // Display error if message exists
          helperText={errorState.username}
          id="username"
          label="Username"
          variant="standard"
          onChange={handleChange}
        />
        <br />
        <TextField
          required
          id="password"
          label="Password"
          variant="standard"
          onChange={handleChange}
        />
        <br />
        <TextField
          required
          id="passwordVer"
          label="Verify Password"
          variant="standard"
          onChange={handleChange}
        />
        <br />
        <br />
        <Button
          component="label"
          role={undefined}
          variant="contained"
          tabIndex={-1}
          startIcon={<CloudUploadIcon />}
        >
          Upload Picture
          <VisuallyHiddenInput type="file" />
        </Button>
        <br />
        <TextField
          required
          id="firstname"
          label="First Name"
          variant="standard"
          onChange={handleChange}
        />
        <br />
        <TextField
          required
          id="lastname"
          label="Last Name"
          variant="standard"
          onChange={handleChange}
        />
        <br />
        <TextField
          required
          id="email"
          label="Email"
          variant="standard"
          onChange={handleChange}
        />
        <br />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker />
        </LocalizationProvider>
        <br />
        <TextField
          required
          id="city"
          label="City"
          variant="standard"
          onChange={handleChange}
        />
        <br />
        <TextField
          required
          id="street"
          label="Street"
          variant="standard"
          onChange={handleChange}
        />
        <br />
        <MuiTelInput value={value} id="phone" onChange={numberChange} />
        <br />
        <button type="submit" disabled={errorState.state}>
          Submit
        </button>
      </Box>
    </div>
  );
}
