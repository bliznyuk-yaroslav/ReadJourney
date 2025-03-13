import { StrictMode } from "react";
import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import App from "./components/App/App";
import "./index.css";
import { Provider } from "react-redux";

createRoot(document.getElementById("root")).render(
  <Provider>
    <StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StrictMode>
  </Provider>
);
