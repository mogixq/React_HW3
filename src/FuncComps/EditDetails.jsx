import { useState } from "react"

export default function EditDetails(props) {
  const [user, setUser] = useState(props.user)
  
  const updateForm = (event) => {
    const { name, value } = event.target;
    console.log(name+" aa "+value);
    setUser({...user, [name] : value})
  }

  const handleSubmit = () => {
    props.userToEdit(user);
  }

  return (
    <div
      style={{
        border: "solid black 2px",
        margin: 10,
        padding: 10,
      }}
    >
      Register <br />
      <form onSubmit={updateForm}>
        <label htmlFor="username">Username: *</label>
        <input
          type="text"
          name="username"
          id="username"
          //value={formData.username}
          onChange={updateForm}
        />
        <br />
        <label htmlFor="password">Password: *</label>
        <input
          type="password"
          name="password"
          id="password"
          //value={formData.password}
          onChange={updateForm}
        />
        <br />
        <label htmlFor="passwordVer">Verify password: </label>
        <input
          type="password"
          name="passwordVer"
          id="passwordVer"
          //value={formData.passwordVer}
          onChange={updateForm}
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
          //value={formData.firstname}
          onChange={updateForm}
        />
        <br />
        <label htmlFor="lastname">Last Name: </label>
        <input
          type="text"
          name="lastname"
          id="lastname"
          //value={formData.lastname}
          onChange={updateForm}
        />
        <br />
        <label htmlFor="email">Email: </label>
        <input
          type="email"
          name="email"
          id="email"
          //value={formData.email}
          onChange={updateForm}
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
  )
}
