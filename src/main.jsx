import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import "bootstrap/dist/css/bootstrap.min.css";
import "./index.scss";
import "./assets/_variables.scss";
import "react-toastify/dist/ReactToastify.css";
import { TypingProvider } from "./context/TypingContext";
import { NotificationProvider } from "./context/NotificationContext";
import Compose from "./components/context/Compose";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import store from "./app/store";

import { Provider } from "react-redux";

import { disableReactDevTools } from "@fvilers/disable-react-devtools";

if (process.env.NODE_ENV === "production") {
  disableReactDevTools();
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <Compose components={[TypingProvider, NotificationProvider]}>
        <Router>
          <Routes>
            <Route path="/*" element={<App />} />
          </Routes>
        </Router>
      </Compose>
    </Provider>
  </React.StrictMode>
);
