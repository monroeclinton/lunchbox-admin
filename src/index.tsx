import React from "react";
import ReactDOM from "react-dom";

import "antd/dist/antd.css";
import "../styles/global.scss";

import { AuthProvider } from "./context/auth/reducer";
import AppRouter from "./router";

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
        <AppRouter />
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

if (module.hot)
    module.hot.accept()
