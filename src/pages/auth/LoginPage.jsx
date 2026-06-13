
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import {
	getCurrentProfile,
	loginWithEmail,
	signInWithGoogle,
} from "../../services/auth.service";
import toast from "react-hot-toast";
import GoogleIcon from "../../components/GoogleIcon";


export default function Login() {
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	// const [error, setError] = useState("");
	const [formData, setFormData] = useState({
		email: "",
		password: "",
		rememberMe: false,
	});

	
	  const handleSubmit = async (e) => {
		  e.preventDefault();
		  console.log("Authenticating credentials...", formData);

			try {
				setLoading(true);

				await loginWithEmail(formData.email, formData.password);
				

				const profile = await getCurrentProfile();
				console.log("User profile - login:", profile);
				toast.success("Sign in successful")

				switch (profile.role) {
					case "employee":
						navigate("/dashboard/employee");
						break;

					case "manager":
						navigate("/dashboard/manager");
						break;

					case "finance":
						navigate("/dashboard/finance");
						break;

					case "admin":
						navigate("/dashboard/admin");
						break;

					default:
						throw new Error("User role not recognized.");
				}
			} catch (error) {
				console.error(error.message);
				
				toast.error("Oops failed! " + error.message)
				// alert(error.message);
			} finally {
				setLoading(false);
			}
		};
	
	
	return (
		<div className="space-y-6">
			<div className="space-y-2">
				<h2 className="text-2xl font-bold text-slate-900 tracking-tight">
					Welcome back!
				</h2>
				<p className="text-sm text-slate-500">
					Sign in to continue to your account
				</p>
			</div>

			<form onSubmit={handleSubmit} className="space-y-4">
				<div>
					<label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
						Email
					</label>
					<div className="relative">
						<Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
						<input
							type="email"
							required
							placeholder="Enter your email"
							className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
							value={formData.email}
							onChange={(e) =>
								setFormData({ ...formData, email: e.target.value })
							}
						/>
					</div>
				</div>

				<div>
					<label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
						Password
					</label>
					<div className="relative">
						<Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
						<input
							type={showPassword ? "text" : "password"}
							required
							placeholder="Enter your password"
							className="w-full pl-10 pr-10 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
							value={formData.password}
							onChange={(e) =>
								setFormData({ ...formData, password: e.target.value })
							}
						/>
						<button
							type="button"
							className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
							onClick={() => setShowPassword(!showPassword)}
						>
							{showPassword ? (
								<Eye className="h-4 w-4" />
							) : (
								<EyeOff className="h-4 w-4" />
							)}
						</button>
					</div>
				</div>

				<div className="flex items-center justify-between text-sm">
					<label className="flex items-center space-x-2 cursor-pointer select-none text-slate-600">
						<input
							type="checkbox"
							className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500/20 h-4 w-4"
							checked={formData.rememberMe}
							onChange={(e) =>
								setFormData({ ...formData, rememberMe: e.target.checked })
							}
						/>
						<span>Remember me</span>
					</label>
					<Link
						to="/forgot-password"
						className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 transition-colors"
					>
						Forgot password?
					</Link>
				</div>

				<button
					type="submit"
					className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm py-2.5 px-4 rounded-lg shadow-sm hover:shadow transition-all duration-150"
				>
					{loading ? "Signing in..." : "Sign In"}
				</button>
			</form>
			{/* {error && <p className="text-red-500 text-md text-center"> Failed to sign in </p>} */}

			<div className="relative flex py-2 items-center">
				<div className="grow border-t border-slate-200"></div>
				<span className="shrink mx-4 text-xs font-medium text-slate-400 uppercase tracking-wider">
					or continue with
				</span>
				<div className="grow border-t border-slate-200"></div>
			</div>

			<button
				type="button"
				onClick={async () => {
					try {
						setLoading(true);
						await signInWithGoogle();
					} catch (error) {
						console.error(error);
						toast.error("Google sign-in failed: " + error.message);
					} finally {
						setLoading(false);
					}
				}}
				className="w-full bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-sm py-2.5 px-4 rounded-lg flex items-center justify-center space-x-2 transition-colors"
			>
				{/* <ShieldAlert className="h-4 w-4 text-slate-500" /> */}
				<GoogleIcon className="w-5 h-5" />
				<span>Sign in with Google</span>
			</button>

			{/* <p className="text-center text-xs text-slate-500">
				Don't have an account?{" "}
				<a
					href="mailto:admin@company.com"
					className="font-semibold text-indigo-600 hover:text-indigo-700"
				>
					Contact Administrator
				</a>
			</p> */}
		</div>
	);
}