import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import store from "./store/store.ts";
import { Provider } from "react-redux";
import { setupAxiosInterceptor } from "./api/interceptor";
import { BrowserRouter as Router } from "react-router-dom";

setupAxiosInterceptor();

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <Provider store={store}>
            <Router>
                <App />
            </Router>
        </Provider>
    </StrictMode>
);
