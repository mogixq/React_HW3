export default function Login() {

  
  return (
    <div style={{
        border:"solid black 2px",
        margin:10,
        padding:10
    }}>
      Login <br />
      <label htmlFor="usernameLogin">Username: </label>
      <input type="text" name="usernameLogin" id="usernameLogin" />
      <br />
      <label htmlFor="passwordLogin">Password: </label>
      <input type="password" name="passwordLogin" id="passwordLogin" />
      <br />
      
    </div>
  );
}
