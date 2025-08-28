import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

function Particles_component() {
	const particlesInit = useCallback(async (engine) => {
		// you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
		// this loads the tsparticles package bundle, it's the easiest method for getting everything ready
		// starting from v2 you can add only the features you need reducing the bundle size
		await loadFull(engine);
	}, []);

	const particlesLoaded = useCallback(async () => {}, []);

	return (
		<Particles
			id='tsparticles'
			init={particlesInit}
			loaded={particlesLoaded}
			options={{
				// background: {
				//   color: {
				//     value: "#0d47a1",
				//   },
				// },
				fpsLimit: 30,

				particles: {
					number: {
						value: 50,
						density: {
							enable: true,
							value_area: 1000,
						},
					},
					color: {
						value: ["#2EB67D", "#ECB22E", "#E01E5B", "#36C5F0"],
					},
					shape: {
						type: "circle",
						stroke: {
							width: 0,
							color: "#fff",
						},
						polygon: {
							nb_sides: 5,
						},
						image: {
							src: "https://cdn.freebiesupply.com/logos/large/2x/slack-logo-icon.png",
							width: 100,
							height: 100,
						},
					},

					opacity: {
						value: 1,
						random: false,
						anim: {
							enable: false,
							speed: 1,
							opacity_min: 0.1,
							sync: false,
						},
					},
					size: {
						value: 7,
						random: true,
						anim: {
							enable: false,
							speed: 10,
							size_min: 10,
							sync: false,
						},
					},
					line_linked: {
						enable: true,
						distance: 150,
						color: "#808080",
						opacity: 0.4,
						width: 1,
					},
					move: {
						enable: true,
						speed: 1.5,
						direction: "none",
						random: false,
						straight: false,
						out_mode: "out",
						bounce: false,
						attract: {
							enable: false,
							rotateX: 600,
							rotateY: 1200,
						},
					},
				},
				interactivity: {
					detect_on: "window",
					events: {
						onhover: {
							enable: false,
							mode: "repulse",
						},
						onclick: {
							enable: false,
							mode: "push",
						},
					},
					modes: {
						repulse: {
							distance: 70,
							duration: 0.2,
						},
						push: {
							particles_nb: 4,
						},
					},
				},
				retina_detect: true,
			}}
		/>
	);
}

export default Particles_component;
