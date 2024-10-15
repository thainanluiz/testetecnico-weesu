import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";
import AppProvider from "./context";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<AppProvider />
	</StrictMode>,
);
