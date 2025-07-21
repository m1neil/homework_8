import { Link } from 'react-router'
import frontRoutes from '@src/routes/frontRoutes'

function Home() {
	return (
		<section className="home">
			<div className="home__container">
				<h1 className="home__title title">
					We invite you to the application of "Teachers"!
				</h1>
				<div className="home__text text">
					<p>
						Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quod non
						magnam excepturi error aperiam, nihil obcaecati recusandae vel
						asperiores nesciunt ea placeat? Ad eum quo repudiandae ratione,
						repellendus iure. Animi?
					</p>
				</div>
				<div className="home__actions">
					<Link
						to={frontRoutes.navigate.teachers.index}
						className="home__link button"
					>
						View teachers
					</Link>
					<Link to={frontRoutes.navigate.meeting} className="home__link button">
						View the list for meeting
					</Link>
				</div>
			</div>
		</section>
	)
}

export default Home
