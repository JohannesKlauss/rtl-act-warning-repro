import { StrictMode } from "react";
import ReactDOM from "react-dom";

import App from "./App";
import { AppStateProvider } from "./ApplicationState";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <AppStateProvider>
      <App />
    </AppStateProvider>
  </StrictMode>,
  rootElement
);
