// import { useLocation, Link } from "react-router-dom";
// import { ChevronRight, Home } from "lucide-react";

import { ChevronRight } from "lucide-react";

// export function Breadcrumbs() {
// 	const location = useLocation();
// 	const pathnames = location.pathname.split("/").filter((x) => x);

// 	// Helper to format path tokens into readable text (e.g., 'new-request' -> 'New Request')
// 	const formatLabel = (string) => {
// 		return string
// 			.split("-")
// 			.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
// 			.join(" ");
// 	};

// 	return (
// 		<nav
// 			aria-label="Breadcrumb"
// 			className="flex items-center space-x-2 text-sm text-slate-500 font-medium"
// 		>
// 			<Link
// 				to="/"
// 				className="flex items-center hover:text-slate-900 transition-colors"
// 			>
// 				<Home className="h-4 w-4" />
// 			</Link>

// 			{pathnames.map((name, index) => {
// 				const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
// 				const isLast = index === pathnames.length - 1;

// 				// Skip rendering raw system grouping IDs like 'dashboard' if desired, or map directly
// 				if (name.toLowerCase() === "dashboard") return null;

// 				return (
// 					<div key={routeTo} className="flex items-center space-x-2">
// 						<ChevronRight className="h-4 w-4 text-slate-400 shrink-0" />
// 						{isLast ? (
// 							<span className="text-slate-900 font-semibold aria-current='page'">
// 								{formatLabel(name)}
// 							</span>
// 						) : (
// 							<Link
// 								to={routeTo}
// 								className="hover:text-slate-900 transition-colors"
// 							>
// 								{formatLabel(name)}
// 							</Link>
// 						)}
// 					</div>
// 				);
// 			})}
// 		</nav>
// 	);
// }



export default function Breadcrumbs({ items = [] }) {
	return (
		<div className="flex items-center gap-2 text-sm text-slate-500">
			{items.map((item, index) => (
				<div key={item} className="flex items-center gap-2">
					<span>{item}</span>

					{index !== items.length - 1 && <ChevronRight size={14} />}
				</div>
			))}
		</div>
	);
}