import { memo } from "react";
import PropTypes from "prop-types";
import "./testimonials.css";
import { testimonialData } from "../../projectData";
const TestimonialCard = memo(({ data }) => {
	return (
		<div className='testimonial-card'>
			<div className='stars'>
				{[...Array(5)].map((_, index) => (
					<span
						key={index}
						className={`star ${index < data.rating ? "filled" : ""}`}
					>
						★
					</span>
				))}
			</div>
			<p className='quote'>{data.quote}</p>
			<h3 className='name'>{data.name}</h3>
			<p className='position'>{data.position}</p>
		</div>
	);
});

TestimonialCard.displayName = "TestimonialCard";
TestimonialCard.propTypes = {
	data: PropTypes.shape({
		rating: PropTypes.number.isRequired,
		quote: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired,
		position: PropTypes.string.isRequired,
	}).isRequired,
};

const Testimonials = () => {
	return (
		<div className='testimonials-section'>
			<div className='testimonials-container'>
				<div className='testimonials-header'>
					<h2 className='heading'>Recommended</h2>
					<p className='subheading'>by our Fiver Clients</p>
				</div>

				<div className='testimonials-grid'>
					{testimonialData.map((data, index) => (
						<TestimonialCard key={index} data={data} />
					))}
				</div>
			</div>
		</div>
	);
};

export default memo(Testimonials);
