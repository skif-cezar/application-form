import React from "react";
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
    <App />
  </React.StrictMode>,
);
