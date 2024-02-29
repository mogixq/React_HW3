import { useState } from "react";

export default function Register() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    passwordVer: "",
    picture: "",
    firstname: "",
    lastname: "",
    email: "",
    date: "",
    city: "",
    street: "",
    number: "",
    errors: {},
  });

  //updating the state with the inputs 
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };
  
  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      // Form is valid, call registerUser
      console.log(formData);
      registerUser()

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

    if (!formData.passwordVer) {
      errors.passwordVer = "Password verification is required";
    }

    // // if (!formData.picture) {
    // //   errors.picture = "picture is required";
    // // }

    // if (!formData.firstname) {
    //   errors.firstname = "Firstname is required";
    // }

    // if (!formData.lastname) {
    //   errors.lastname = "Lastname is required";
    // }
    
    // if (!formData.email) {
    //   errors.email = "Email is required";
    // }

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

  const registerUser = () => {
    console.log("Reg");
    let users = localStorage.getItem(users);



    localStorage.setItem(key, value);
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
        <label htmlFor="passwordVer">Verify password: *</label>
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
        <input type="text" name="firstname" id="firstname" />
        <br />
        <label htmlFor="lastname">Last Name: </label>
        <input type="text" name="lastname" id="lastname" />
        <br />
        <label htmlFor="email">Email: </label>
        <input type="email" name="email" id="email" />
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
