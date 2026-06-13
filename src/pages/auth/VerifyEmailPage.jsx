// import { useState } from 'react'
// import { Link } from 'react-router-dom'
// import { resendVerificationEmail } from '../../services/auth.service'

// export default function VerifyEmailPage() {
//   const [email, setEmail] = useState('')
//   const [message, setMessage] = useState('')
//   const [errorMessage, setErrorMessage] = useState('')

//   async function handleResend(event) {
//     event.preventDefault()
//     setMessage('')
//     setErrorMessage('')

//     try {
//       await resendVerificationEmail(email)
//       setMessage('Verification email sent.')
//     } catch (error) {
//       setErrorMessage(error.message)
//     }
//   }

//   return (
//     <main className="auth-page">
//       <section className="auth-panel">
//         <p className="eyebrow">ExpenseFlow</p>
//         <h1>Verify your email</h1>
//         <p>Check your inbox for the verification link from ExpenseFlow.</p>
//         <form className="auth-form" onSubmit={handleResend}>
//           <label>
//             Email
//             <input value={email} onChange={(event) => setEmail(event.target.value)} type="email" required />
//           </label>
//           {message && <p className="form-success">{message}</p>}
//           {errorMessage && <p className="form-error">{errorMessage}</p>}
//           <button>Resend verification email</button>
//         </form>
//         <Link to="/login">Back to login</Link>
//       </section>
//     </main>
//   )
// }


import { Link, useLocation } from "react-router-dom";
import { MailCheck, ArrowLeft, HelpCircle } from "lucide-react";
import { resendVerificationEmail } from "../../services/auth.service";
import { useState } from "react";

export default function VerifyEmail() {
	const location = useLocation();
	const emailTarget = location.state?.email || "john.doe@company.com";
	const [message, setMessage] = useState("");
	  const [errorMessage, setErrorMessage] = useState('')

	async function handleResend(event) {
		event.preventDefault();
		setMessage("");
		setErrorMessage("");

		try {
			await resendVerificationEmail(emailTarget);
			setMessage("Verification email sent.");
		} catch (error) {
			setErrorMessage(error.message);
		}
	}
	// resendVerificationEmail;

	return (
		<div className="space-y-6 text-center sm:text-left">
			{/* Icon Graphic Indicator Block */}
			<div className="mx-auto sm:mx-0 h-12 w-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 border border-indigo-100">
				<MailCheck className="h-6 w-6" />
			</div>

			<div className="space-y-2">
				<h2 className="text-2xl font-bold text-slate-900 tracking-tight">
					Check your inbox
				</h2>
				<p className="text-sm text-slate-500">
					We've sent a verification link to{" "}
					<span className="font-semibold text-slate-800">{emailTarget}</span>.
					Click the link in the email to verify your address and continue.
				</p>
			</div>

			{/* Instructional Tips Callout box block */}
			<div className="bg-slate-50 rounded-xl p-4 border border-slate-100 flex items-start space-x-3 text-left">
				<HelpCircle className="h-4 w-4 text-slate-400 mt-0.5 shrink-0" />
				<div className="space-y-1">
					<h4 className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
						Tips
					</h4>
					<p className="text-xs text-slate-500 leading-relaxed">
						Haven't received the email? Check your spam or junk folder, or click
						below to generate a new transmission.
					</p>
					<button
						onClick={() => handleResend(emailTarget)}
						className="text-xs font-bold text-indigo-600 hover:text-indigo-700 mt-1 block transition-colors">
						Resend Email
					</button>
					{message && <p className="text-xs text-green-600 mt-1">{message}</p>}
					{errorMessage && <p className="text-xs text-red-600 mt-1">{errorMessage}</p>}
				</div>
			</div>

			<div className="pt-2 text-center sm:text-left">
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