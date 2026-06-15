
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, ArrowLeft } from "lucide-react";
import { sendPasswordReset } from "../../services/auth.service";

export default function ForgotPassword() {
	const [email, setEmail] = useState("");
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log("Sending recovery link payload...", email);
		try {
			const { data } = await sendPasswordReset(email);
			console.log("data-pswd reset", data)
		} catch (error) {
			console.error(error.message);
		}
		// Transition view simulation for demonstration
		navigate("/verify-email", { state: { email } });
	};

	return (
		<div className="space-y-6">
			<div className="space-y-2">
				<h2 className="text-2xl font-bold text-slate-900 tracking-tight">
					Can't access your account?
				</h2>
				<p className="text-sm text-slate-500">
					No worries! Enter your email and we'll send you a link to reset your
					password.
				</p>
			</div>

			<form onSubmit={handleSubmit} className="space-y-4">
				<div>
					<label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
						Work Email
					</label>
					<div className="relative">
						<Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
						<input
							type="email"
							required
							placeholder="Enter your work email"
							className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>
				</div>

				<button
					type="submit"
					className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm py-2.5 px-4 rounded-lg shadow-sm transition-all"
				>
					Send Reset Link
				</button>
			</form>

			<div className="text-center">
				<Link
					to="/login"
					className="inline-flex items-center space-x-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors"
				>
					<ArrowLeft className="h-3.5 w-3.5" />
					Remember your password?
					<span className="text-blue-500 ml-2 "> Sign in</span>
				</Link>
			</div>
		</div>
	);
}