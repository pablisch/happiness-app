import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { SelectorProvider } from "./Context/SelectorProvider.jsx";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <SelectorProvider>
            <App />
        </SelectorProvider>
    </React.StrictMode>
);
