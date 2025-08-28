import projectCards from "../../projectData";
import ProjectCard from "../ProjectCard";
import ComputerCanvas from "../canvas/Computers";

// import ProjectCard from "../ProjectCard";
// ..

function ProjectComponent() {
	//   console.log(projectData);

	return (
		<>
			<div className='target-dark target'></div>
			{/* <!-- loader --> */}
			<div className='loader-container'>
				<div className='atom'>
					<div className='electron'></div>
					<div className='electron-alpha'></div>
					<div className='electron-omega'></div>
				</div>
			</div>

			<div
				className='container pt-5'
				style={{ width: "100%", minHeight: "80%" }}
			>
				<section>
					<div className='px-3 pt-5'>
						<div className='row'>
							<div className='col-md-6 godown'>
								<ComputerCanvas />
								{/* <img
									src='src\assets\images\tumblr_mrddl0icjN1s2d5eso1_500.gif'
									alt=''
									style={{ border: "20px" }}
								/> */}
							</div>
							<div
								data-aos='fade-right'
								data-aos-easing='linear'
								data-aos-duration='1200'
								className='dropdown col-md-6 d-flex mt-5 flex-column text-center justify-content-center animate__animated animate__zoomIn animate__delay-1s'
							>
								<h2 className='main-heading mb-0 projects_head'>
									My <span className='my_projects'>Projects</span>
								</h2>
								<p className='pre-heading font-weight-bolder mb-0 mt-3 text-center animate__animated animate__zoomIn animate__delay-2s'>
									My projects makes use of vast variety of latest technology
									tools. My best experience is to create Computer Science
									projects and deploy them to web applications using cloud
									infrastructure.
								</p>
							</div>
						</div>
					</div>
				</section>
			</div>
			{/* <div className="target-dark target"></div> */}
			<div className='project-box' style={{ padding: "20px" }}>
				<div
					className='row row-cols-1 row-cols-md-5 row-cols-sm-3 page-content projectcards '
					style={{ marginBottom: "100px" }}
				>
					{/* ================================================================================================== */}
					{projectCards.map(
						({ title, cardImage, Previewlink, Githublink, Id }) => {
							return (
								<ProjectCard
									title={title}
									cardImage={cardImage}
									Previewlink={Previewlink}
									Githublink={Githublink}
									Id={Id}
									key={Id}
								/>
							);
						}
					)}
				</div>
			</div>
			<div className='cursor-dot-outline'></div>
			<div className='cursor-dot'></div>
		</>
	);
}

export default ProjectComponent;
