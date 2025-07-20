import { Link, useLocation } from 'react-router'
import frontRoutes from '../routes/frontRoutes'
import ListTeacher from './teachers/components/ListTeacher'

function Meeting() {
	const { state } = useLocation()
	console.log(state?.teachers)

	return (
		<section className="meeting">
			<div className="meeting__container">
				<h1 className="meeting__title title">Participants in the way</h1>
				<div className="meeting__info info">
					List of teachers ({state?.teachers.length ?? 0}) To call to meeting:
				</div>
				{state?.teachers && (
					<ListTeacher
						className="meeting__list"
						teachersList={state.teachers}
					/>
				)}
				<Link
					to={frontRoutes.navigate.teachers.index}
					className="meeting__button button"
				>
					Come back to the list of teachers
				</Link>
			</div>
		</section>
	)
}

export default Meeting
