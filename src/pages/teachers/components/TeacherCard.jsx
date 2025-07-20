import { Link } from 'react-router'
import frontRoutes from '../../../routes/frontRoutes'

function TeacherCard({ id, name, subject, photo, isSelect, onSelect }) {
	console.log('renderCard')

	return (
		<article className="teacher-card">
			<Link
				to={frontRoutes.navigate.teachers.getDetail(id)}
				className="teacher-card__img"
			>
				<img className="ibg" src={photo} alt="Photo of the teacher-card" />
			</Link>
			<div className="teacher-card__body">
				<h3 className="teacher-card__name">
					<Link to={frontRoutes.navigate.teachers.getDetail(id)}>{name}</Link>
				</h3>
				<div className="teacher-card__subject">
					<span>Subject:</span> {subject}
				</div>
			</div>
			{onSelect && (
				<button
					onClick={() => onSelect(id)}
					type="button"
					className={`teacher-card__button button button--small ${
						isSelect ? 'button--green' : ''
					}`}
				>
					{isSelect ? 'Selected' : 'Request to the meeting'}
				</button>
			)}
		</article>
	)
}

export default TeacherCard
