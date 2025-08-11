import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ConfigProvider } from "antd";
import "./index.css";
import App from "./App.tsx";

// Read CSS variable
const fontFamily = getComputedStyle(document.documentElement)
  .getPropertyValue("--font-family")
  .trim();

const colorText = getComputedStyle(document.documentElement)
  .getPropertyValue("--text-color")
  .trim();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ConfigProvider
      theme={{
        token: {
          fontFamily: fontFamily,
          colorText,
        },
      }}
    >
      <App />
    </ConfigProvider>
  </StrictMode>
);
