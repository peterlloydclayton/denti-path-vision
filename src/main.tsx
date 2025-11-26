import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Import test function so it's available in browser console
// This makes window.testSubmitApplication() available for testing
if (import.meta.env.DEV) {
  import("../test/testApplicationSubmission").catch(console.error);
}

createRoot(document.getElementById("root")!).render(<App />);
