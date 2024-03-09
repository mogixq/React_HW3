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
import Typography from "@mui/material/Typography";
import Autocomplete from "@mui/material/Autocomplete";
import Avatar from "@mui/material/Avatar";

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

  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  };

  function isDateValid(dateString) {
    // Check if the input is a valid date string
    if (!dateString || !Date.parse(dateString)) {
      return false;
    }

    const today = new Date();
    const eighteenYearsAgo = new Date(
      today.getFullYear() - 18,
      today.getMonth(),
      today.getDate()
    );
    const oneHundredTwentyYearsAgo = new Date(
      today.getFullYear() - 120,
      today.getMonth(),
      today.getDate()
    );

    // Convert the input date to a Date object
    const inputDate = new Date(dateString);
    // Check if the input date is between the two valid ranges
    return inputDate < eighteenYearsAgo && inputDate > oneHundredTwentyYearsAgo;
  }

  //updating the state with the inputs
  const handleChange = (event) => {
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
      !value.match(
        /^[a-zA-Z\s\d-._!"`'#%&,:;<>=@{}~\$\(\)\*\+\/\\\?\[\]\^\|]*$/
      )
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
    if (
      id == "password" &&
      !value.match(
        /^(?=.*\d)(?=.*[A-Z])(?=.*[-._!"`'#%&,:;<>=@{}~\$\(\)\*\+\/\\\?\[\]\^\|])[A-Za-z\d-._!"`'#%&,:;<>=@{}~\$\(\)\*\+\/\\\?\[\]\^\|]+$/
      )
    ) {
      setErrorState({
        ...errorState,
        state: true,
        [id]: "Please enter at least one special character, one uppercase letter, and a number.",
      });
      return;
    }
    if (id == "password" && (7 > value.length || value.length > 12)) {
      setErrorState({
        ...errorState,
        state: true,
        [id]: "Please enter password length between 7 and 12 characters.",
      });
      return;
    }
    if (id == "passwordVer" && value != user.password) {
      setErrorState({
        ...errorState,
        state: true,
        [id]: "Password and password verification must match.",
      });
      return;
    }
    if (
      (id == "firstname" || id == "lastname") &&
      !value.match(/^[a-zA-Z]+$/)
    ) {
      setErrorState({
        ...errorState,
        state: true,
        [id]: "Please enter only letters.",
      });
      return;
    }
    if (
      id == "email" &&
      !value.match(
        /^[a-zA-Z-._!"`'#%&,:;<>=@{}~\$\(\)\*\+\/\\\?\[\]\^\|]+@[a-zA-Z-._!"`'#%&,:;<>=@{}~\$\(\)\*\+\/\\\?\[\]\^\|]+.com$/
      )
    ) {
      setErrorState({
        ...errorState,
        state: true,
        [id]: "Please enter email with only letters and special characters, and with .com at the end.",
      });
      return;
    }
    if (id == "city" && !cities.find((city) => city.label == value)) {
      setErrorState({
        ...errorState,
        state: true,
        [id]: "Enter the correct name of the city.",
      });
      return;
    }
    if (id == "street" && !value.match(/^[\u0590-\u05FF\u200E\u200F ]+$/)) {
      setErrorState({
        ...errorState,
        state: true,
        [id]: "Enter only hebrew letters.",
      });
      return;
    }
    if (id == "picture") {
      setErrorState({ ...errorState, state: false, [id]: "" });
      getBase64(value).then((base64) => {
        setUser((prevState) => ({ ...prevState, [id]: base64 }));
      });
      return;
    }
    setErrorState({ ...errorState, state: false, [id]: "" });
    setUser((prevState) => ({ ...prevState, [id]: value }));
    console.log(user);
  };

  const numberChange = (newValue) => {
    setValue(newValue);
    handleChange({ target: { id: "phone", value: newValue } });
  };

  const dateChange = (newValue) => {
    if (isDateValid(newValue.$d)) {
      let date = new Date(newValue.$d).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        separator: "/",
      })
      handleChange({ target: { id: "date", value: date } });
    } else {
      setErrorState({
        ...errorState,
        state: true,
        ["date"]: "Please enter non fictional date",
      });
    }
  };

  const fileChange = (target) => {
    //console.log('Selected files:', target.files);
    const { id, files } = target;

    const allowedTypes = ["image/jpeg", "image/jpg"];

    if (allowedTypes.includes(files[0].type)) {
      handleChange({ target: { id: id, value: files[0] } });
    } else {
      setErrorState({
        ...errorState,
        state: true,
        [id]: "Please enter file of the following format: .jpeg, .jpg",
      });
      console.log(errorState);
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
    setErrorState((prev) => prev = errors);
    console.log(errorState);
    // if (!user.username) {
    //   setErrorState( (prev) =>  prev = {...errorState, state : true, "username" : "This field is required" })
    // }
    // if (!user.password) {
    //   setErrorState((prev) =>  prev = {...errorState, state : true, "password" : "This field is required" })
    // }
    if (!errors.state) {
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

  const buttonStyles = {
    backgroundColor: errorState.picture ? "red" : "primary.main",
  };

  const cities = [
    { label: "Tel Aviv" },
    { label: "Netanya" },
    { label: "Haifa" },
    { label: "Holon" },
    { label: "Yaffo" },
    { label: "Kfar Yona" },
    { label: "Hadera" },
    { label: "Afula" },
    { label: "Petah Tikva" },
    { label: "Jerusalem" },
  ];

  const handleTagChange = (event) => {
    console.log(event.target);
    const { id, innerText } = event.target;
    handleChange({ target: { id: "city", value: innerText } });
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
          error={!!errorState.password} // Display error if message exists
          helperText={errorState.password}
          type="password"
          id="password"
          label="Password"
          variant="standard"
          onChange={handleChange}
        />
        <br />
        <TextField
          required
          error={!!errorState.passwordVer} // Display error if message exists
          helperText={errorState.passwordVer}
          type="password"
          id="passwordVer"
          label="Verify Password"
          variant="standard"
          onChange={handleChange}
        />
        <br />
        <br />
        <div>
          <Button
            id="picture"
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={user.picture ? <Avatar alt="Profile" src={user.picture} /> :  <CloudUploadIcon />}
            sx={buttonStyles}
          >
            Upload Picture
            <VisuallyHiddenInput
              id="picture"
              type="file"
              accept=".jpg,.jpeg"
              onChange={(event) => fileChange(event.target)}
            />
          </Button>
        </div>
        {errorState.picture && (
          <Typography color="error">{errorState.picture}</Typography>
        )}
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
          error={!!errorState.email} // Display error if message exists
          helperText={errorState.email}
          id="email"
          label="Email"
          variant="standard"
          onChange={handleChange}
        />
        <br />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker id="date" onChange={dateChange} />
          {!!errorState.date && (
            <Typography color="error">{errorState.date}</Typography>
          )}
        </LocalizationProvider>
        <br />
        {/* <TextField
          required
          error={errorState.city} // Display error if message exists
          helperText={errorState.city}
          id="city"
          label="City"
          variant="standard"
          onChange={handleChange}
        /> */}

        <Autocomplete
          options={cities}
          id="city"
          // includeInputInList
          open={
            !!errorState.city && !cities.find((city) => city.label == user.city)
          }
          onChange={handleTagChange}
          onKeyDown={handleTagChange}
          onInputChange={handleChange}
          // error={errorState.city} // Display error if message exists
          // helpertext={errorState.city}
          renderInput={(params) => (
            <TextField {...params} label="City" variant="standard" />
          )}
        />
        {errorState.city && (
          <Typography color="error">{errorState.city}</Typography>
        )}
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
