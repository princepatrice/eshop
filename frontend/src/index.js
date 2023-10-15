
import React from "react";
import ReactDOM from "react-dom/client";

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { Provider } from "react-redux"
import { PersistGate } from "redux-persist/integration/react"
import { store, persistor } from './redux/store/store'
import { ToastProvider } from 'react-toast-notifications';

import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/animate.min.css";
import "./assets/scss/light-bootstrap-dashboard-react.scss?v=2.0.0";
import "./assets/css/demo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import AdminLayout from "layouts/Admin.js";
import LoginPage from "views/auth/login";
import RegisterPage from "views/auth/register";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ToastProvider>
        <BrowserRouter>
          <Switch>
            <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
            <Route path="/login" render={(props) => <LoginPage {...props} />} />
            <Route path="/register" render={(props) => <RegisterPage {...props} />} />
            <Redirect from="/" to="/admin/dashboard" />
          </Switch>
        </BrowserRouter>
      </ToastProvider>

    </PersistGate>
  </Provider>
);
