import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import { USER_DATA } from "../../static-data/dummyUser";
// import "./login.css";
const Login = () => { 
  const navigateTo = useNavigate();
  const { setAuthStatus } = useContext(AuthContext);

  const [password, setPassword] = useState("1234567");
  const [email, setEmail] = useState("ali@test.com");
  const [error, setError] = useState("");

  const login = (e) => {
    e.preventDefault();
    setError("");

    // check credentials
    if (email === USER_DATA.email && password === USER_DATA.password) {
      // set authenticated user
      setAuthStatus(USER_DATA.name, true);

      navigateTo("/");
    } else {
      setError("Please enter valid information!");
    }
  };

  return (
    <div className="center">
      <h1>Login</h1>
      <form noValidate onSubmit={login}>
        <div className="txt_field">
          <label>Email: </label>
          <input
            type="email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
        </div>
        <br />
        <div className="txt_field">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
        </div>
        {error && (
          <>
            <br />
            {error}
          </>
        )}
        <br />
        <button type="submit" className="submitt" onClick={login}>
          Log in
        </button>
      </form>
    </div>
  );
};

export default Login;
