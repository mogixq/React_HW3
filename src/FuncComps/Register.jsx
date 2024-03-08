import * as React from 'react';
import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { MuiTelInput } from 'mui-tel-input'
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export default function Register(props) {
  const [users, setUsers] = useState({}); //maybe del
  const [formData, setFormData] = useState({
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
    number: "",
    errors: {}, //dont send to localstorage!
  });
  const [value, setValue] = useState('')

  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });

  //updating the state with the inputs
  const handleChange = (event) => {
    const { name ,value } = event.target;
    setUsers((prevState) => ({ ...prevState, [name]: value }));
  };

  const numberChange = (newValue) => {
    setValue(newValue)
  }

  //can be called registerUser and the logic put in the if instead
  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      // Form is valid, call registerUser
      console.log(formData);
      registerUser();
    } else {
      // Form is invalid, do nothing
    }
  };

  //updates the state with errors if they exist
  const validateForm = () => {
    const errors = {};

    if (!formData.username) {
      errors.username = "Username is required";
    }

    if (!formData.password) {
      errors.password = "Password is required";
    }

    // if (!formData.passwordVer) {
    //   errors.passwordVer = "Password verification is required";
    // }

    // // if (!formData.picture) {
    // //   errors.picture = "picture is required";
    // // }

    if (!formData.firstname) {
      errors.firstname = "Firstname is required";
    }

    if (!formData.lastname) {
      errors.lastname = "Lastname is required";
    }

    if (!formData.email) {
      errors.email = "Email is required";
    }

    // if (!formData.date) {
    //   errors.date = "Date is required";
    // }

    // if (!formData.city) {
    //   errors.city = "City is required";
    // }

    // if (!formData.street) {
    //   errors.street = "Street is required";
    // }

    // if (!formData.number) {
    //   errors.number = "Phone number is required";
    // }

    setFormData((prevState) => ({ ...prevState, errors }));

    // return true if there are no errors
    return Object.keys(errors).length === 0;
  };

  //add the user to the users in localstorage
  const registerUser = () => {
    //TO ADD :check if local storage is null otherwise no spread operator
    if (props.usersProp == null) {
      localStorage.setItem("users", JSON.stringify([formData]));
      return;
    }
    let usersNew = [...props.usersProp, formData];
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
      <form onSubmit={handleSubmit}>
        <TextField
          required
          id="standard-required"
          label="Username"
          variant="standard"
        />
        <br />
        <TextField
          required
          id="standard-required"
          label="Password"
          variant="standard"
        />
        <br />
        <TextField
          required
          id="standard-required"
          label="Verify Password"
          variant="standard"
        />
        <br /><br />
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
          id="standard-required"
          label="First Name"
          variant="standard"
        />
        <br />
        <TextField
          required
          id="standard-required"
          label="Last Name"
          variant="standard"
        />
        <br />
        <TextField
          required
          id="standard-required"
          label="Email"
          variant="standard"
        />
        <br />
        {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker />
        </LocalizationProvider> */}
        <br />
        <TextField
          required
          id="standard-required"
          label="City"
          variant="standard"
        />
        <br />
        <TextField
          required
          id="standard-required"
          label="Street"
          variant="standard"
        />
        <br />
        <MuiTelInput value={value} onChange={numberChange} />
        <label htmlFor="username">Username: *</label>
        <input
          type="text"
          name="username"
          id="username"
          value={formData.username}
          onChange={handleChange}
        />
        <br />
        <label htmlFor="password">Password: *</label>
        <input
          type="password"
          name="password"
          id="password"
          value={formData.password}
          onChange={handleChange}
        />
        <br />
        <label htmlFor="passwordVer">Verify password: </label>
        <input
          type="password"
          name="passwordVer"
          id="passwordVer"
          value={formData.passwordVer}
          onChange={handleChange}
        />
        <br />
        <label htmlFor="picture">Picture: </label>
        <input type="file" name="picture" id="picture" />
        <br />
        <label htmlFor="firstname">First Name: </label>
        <input
          type="text"
          name="firstname"
          id="firstname"
          value={formData.firstname}
          onChange={handleChange}
        />
        <br />
        <label htmlFor="lastname">Last Name: </label>
        <input
          type="text"
          name="lastname"
          id="lastname"
          value={formData.lastname}
          onChange={handleChange}
        />
        <br />
        <label htmlFor="email">Email: </label>
        <input
          type="email"
          name="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
        />
        <br />
        <label htmlFor="date">Date of birth:</label>
        <input type="date" name="date" id="date" />
        <br />
        <label htmlFor="city">City: </label>
        <input type="text" name="city" id="city" />
        <br />
        <label htmlFor="street">Street: </label>
        <input type="text" name="street" id="street" />
        <br />
        <label htmlFor="number">Phone number: </label>
        <input type="number" name="number" id="number" />
        <br />
      </form>
      <input type="submit" value="Submit" onClick={handleSubmit} />
    </div>
  );
}
