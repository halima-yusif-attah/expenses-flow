import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import Modal from "./common/Modal";
import toast from "react-hot-toast";

export default function SidebarContent({ items, theme, user }) {
	const { signOut } = useAuth();
	const navigate = useNavigate();
	const [logoutOpen, setLogoutOpen] = useState(false);

	const handleLogoutConfirm = async () => {
		try {
			await signOut();
			toast.success("Logged out");
			navigate("/login");
		} catch {
			toast.error("Logout failed");
		} finally {
			setLogoutOpen(false);
		}
	};

	return (
		<>
			{/* Brand Header with theme accent */}
			<div className={`p-6 border-b ${theme?.border || "border-slate-200"}`}>
				<div className="flex items-center gap-2">
					<div
						className={`p-2 rounded-lg text-white ${theme?.primary || "bg-slate-700"}`}
					>
						<span className="text-sm font-bold">📊</span>
					</div>
					<h2
						className={`font-bold text-lg ${theme?.text || "text-slate-700"}`}
					>
						ExpenseFlow
					</h2>
				</div>
			</div>

			{/* Navigation links with theme-aware active state */}
			<nav className="flex-1 p-4 space-y-2">
				{items?.map((item) => {
					const Icon = item.icon;

					return (
						<NavLink
							key={item.path}
							to={item.path}
							end
							className={({ isActive }) =>
								`
                flex items-center gap-3
                px-4 py-3
                rounded-lg
                text-sm
                font-medium
                transition-all
                duration-200

                ${
									isActive
										? `${theme?.primary || "bg-slate-700"} text-white shadow-md`
										: `${theme?.text || "text-slate-600"} hover:${theme?.light || "bg-slate-100"}`
								}
              `
							}
						>
							<Icon size={18} />
							{item.label}
						</NavLink>
					);
				})}
			</nav>

			{/* User profile footer with theme accent */}
			<div className={`border-t p-4 ${theme?.border || "border-slate-200"}`}>
				<div className="flex items-center gap-3 justify-between">
					<div className="flex items-center gap-3">
						<div
							className={`h-10 w-10 rounded-full ${theme?.light || "bg-slate-200"} flex items-center justify-center font-semibold ${theme?.text || "text-slate-600"}`}
						>
							{user?.full_name ? user.full_name.charAt(0).toUpperCase() : "U"}
						</div>

						<div>
							<p className={`font-medium ${theme?.text || "text-slate-900"}`}>
								{user?.full_name || "User"}
							</p>

							<p
								className={`text-xs capitalize ${theme?.text || "text-slate-500"}`}
							>
								{user?.role || "user"}
							</p>
						</div>
					</div>

					<button
						className="text-sm text-red-600 hover:text-red-800 px-2 py-1 rounded"
						onClick={() => setLogoutOpen(true)}
					>
						Logout
					</button>
				</div>
			</div>

			{/* Logout Confirmation Modal */}
			<Modal
				open={logoutOpen}
				onClose={() => setLogoutOpen(false)}
				title="Confirm Logout"
				description="Are you sure you want to logout?"
				confirmLabel="Logout"
				onConfirm={handleLogoutConfirm}
			/>
		</>
	);
}
