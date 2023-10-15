import React, { useState } from "react";
import './style.css'; // Create a CSS file for 
import { useHistory } from "react-router-dom";
import { loginRequest } from "helpers/QueryMaker";
import { login } from "redux/slices/userSlice";
import { useDispatch } from "react-redux";
import { NavLink } from "react-bootstrap";
import { useToasts  } from 'react-toast-notifications';

const LoginPage = () => {
  const { addToast } = useToasts();
  const history = useHistory();
  const dispatch = useDispatch()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    const loginAction = (response) => {
      if (response.status) {
        dispatch(login(response.data))
        history.push("/admin/dashboard");
      } else {
        addToast("Invalid credentials. Please try again.", { appearance: 'error' });
      }

    }
    loginRequest({ email: email, password: password }, loginAction)
  
  };
  return (
    <section class="vh-100">
      <div class="container-fluid h-custom">
        <div class="row d-flex justify-content-center align-items-center h-100">
          <div class="col-md-9 col-lg-6 col-xl-5" >
            <img src="
            https://i.pinimg.com/originals/07/c1/97/07c1979b2febb58fa987ab0f66f440d0.jpg"
              class="img-fluid" alt="Sample image" />
          </div>
          <div class="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
            <div class="col-12 my-5">
              <img src="
          https://s7d2.scene7.com/is/image/Caterpillar/CM20220222-5c3c2-280a8?fmt=png-alpha"
                class="img-fluid" alt="Sample image" />
            </div>

            
            <form className="mt-2">

              <div class="form-outline mb-2">
                
              <label class="form-label" for="form3Example3">Email address</label>
                <input type="email" id="form3Example3"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                class="form-control form-control-lg"
                  placeholder="Enter a valid email address" />
              </div>

              <div class="form-outline mb-2">
                
              <label class="form-label" for="form3Example4">Password</label>
                <input type="password" id="form3Example4" 
                     value={password}
                     onChange={(e) => setPassword(e.target.value)}
                class="form-control form-control-lg"
                  placeholder="Enter password" />
              </div>

              
              <div class="text-center text-lg-start mt-4 pt-2">
                <button type="button" class="btn btn-primary btn-lg" onClick={handleLogin}
                  style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}>Login</button>
                <p class="small fw-bold mt-2 pt-1 mb-0">Don't have an account? <NavLink href="/register"
                  class="link-danger">Register</NavLink></p>
              </div>

            </form>
          </div>
        </div>
      </div>

    </section>
  );
};

export default LoginPage;
