import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "../hooks/AuthProvider";

export default function App() {
  return (
		<AuthProvider>
			<RouterProvider router={router} />
			<Toaster position="top-center" />
		</AuthProvider>
	);
}