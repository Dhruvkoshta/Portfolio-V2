// eslint-disable-next-line react/prop-types
function TechStackIcons({ icon }) {
	return (
		<div
			className='tech-icon p-3'
			style={{
				width: "100px",
				height: "100px",
				cursor: "grab",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			{icon}
		</div>
	);
}

export default TechStackIcons;
