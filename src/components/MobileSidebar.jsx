import { X } from "lucide-react";
// import Sidebar from "./Sidebar";

// export default function MobileSidebar({ open, onClose, items, theme, user }) {
// 	return (
// 		<>
// 			{open && (
// 				<div
// 					onClick={onClose}
// 					className="
//           fixed inset-0
//           bg-black/50
//           z-40
//           lg:hidden
//           "
// 				/>
// 			)}

// 			<aside
// 				className={`
//           fixed top-0 left-0
//           z-50
//           h-screen
//           w-72
//           bg-white
//           transition-transform
//           duration-300
//           lg:hidden

//           ${open ? "translate-x-0" : "-translate-x-full"}
//         `}
// 			>
// 				<div className="flex justify-end p-4">
// 					<button onClick={onClose}>
// 						<X size={22} />
// 					</button>
// 				</div>

// 				<Sidebar items={items} theme={theme} user={user} />
// 			</aside>
// 		</>
// 	);
// }

// components/MobileSidebar.jsx


import SidebarContent from "./SidebarContent"

export default function MobileSidebar({
  open,
  onClose,
  items,
  theme,
  user,
}) {
  return (
    <>
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed top-0 left-0
          h-screen
          w-72
          bg-white
          z-50
          lg:hidden
          transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="flex justify-end p-4">
          <button onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="flex flex-col h-full">
          <SidebarContent
            items={items}
            theme={theme}
            user={user}
          />
        </div>
      </aside>
    </>
  )
}