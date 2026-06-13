import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../layouts/DashboardLayout";
import ReceiptUpload from "../../components/employee/ReceiptUpload";
// import RequestStatusTracker from "../../components/employee/RequestStatusTracker";
import { themes } from "../../constants/themes";
import { useAuth } from "../../hooks/useAuth";
import { useExpenses } from "../../hooks/useExpenses";
import { useNavigation } from "../../hooks/useNavigation";
import toast from "react-hot-toast";

const EXPENSE_CATEGORIES = [
	"Travel",
	"Meals",
	"Equipment",
	"Supplies",
	"Training",
	"Other",
];

export default function NewRequest() {
	const theme = themes.employee;
	const navigate = useNavigate();
	const { profile } = useAuth();
	const { createExpense, loading: submitting, refetch } = useExpenses();
	const navItems = useNavigation();

	console.log("profiles-request: ", profile)

	// Form state
	const [formData, setFormData] = useState({
		title: "",
		description: "",
		category: "Other",
		vendor: "",
		amount: "",
		receipt_url: "",
	});

	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
		setError("");
	};

	const handleFileUpload = (fileUrl) => {
		console.log("File uploaded:", fileUrl);
		setFormData((prev) => ({ ...prev, receipt_url: fileUrl }));
	};


	const validateForm = () => {
		if (!formData.title.trim()) {
			setError("Please enter an expense title");
			return false;
		}
		if (!formData.amount || parseFloat(formData.amount) <= 0) {
			setError("Please enter a valid amount");
			return false;
		}
			if (!formData.category) {
				setError("Please select a category");
				return false;
			}
		if (!formData.description.trim()) {
			setError("Please enter an expense description");
			return false;
		}
		return true;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!validateForm()) return;
		console.log("Submitting expense request:", formData);

		try {
			
			await createExpense({
				title: formData.title,
				description: formData.description,
				category: formData.category,
				vendor: formData.vendor,
				amount: parseFloat(formData.amount),
				receipt_url: formData.receipt_url,

				employee_id: profile.id,
				department_id: profile.department_id,

				status: "pending",
			});

			setSuccess("Request submitted successfully!");
			toast.success("Expense request created!");
			// Refetch to sync with server
			await refetch();

			setFormData({
				title: "",
				amount: "",
				category: "Other",
				description: "",
				receipt_url: "",
			});

			// Redirect after 2 seconds
			setTimeout(() => {
				navigate("/dashboard/employee/my-requests");
			}, 2000);
		} catch (err) {
			setError(err.message || "Failed to submit request");
			toast.error("Failed to create expense request");
		}
	};

	const handleCancel = () => {
		if (
			formData.description ||
			formData.amount ||
			formData.reason ||
			formData.receipt_url
		) {
			if (window.confirm("Discard unsaved changes?")) {
				navigate("/dashboard/employee");
			}
		} else {
			navigate("/dashboard/employee");
		}
	};

	const breadcrumbs = ["New Request"];

	return (
		<DashboardLayout
			title="Create Expense Request"
			subtitle="Submit a new expense for approval"
			breadcrumbs={breadcrumbs}
			sidebarItems={navItems}
			theme={theme}
			user={profile}
		>
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
				{/* Form */}
				<div className="lg:col-span-2 bg-white border border-gray-100 rounded-xl p-6 space-y-4">
					<h2 className="font-semibold text-gray-800">Expense Details</h2>

					<form onSubmit={handleSubmit} className="space-y-4">
						{/* Status Messages */}
						{error && (
							<div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
								{error}
							</div>
						)}

						{success && (
							<div className="p-3 rounded-lg bg-green-50 border border-green-200 text-green-700 text-sm">
								{success}
							</div>
						)}

						{/* Description */}
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-2">
								Expense Title
							</label>
							<input
								type="text"
								name="title"
								value={formData.title}
								onChange={handleChange}
								placeholder="e.g., Office Supplies, Client Dinner"
								className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
							/>
						</div>

						{/* Amount & Category */}
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-2">
									Amount ($)
								</label>
								<input
									type="number"
									name="amount"
									value={formData.amount}
									onChange={handleChange}
									placeholder="0.00"
									step="0.01"
									min="0"
									className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
								/>
							</div>

							<div>
								<label className="block text-sm font-medium text-gray-700 mb-2">
									Category
								</label>
								<select
									name="category"
									value={formData.category}
									onChange={handleChange}
									className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
								>
									{EXPENSE_CATEGORIES.map((cat) => (
										<option key={cat} value={cat}>
											{cat}
										</option>
									))}
								</select>
							</div>

							<div>
								<label className="block text-sm font-medium text-gray-700 mb-2">
									Vendor
								</label>

								<input
									type="text"
									name="vendor"
									value={formData.vendor}
									onChange={handleChange}
									placeholder="e.g., Amazon, Walmart, Uber"
									className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
								/>
							</div>
						</div>

						{/* Reason */}
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-2">
								Expense Description
							</label>
							<textarea
								name="description"
								value={formData.description}
								onChange={handleChange}
								placeholder="Explain why this expense is necessary..."
								rows="4"
								className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
							/>
						</div>

						{/* Receipt Upload */}
						<ReceiptUpload onUpload={handleFileUpload} />

						{/* Actions */}
						<div className="flex gap-3 pt-2">
							<button
								type="button"
								onClick={handleCancel}
								className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
							>
								Cancel
							</button>

							<button
								type="submit"
								disabled={submitting}
								className={`flex-1 px-4 py-2 text-white rounded-lg transition-colors ${
									submitting
										? "opacity-50 cursor-not-allowed"
										: `${theme.primary} hover:opacity-90`
								}`}
							>
								{submitting ? "Submitting..." : "Submit Request"}
							</button>
						</div>
					</form>
				</div>

				{/* Status Tracker */}
				{/* <RequestStatusTracker /> */}
			</div>
		</DashboardLayout>
	);
}
