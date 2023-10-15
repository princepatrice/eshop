import React, { useState } from "react";
import './style.css'; // Create a CSS file for 
import { useHistory } from "react-router-dom";
import { login } from "redux/slices/userSlice";
import { useDispatch } from "react-redux";
import { NavLink } from "react-bootstrap";
import { registerRequest } from "helpers/QueryMaker";
import { useToasts  } from 'react-toast-notifications';

const RegisterPage = () => {
  const history = useHistory();
  const dispatch = useDispatch()
  const [credentails, setCredentials] = useState({ email: "", password: "", first_name: "", last_name: "" });
  const { addToast } = useToasts();

  const handleRegister = () => {
    const registerAction = (response) => {
      if (response.status) {
        dispatch(login(response.data))
        history.push("/admin/dashboard");
      } else {
        addToast("Invalid credentials. Account Already Exists.", { appearance: 'error' });
      }

    }
    registerRequest(credentails, registerAction)

  };
  return (
    <section className="vh-100">
      <div className="container-fluid h-custom">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-md-9 col-lg-6 col-xl-5" >
            <img src="
            https://i.pinimg.com/originals/07/c1/97/07c1979b2febb58fa987ab0f66f440d0.jpg"
              className="img-fluid" alt="Sample image" />
          </div>
          <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
            <div className="col-12 my-4">
              <img src="
          https://s7d2.scene7.com/is/image/Caterpillar/CM20220222-5c3c2-280a8?fmt=png-alpha"
                className="img-fluid" alt="Sample image" />
            </div>


            <form className="mt-2">
              <div className="row">
                <div className="form-outline mb-2 col-6">
                  <label className="form-label" for="form3Example3">FirstName</label>
                  <input type="text" id="form3Example3"
                    value={credentails.first_name}
                    onChange={(e) => setCredentials({ ...credentails, first_name: e.target.value })}
                    className="form-control form-control-lg"
                    placeholder="UserName" />
                </div>
                <div className="form-outline mb-2 col-6">
                  <label className="form-label" for="form3Example3">LastName</label>
                  <input type="text" id="form3Example3"
                    value={credentails.last_name}
                    onChange={(e) => setCredentials({ ...credentails, last_name: e.target.value })}
                    className="form-control form-control-lg"
                    placeholder="LastName" />
                </div>
              </div>
              <div className="form-outline mb-2">
                <label className="form-label" for="form3Example3">Email</label>
                <input type="email" id="form3Example3"
                  value={credentails.email}
                  onChange={(e) => setCredentials({ ...credentails, email: e.target.value })}
                  className="form-control form-control-lg"
                  placeholder="Email" />
              </div>

              <div className="form-outline mb-2">

                <label className="form-label" for="form3Example4">Password</label>
                <input type="password" id="form3Example4"
                  value={credentails.password}
                  onChange={(e) => setCredentials({ ...credentails, password: e.target.value })}
                  className="form-control form-control-lg"
                  placeholder="Enter password" />
              </div>


              <div className="text-center text-lg-start mt-4 pt-2">
                <button type="button" className="btn btn-primary btn-lg" onClick={handleRegister}
                  style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}>Register</button>
                <p className="small fw-bold mt-2 pt-1 mb-0">I already have an account? <NavLink href="/login"
                  className="link-danger">Login</NavLink></p>
              </div>

            </form>
          </div>
        </div>
      </div>

    </section>
  );
};

export default RegisterPage;
