import SidebarContent from "./SidebarContent"

export default function Sidebar(props) {
	const { theme } = props;
	

  return (
		<aside
			className={`
        hidden lg:flex
        flex-col
        w-64
        border-r
        ${theme?.light || "bg-white"}
        ${theme?.border || "border-slate-200"}
      `}
		>
			<SidebarContent {...props} />
		</aside>
	);
}