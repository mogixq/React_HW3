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
  const [user, setUser] = useState({
    username: "",
    password: "",
    passwordVer: "", //also not needed in localstorage
    picture: "",
    firstname: "",
    lastname: "",
    email: "",
    date: "",
    city: "",
    street: "",
    phone: "",
  });
  const [value, setValue] = useState("");
  const [errorState, setErrorState] = useState({ state: false });

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
    console.log(event);
    const { id, value } = event.target;
    if (!value) {
      setErrorState({
        ...errorState,
        state: true,
        [id]: "This field is required",
      }); // Update error message
      return;
    }
    // Check for English characters only
    if (
      id == "username" &&
      !value.match(/^[a-zA-Z\s\d\-\_!@#$%^&*()+\=\[\]{};':",./<>?]*$/)
    ) {
      setErrorState({
        ...errorState,
        state: true,
        [id]: "Please enter text in English only.",
      });
      return;
    }
    if (id == "username" && value.length > 60) {
      setErrorState({
        ...errorState,
        state: true,
        [id]: "Please enter less than 60 characters.",
      });
      return;
    }

    setErrorState({ ...errorState, state: false, [id]: "" });
    setUser((prevState) => ({ ...prevState, [id]: value }));
    console.log(errorState);
    console.log(user);
  };

  const numberChange = (newValue) => {
    setValue(newValue);
    handleChange({ target: { id: "phone", value: newValue } });
  };

  const dateChange = (newValue) => {
    handleChange({ target: { id: "date", value: newValue } });
  };

  const fileChange = (target) => {
    //console.log('Selected files:', target.files);
    const { id, files } = target;

    const allowedTypes = ["image/jpeg", "image/jpg"];

    if (allowedTypes.includes(files[0].type)) {
      handleChange({ target: { id: id, value: files[0] } });
    } else {
      console.log("wrong file");
      //handle exception
    }
  };

  //can be called registerUser and the logic put in the if instead
  const handleSubmit = (event) => {
    event.preventDefault();
    let errors = { state: false };
    for (let field in user) {
      if (!user[field]) {
        errors = { ...errors, state: true, [field]: "This field is required" };
      }
    }
    setErrorState(errors);
    console.log(errorState);
    // if (!user.username) {
    //   setErrorState( (prev) =>  prev = {...errorState, state : true, "username" : "This field is required" })
    // }
    // if (!user.password) {
    //   setErrorState((prev) =>  prev = {...errorState, state : true, "password" : "This field is required" })
    // }
    if (!errorState.state) {
      registerUser();
    }
  };

  const registerUser = () => {
    let sameUser = props.usersProp.find((temp) => temp.email == user.email);
    if (sameUser) {
      return;
    }
    props.sendNewUser(user);
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
          error={errorState.username} // Display error if message exists
          helperText={errorState.username}
          id="username"
          label="Username"
          variant="standard"
          onChange={handleChange}
        />
        <br />
        <TextField
          required
          error={errorState.password} // Display error if message exists
          helperText={errorState.password}
          id="password"
          label="Password"
          variant="standard"
          onChange={handleChange}
        />
        <br />
        <TextField
          required
          error={errorState.passwordVer} // Display error if message exists
          helperText={errorState.passwordVer}
          id="passwordVer"
          label="Verify Password"
          variant="standard"
          onChange={handleChange}
        />
        <br />
        <br />
        <Button
          id="picture"
          component="label"
          role={undefined}
          variant="contained"
          tabIndex={-1}
          startIcon={<CloudUploadIcon />}
        >
          Upload Picture
          <VisuallyHiddenInput
            id="picture"
            type="file"
            accept=".jpg,.jpeg"
            onChange={(event) => fileChange(event.target)}
          />
        </Button>
        <br />
        <TextField
          required
          error={errorState.firstname} // Display error if message exists
          helperText={errorState.firstname}
          id="firstname"
          label="First Name"
          variant="standard"
          onChange={handleChange}
        />
        <br />
        <TextField
          required
          error={errorState.lastname} // Display error if message exists
          helperText={errorState.lastname}
          id="lastname"
          label="Last Name"
          variant="standard"
          onChange={handleChange}
        />
        <br />
        <TextField
          required
          error={errorState.email} // Display error if message exists
          helperText={errorState.email}
          id="email"
          label="Email"
          variant="standard"
          onChange={handleChange}
        />
        <br />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            id="date"
            onChange={dateChange}
            error={errorState.date} // Display error if message exists
            helperText={errorState.date}
          />
        </LocalizationProvider>
        <br />
        <TextField
          required
          error={errorState.city} // Display error if message exists
          helperText={errorState.city}
          id="city"
          label="City"
          variant="standard"
          onChange={handleChange}
        />
        <br />
        <TextField
          required
          error={errorState.street} // Display error if message exists
          helperText={errorState.street}
          id="street"
          label="Street"
          variant="standard"
          onChange={handleChange}
        />
        <br />
        <MuiTelInput
          error={errorState.phone} // Display error if message exists
          helperText={errorState.phone}
          value={value}
          id="phone"
          onChange={numberChange}
        />
        <br />
        <button type="submit" disabled={errorState.state}>
          Submit
        </button>
      </Box>
    </div>
  );
}
