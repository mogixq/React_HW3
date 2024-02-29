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
  }); 
  
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
  };
  const registerUser = () => {};

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
      <label htmlFor="username">Username: </label>
      <input
        type="text"
        name="username"
        id="username"
        value={formData.username}
        onChange={handleChange}

      />
      <br />
      <label htmlFor="password">Password: </label>
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
      <input type="number" name="number" id="number" /><br />
      </form>
      <input type="submit" value="Submit" onClick={handleSubmit}/>
    </div>
  );
}
