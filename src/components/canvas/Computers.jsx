import { Suspense, useEffect, useState, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
import CanvasLoader from "../Loader";

function Computers({ isMobile }) {
	const { scene } = useGLTF("./desktop_pc/scene.gltf");
	const meshRef = useRef();

	useEffect(() => {
		// Optimize model
		scene.traverse((child) => {
			if (child.isMesh) {
				child.castShadow = false;
				child.receiveShadow = false;
				if (child.material) {
					child.material.side = 0;
				}
			}
		});

		return () => {
			scene.traverse((child) => {
				if (child.isMesh) {
					child.geometry.dispose();
					if (child.material) {
						child.material.dispose();
					}
				}
			});
		};
	}, [scene]);

	return (
		<mesh ref={meshRef}>
			<hemisphereLight intensity={0.15} groundColor='black' />
			<pointLight intensity={1} />
			<primitive
				object={scene}
				scale={isMobile ? 0.7 : 0.8}
				position={isMobile ? [0, -2, -2.2] : [0, -2.25, -1.5]}
				rotation={[-0.0, -0.2, -0.05]}
			/>
		</mesh>
	);
}

const ComputerCanvas = () => {
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		const mediaQuery = window.matchMedia("(max-width: 500px)");
		setIsMobile(mediaQuery.matches);

		const handleMediaQueryChange = (event) => {
			setIsMobile(event.matches);
		};

		mediaQuery.addEventListener("change", handleMediaQueryChange);
		return () =>
			mediaQuery.removeEventListener("change", handleMediaQueryChange);
	}, []);

	return (
		<Canvas
			frameloop='demand'
			shadows={false}
			camera={{ position: [20, 3, 5], fov: 25 }}
			gl={{
				powerPreference: "high-performance",
				antialias: false,
				stencil: false,
				depth: true,
			}}
			dpr={[1, 1.5]}
			style={{ height: "350px", cursor: "grab" }}
		>
			<Suspense fallback={<CanvasLoader />}>
				<OrbitControls
					autoRotate
					enableZoom={true}
					maxPolarAngle={Math.PI / 2}
					minPolarAngle={Math.PI / 2}
					rotateSpeed={0.5}
				/>
				<Computers isMobile={isMobile} />
			</Suspense>
			<Preload all />
		</Canvas>
	);
};

export default ComputerCanvas;
