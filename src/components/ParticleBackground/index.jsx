import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

const ParticleBackground = () => {
	const containerRef = useRef(null);
	const rendererRef = useRef(null);
	const frameRef = useRef(null);

	const particleCount = useMemo(() => {
		// Adjust particle count based on screen size
		return window.innerWidth < 768 ? 1500 : 3000;
	}, []);

	useEffect(() => {
		let scene, camera;
		const particles = [];

		// Initialize scene
		scene = new THREE.Scene();
		camera = new THREE.PerspectiveCamera(
			75,
			window.innerWidth / window.innerHeight,
			0.1,
			1000
		);

		// Optimize renderer
		rendererRef.current = new THREE.WebGLRenderer({
			powerPreference: "high-performance",
			antialias: false,
			stencil: false,
			depth: false,
		});

		// Use instanced mesh for better performance
		const geometry = new THREE.BufferGeometry();
		const material = new THREE.PointsMaterial({
			size: 0.005,
			transparent: true,
			opacity: 0.8,
			sizeAttenuation: true,
		});

		// Create particle positions
		const positions = new Float32Array(particleCount * 3);
		const velocities = new Float32Array(particleCount * 3);

		for (let i = 0; i < particleCount * 3; i += 3) {
			positions[i] = Math.random() * 2 - 1;
			positions[i + 1] = Math.random() * 2 - 1;
			positions[i + 2] = Math.random() * 2 - 1;

			velocities[i] = (Math.random() - 0.5) * 0.002;
			velocities[i + 1] = (Math.random() - 0.5) * 0.002;
			velocities[i + 2] = (Math.random() - 0.5) * 0.002;
		}

		geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
		const points = new THREE.Points(geometry, material);
		scene.add(points);

		camera.position.z = 1;

		// Throttled animation frame
		let lastTime = 0;
		const FRAME_RATE = 1000 / 30; // 30 FPS cap

		const animate = (currentTime) => {
			if (currentTime - lastTime >= FRAME_RATE) {
				const positions = points.geometry.attributes.position.array;

				for (let i = 0; i < positions.length; i += 3) {
					positions[i] += velocities[i];
					positions[i + 1] += velocities[i + 1];
					positions[i + 2] += velocities[i + 2];

					// Boundary check and reset
					if (Math.abs(positions[i]) > 1) velocities[i] *= -1;
					if (Math.abs(positions[i + 1]) > 1) velocities[i + 1] *= -1;
					if (Math.abs(positions[i + 2]) > 1) velocities[i + 2] *= -1;
				}

				points.geometry.attributes.position.needsUpdate = true;
				rendererRef.current.render(scene, camera);
				lastTime = currentTime;
			}

			frameRef.current = requestAnimationFrame(animate);
		};

		// Optimized resize handler
		const handleResize = () => {
			const width = window.innerWidth;
			const height = window.innerHeight;

			camera.aspect = width / height;
			camera.updateProjectionMatrix();
			rendererRef.current.setSize(width, height);
		};

		const debouncedResize = debounce(handleResize, 250);
		window.addEventListener("resize", debouncedResize);

		// Initial setup
		handleResize();
		animate(0);

		// Cleanup
		return () => {
			window.removeEventListener("resize", debouncedResize);
			if (frameRef.current) {
				cancelAnimationFrame(frameRef.current);
			}
			if (rendererRef.current) {
				rendererRef.current.dispose();
			}
			geometry.dispose();
			material.dispose();
		};
	}, [particleCount]);

	return (
		<div
			ref={containerRef}
			style={{ position: "fixed", top: 0, left: 0, zIndex: -1 }}
		/>
	);
};

// Utility function for debouncing
function debounce(func, wait) {
	let timeout;
	return function executedFunction(...args) {
		const later = () => {
			clearTimeout(timeout);
			func(...args);
		};
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
	};
}

export default ParticleBackground;
