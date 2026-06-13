const statusStyles = {
	approved: "bg-green-50 text-green-600 border-green-100",
	pending: "bg-yellow-50 text-yellow-600 border-yellow-100",
	rejected: "bg-red-50 text-red-600 border-red-100",
	default: "bg-gray-50 text-gray-600 border-gray-100",
};

export default function StatusBadge({ status = "default" }) {
	const style = statusStyles[status] || statusStyles.default;

	return (
		<span className={`text-xs px-2 py-1 rounded-full border ${style}`}>
			{status}
		</span>
	);
}
