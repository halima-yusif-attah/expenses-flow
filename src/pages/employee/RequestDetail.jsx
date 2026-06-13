import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DashboardLayout from "../../layouts/DashboardLayout";
import { themes } from "../../constants/themes";
import { useAuth } from "../../hooks/useAuth";
import { useExpenses } from "../../hooks/useExpenses";
import { useNavigation } from "../../hooks/useNavigation";
import toast from "react-hot-toast";
import Modal from "../../components/common/Modal";

const EXPENSE_CATEGORIES = [
	"Travel",
	"Meals",
	"Equipment",
	"Supplies",
	"Training",
	"Other",
];

export default function RequestDetail() {
	const theme = themes.employee;
	const navigate = useNavigate();
	const { id } = useParams();
	const { profile } = useAuth();
	const { getExpenseById, updateExpense, deleteExpense, refetch, loading } =
		useExpenses();
	const navItems = useNavigation();
	const expense = getExpenseById(id);

	const [formData, setFormData] = useState({
		title: "",
		description: "",
		category: "Other",
		vendor: "",
		amount: "",
		receipt_url: "",
	});
	const [saving, setSaving] = useState(false);
	const [error, setError] = useState("");

	const [confirmOpen, setConfirmOpen] = useState(false);

	useEffect(() => {
		let mounted = true;
		let timer;

		if (expense) {
			// Defer setState to avoid synchronous state update inside effect
			timer = setTimeout(() => {
				if (!mounted) return;
				setFormData({
					title: expense.title || "",
					description: expense.description || "",
					category: expense.category || "Other",
					vendor: expense.vendor || "",
					amount: expense.amount?.toString() || "",
					receipt_url: expense.receipt_url || "",
				});
			}, 0);
		} else if (!loading) {
			// Defer refetch as well to avoid synchronous updates in the effect
			timer = setTimeout(() => {
				if (!mounted) return;
				refetch();
			}, 0);
		}

		return () => {
			mounted = false;
			if (timer) clearTimeout(timer);
		};
	}, [expense, loading, refetch]);

	if (loading && !expense) {
		return (
			<DashboardLayout
				title="Request Details"
				subtitle="Loading request details..."
				breadcrumbs={["My Requests", "Request Details"]}
				sidebarItems={navItems}
				theme={theme}
				user={profile}
			>
				<div className="p-8 text-center text-gray-500">
					Loading request details...
				</div>
			</DashboardLayout>
		);
	}

	if (!expense) {
		return (
			<DashboardLayout
				title="Request Details"
				subtitle="Expense request not found"
				breadcrumbs={["My Requests", "Request Details"]}
				sidebarItems={navItems}
				theme={theme}
				user={profile}
			>
				<div className="p-8 text-center text-gray-500">
					Request not found. Please return to My Requests.
				</div>
			</DashboardLayout>
		);
	}

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
		setError("");
	};

	const handleSave = async (e) => {
		e.preventDefault();
		setError("");
		setSaving(true);

		try {
			await updateExpense(id, {
				title: formData.title,
				description: formData.description,
				category: formData.category,
				vendor: formData.vendor,
				amount: parseFloat(formData.amount) || 0,
				receipt_url: formData.receipt_url,
			});
			toast.success("Request updated successfully");
			navigate("/dashboard/employee/my-requests");
		} catch (err) {
			setError(err.message || "Failed to update request");
		} finally {
			setSaving(false);
		}
	};

	const showDeleteModal = () => setConfirmOpen(true);

	const confirmDelete = async () => {
		setConfirmOpen(false);
		try {
			await deleteExpense(id);
			toast.success("Request deleted successfully");
			navigate("/dashboard/employee/my-requests");
		} catch (err) {
			setError(err.message || "Failed to delete request");
		}
	};

	return (
		<DashboardLayout
			title="Request Details"
			subtitle="View and edit your expense request"
			breadcrumbs={["My Requests", "Request Details"]}
			sidebarItems={navItems}
			theme={theme}
			user={profile}
		>
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
				<div className="lg:col-span-2 bg-white border border-gray-100 rounded-xl p-6 space-y-4">
					<h2 className="font-semibold text-gray-800">Edit Request</h2>

					<form
						id="expense-edit-form"
						onSubmit={handleSave}
						className="space-y-4"
					>
						{error && (
							<div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
								{error}
							</div>
						)}

						<div>
							<label className="block text-sm font-medium text-gray-700 mb-2">
								Expense Title
							</label>
							<input
								name="title"
								value={formData.title}
								onChange={handleChange}
								className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
							/>
						</div>

						<div>
							<label className="block text-sm font-medium text-gray-700 mb-2">
								Description
							</label>
							<textarea
								name="description"
								value={formData.description}
								onChange={handleChange}
								rows="4"
								className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
							/>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
									name="vendor"
									value={formData.vendor}
									onChange={handleChange}
									className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
								/>
							</div>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-2">
									Amount
								</label>
								<input
									name="amount"
									value={formData.amount}
									onChange={handleChange}
									type="number"
									step="0.01"
									min="0"
									className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
								/>
							</div>

							<div>
								<label className="block text-sm font-medium text-gray-700 mb-2">
									Receipt URL
								</label>
								<input
									name="receipt_url"
									value={formData.receipt_url}
									onChange={handleChange}
									className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
								/>
							</div>
						</div>
					</form>

					<div className="flex flex-wrap gap-3 pt-2">
						<button
							type="button"
							onClick={() => navigate("/dashboard/employee/my-requests")}
							className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
						>
							Back
						</button>
						<button
							type="button"
							onClick={showDeleteModal}
							className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
						>
							Delete Request
						</button>
						<button
							type="submit"
							form="expense-edit-form"
							disabled={saving}
							className={`px-4 py-2 rounded-lg text-white ${
								saving
									? "bg-blue-300 cursor-not-allowed"
									: "bg-blue-600 hover:bg-blue-700"
							}`}
						>
							{saving ? "Saving..." : "Save Changes"}
						</button>
					</div>
				</div>

				<div className="bg-white border border-gray-100 rounded-xl p-6">
					<h3 className="font-semibold text-gray-800 mb-4">Request Summary</h3>
					<div className="space-y-3 text-sm text-gray-600">
						<div>
							<span className="font-medium">Status:</span>{" "}
							{expense.status || "pending"}
						</div>
						<div>
							<span className="font-medium">Created:</span>{" "}
							{new Date(expense.created_at).toLocaleString()}
						</div>
						<div>
							<span className="font-medium">Category:</span>{" "}
							{expense.category || "N/A"}
						</div>
						<div>
							<span className="font-medium">Vendor:</span>{" "}
							{expense.vendor || "N/A"}
						</div>
						<div>
							<span className="font-medium">Amount:</span> $
							{(expense.amount || 0).toFixed(2)}
						</div>
						{expense.receipt_url && (
							<div>
								<span className="font-medium">Receipt:</span>{" "}
								<a
									href={expense.receipt_url}
									target="_blank"
									rel="noreferrer"
									className="text-blue-600 hover:text-blue-700"
								>
									View receipt
								</a>
							</div>
						)}
					</div>
				</div>
			</div>

			{/* Confirm Delete Modal */}
			<Modal
				open={confirmOpen}
				onClose={() => setConfirmOpen(false)}
				title="Delete Request"
				confirmLabel="Delete"
				onConfirm={confirmDelete}
			>
				<p>
					Are you sure you want to delete this expense request? This action
					cannot be undone.
				</p>
			</Modal>
		</DashboardLayout>
	);
}
