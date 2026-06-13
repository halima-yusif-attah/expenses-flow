export default function Modal({
	open,
	onClose,
	title,
	children,
	onConfirm,
	confirmLabel = "Confirm",
	cancelLabel = "Cancel",
	showCancel = true,
	showConfirm = true,
}) {
	if (!open) return null;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center">
			<div
				className="absolute inset-0 bg-black/40"
				onClick={onClose}
				aria-hidden
			/>

			<div className="relative bg-white rounded-lg shadow-lg w-full max-w-md mx-4">
				<div className="p-4 border-b">
					<h3 className="text-lg font-semibold">{title}</h3>
				</div>

				<div className="p-4">{children}</div>

				<div className="flex justify-end gap-3 p-4 border-t">
					{showCancel && (
						<button
							onClick={onClose}
							className="px-4 py-2 rounded-lg bg-gray-100 text-sm text-gray-700 hover:bg-gray-200"
						>
							{cancelLabel}
						</button>
					)}

					{showConfirm && (
						<button
							onClick={onConfirm}
							className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm hover:bg-blue-700"
						>
							{confirmLabel}
						</button>
					)}
				</div>
			</div>
		</div>
	);
}
