import React from "react";
import {Provider} from "react-redux";
import {store} from "src/app/store";
import "src/firebase";
import {createRoot} from "react-dom/client";
import "src/index.scss";
import {App} from "src/app/App";

/**
 * Root node for rendering App
 */
const rootElement: HTMLElement | null = document.getElementById("root");

if (!rootElement) {
  throw new Error("Failed to find the root element");
}

createRoot(rootElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
);
