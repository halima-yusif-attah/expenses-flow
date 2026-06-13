import { useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import { themes } from "../../constants/themes";
import { useAuth } from "../../hooks/useAuth";
import { useNavigation } from "../../hooks/useNavigation";
import toast from "react-hot-toast";

export default function Profile() {
	const theme = themes.employee;
	const { profile, updateProfile } = useAuth();
	const navItems = useNavigation();

	const [editing, setEditing] = useState(false);
	const [loading, setLoading] = useState(false);
	const [formData, setFormData] = useState({
		full_name: profile?.full_name || "",
		email: profile?.email || "",
		// department: profile?.department || "",
		role: profile?.role || "",
		phone: profile?.phone || "",
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSave = async () => {
		try {
			setLoading(true);

			const updates = {
				full_name: formData.full_name,
				// department: formData.department,
				phone: formData.phone,
			};

			await updateProfile(updates);

			toast.success("Profile updated successfully");
			setEditing(false);
		} catch (error) {
			console.error("Profile update error:", error);
			toast.error(error.message || "Failed to update profile");
		} finally {
			setLoading(false);
		}
	};

	const getInitials = (name) => {
		if (!name) return "U";
		return name
			.split(" ")
			.map((n) => n[0])
			.join("")
			.toUpperCase()
			.slice(0, 2);
	};

	const breadcrumbs = ["Profile"];

	return (
		<DashboardLayout
			title="My Profile"
			subtitle="View and manage your profile information"
			breadcrumbs={breadcrumbs}
			sidebarItems={navItems}
			theme={theme}
			user={profile}
		>
			<div className="max-w-2xl space-y-6">
				{/* Profile Header */}
				<div className="bg-white border border-gray-100 rounded-xl p-6">
					<div className="flex items-center gap-4 mb-6">
						<div
							className={`w-20 h-20 rounded-full border-${theme.primary} flex items-center justify-center text-2xl font-semibold text-white`}
						>
							<div
								className={`text-white ${theme.primary} flex items-center justify-center w-full h-full rounded-full`}
							>
								{getInitials(profile?.full_name || "User")}
							</div>
						</div>

						<div>
							<h2 className="text-2xl font-semibold text-gray-800">
								{profile?.full_name || "User"}
							</h2>
							<p className="text-gray-600 capitalize">
								{profile?.role || "Role Not Set"}
							</p>
						</div>
					</div>

					{!editing && (
						<button
							onClick={() => setEditing(true)}
							className={`px-4 py-2 ${theme.primary} text-white rounded-lg hover:opacity-90 transition-opacity`}
						>
							Edit Profile
						</button>
					)}
				</div>

				{/* Profile Information */}
				<div className="bg-white border border-gray-100 rounded-xl p-6 space-y-4">
					<h3 className="font-semibold text-gray-800 mb-4">
						{editing ? "Edit Information" : "Information"}
					</h3>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						{/* Full Name */}
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-2">
								Full Name
							</label>
							{editing ? (
								<input
									type="text"
									name="full_name"
									value={formData.full_name}
									onChange={handleChange}
									className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
								/>
							) : (
								<p className="px-3 py-2 text-gray-700">
									{profile?.full_name || "N/A"}
								</p>
							)}
						</div>

						{/* Email */}
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-2">
								Email
							</label>
							{editing ? (
								<input
									type="email"
									name="email"
									value={formData.email}
									onChange={handleChange}
									disabled
									className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed"
								/>
							) : (
								<p className="px-3 py-2 text-gray-700">
									{profile?.email || "N/A"}
								</p>
							)}
						</div>

						{/* Department */}
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-2">
								Department
							</label>
							<p className="px-3 py-2 text-gray-700 capitalize">
								N/A"
							</p>
						</div>

						{/* Role */}
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-2">
								Role
							</label>
							<p className="px-3 py-2 text-gray-700 capitalize">
								{profile?.role || "N/A"}
							</p>
						</div>

						{/* Phone */}
						<div className="md:col-span-2">
							<label className="block text-sm font-medium text-gray-700 mb-2">
								Phone
							</label>
							{editing ? (
								<input
									type="tel"
									name="phone"
									value={formData.phone}
									onChange={handleChange}
									className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
								/>
							) : (
								<p className="px-3 py-2 text-gray-700">
									{profile?.phone || "N/A"}
								</p>
							)}
						</div>
					</div>

					{/* Action Buttons */}
					{editing && (
						<div className="flex gap-3 pt-4 border-t">
							<button
								onClick={() => setEditing(false)}
								disabled={loading}
								className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
							>
								Cancel
							</button>
							<button
								onClick={handleSave}
								disabled={loading}
								className={`flex-1 px-4 py-2 ${theme.primary} text-white rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed`}
							>
								{loading ? "Saving..." : "Save Changes"}
							</button>
						</div>
					)}
				</div>
			</div>
		</DashboardLayout>
	);
}
