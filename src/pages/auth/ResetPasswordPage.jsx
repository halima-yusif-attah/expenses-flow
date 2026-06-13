// import { useState } from 'react'
// import { Link, useNavigate } from 'react-router-dom'
// import { updatePassword } from '../../services/auth.service'

// export default function ResetPasswordPage() {
//   const navigate = useNavigate()
//   const [password, setPassword] = useState('')
//   const [errorMessage, setErrorMessage] = useState('')

//   async function handleSubmit(event) {
//     event.preventDefault()
//     setErrorMessage('')

//     try {
//       await updatePassword(password)
//       navigate('/login', { replace: true })
//     } catch (error) {
//       setErrorMessage(error.message)
//     }
//   }

//   return (
//     <main className="auth-page">
//       <section className="auth-panel">
//         <p className="eyebrow">ExpenseFlow</p>
//         <h1>Create a new password</h1>
//         <form className="auth-form" onSubmit={handleSubmit}>
//           <label>
//             New password
//             <input value={password} onChange={(event) => setPassword(event.target.value)} type="password" minLength="8" required />
//           </label>
//           {errorMessage && <p className="form-error">{errorMessage}</p>}
//           <button>Update password</button>
//         </form>
//         <Link to="/login">Back to login</Link>
//       </section>
//     </main>
//   )
// }

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Lock, Eye, EyeOff, ArrowLeft } from "lucide-react";
import { updatePassword } from "../../services/auth.service";

export default function ResetPassword() {
	const [showPass, setShowPass] = useState(false);
	const [passwords, setPasswords] = useState({ password: "", confirm: "" });
	const navigate = useNavigate();

	const handleSubmit = async(e) => {
		e.preventDefault();
    console.log("Committing password update entries...");
    
    try {
      await updatePassword(passwords.password);
      console.log("Password updated successfully!");
      navigate("/login", { replace: true });
    } catch (error) {
      console.error("Error updating password:", error.message);
    }
	};

	return (
		<div className="space-y-6">
			<div className="space-y-2">
				<h2 className="text-2xl font-bold text-slate-900 tracking-tight">
					Create a new password
				</h2>
				<p className="text-sm text-slate-500">
					Your new password must be different from previous used passwords.
				</p>
			</div>

			<form onSubmit={handleSubmit} className="space-y-4">
				<div>
					<label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
						New Password
					</label>
					<div className="relative">
						<Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
						<input
							type={showPass ? "text" : "password"}
							required
							className="w-full pl-10 pr-10 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
							value={passwords.password}
							onChange={(e) =>
								setPasswords({ ...passwords, password: e.target.value })
							}
						/>
						<button
							type="button"
							className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
							onClick={() => setShowPass(!showPass)}
						>
							{showPass ? (
								<EyeOff className="h-4 w-4" />
							) : (
								<Eye className="h-4 w-4" />
							)}
						</button>
					</div>
					{/* Dynamic Strength Metric Placeholder */}
					<div className="mt-2 flex items-center space-x-1">
						<span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
							Strength:
						</span>
						<span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider">
							Strong
						</span>
						<div className="flex-1 h-1 grid grid-cols-4 gap-1 ml-2">
							<div className="bg-emerald-500 rounded-sm" />
							<div className="bg-emerald-500 rounded-sm" />
							<div className="bg-emerald-500 rounded-sm" />
							<div className="bg-emerald-500 rounded-sm" />
						</div>
					</div>
				</div>

				<div>
					<label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
						Confirm New Password
					</label>
					<div className="relative">
						<Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
						<input
							type="password"
							required
							className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
							value={passwords.confirm}
							onChange={(e) =>
								setPasswords({ ...passwords, confirm: e.target.value })
							}
						/>
					</div>
				</div>

				<button
					type="submit"
					className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm py-2.5 px-4 rounded-lg shadow-sm transition-all"
				>
					Update Password
				</button>
			</form>

			<div className="text-center">
				<Link
					to="/login"
					className="inline-flex items-center space-x-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors"
				>
					<ArrowLeft className="h-3.5 w-3.5" />
					<span>Back to Sign In</span>
				</Link>
			</div>
		</div>
	);
}