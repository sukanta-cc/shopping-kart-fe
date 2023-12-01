import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "App";
import "./global.css";

// React toastify component
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

// Material Dashboard 2 React Context Provider
import { MaterialUIControllerProvider } from "context";

const container = document.getElementById("app");
const root = createRoot(container);

root.render(
	<BrowserRouter>
		<StrictMode>
			<MaterialUIControllerProvider>
				<App />
				<ToastContainer
					draggable
					pauseOnHover
					theme='dark'
					newestOnTop
				/>
			</MaterialUIControllerProvider>
		</StrictMode>
	</BrowserRouter>
);
