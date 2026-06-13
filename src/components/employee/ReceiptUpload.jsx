import { useState } from "react";

export default function ReceiptUpload({ onUpload }) {
	const [file, setFile] = useState(null);

	const handleChange = (e) => {
		const selectedFile = e.target.files?.[0];
		if (!selectedFile) return;

		setFile(selectedFile);

		const fileUrl = URL.createObjectURL(selectedFile);
		console.log("Receipt file URL:", fileUrl);
		onUpload?.(fileUrl);
	};

	return (
		<div className="border border-dashed border-gray-300 rounded-xl p-5 text-center">
			<input
				type="file"
				className="hidden"
				id="receipt"
				onChange={handleChange}
			/>

			<label htmlFor="receipt" className="cursor-pointer">
				<p className="text-sm text-gray-600">Upload Receipt</p>

				<p className="text-xs text-gray-400 mt-1">PNG, JPG, PDF supported</p>

				{file && (
					<p className="text-xs text-green-600 mt-2">Selected: {file.name}</p>
				)}
			</label>
		</div>
	);
}
