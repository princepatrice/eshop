import React, { useState } from "react";
import './style.css'; // Create a CSS file for styling
import { useHistory } from "react-router-dom";
import { loginRequest } from "helpers/QueryMaker";
import { login } from "redux/slices/userSlice";
import { useDispatch } from "react-redux";

const LoginPage = () => {
  const history = useHistory();
  const dispatch = useDispatch()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    const loginAction = (response) => {
      console.log(response)
      if (response.status) {
        dispatch(login(response.data))
        history.push("/admin/dashboard");
      } else {
        alert("Invalid credentials. Please try again.");
      }

    }
    loginRequest({ email: email, password: password }, loginAction)
  
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
};

export default LoginPage;
