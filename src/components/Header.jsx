import { Bell, Menu } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { useState } from "react";
import Modal from "./common/Modal";

export default function Header({ title, subtitle, onMenuClick }) {
	const { profile } = useAuth();

	const [notesOpen, setNotesOpen] = useState(false);

	const getInitials = (name) => {
		if (!name) return "U";
		return name
			.split(" ")
			.map((n) => n[0])
			.join("")
			.toUpperCase()
			.slice(0, 2);
	};

	return (
		<header className="sticky top-0 z-30 bg-white border-b border-slate-200">
			<div className="px-4 md:px-6 py-4">
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-4">
						<button
							onClick={onMenuClick}
							className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100"
							aria-label="Toggle menu"
						>
							<Menu size={22} />
						</button>

						<div>
							<h1 className="text-xl font-semibold text-slate-900">{title}</h1>
							{subtitle && <p className="text-sm text-slate-500">{subtitle}</p>}
						</div>
					</div>

					<div className="flex items-center gap-4">
						{/* Notification Bell */}
						<button
							onClick={() => setNotesOpen(true)}
							className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 relative transition-colors"
							aria-label="Notifications"
						>
							<Bell size={20} />
							<span className="absolute top-1.5 right-1.5 h-2.5 w-2.5 bg-red-500 rounded-full" />
						</button>

						<div className="h-6 w-px bg-slate-200" />

						{/* User Profile */}
						<div className="flex items-center gap-3">
							<div className="h-9 w-9 rounded-full bg-slate-200 flex items-center justify-center text-sm font-semibold text-slate-700">
								{getInitials(profile?.full_name || "User")}
							</div>

							<div className="hidden md:block">
								<p className="text-sm font-medium text-slate-900">
									{profile?.full_name || "User"}
								</p>
								<p className="text-xs text-slate-500 capitalize">
									{profile?.role || "Loading..."}
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Notifications Modal */}
			<Modal
				open={notesOpen}
				onClose={() => setNotesOpen(false)}
				title="Notifications"
				confirmLabel="Close"
				showConfirm={false}
			>
				<div className="space-y-3">
					<p className="text-sm text-gray-600">No notifications yet.</p>
				</div>
			</Modal>
		</header>
	);
}
