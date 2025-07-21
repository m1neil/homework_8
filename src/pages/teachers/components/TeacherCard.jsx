import { Link } from 'react-router'
import frontRoutes from '@src/routes/frontRoutes'

function TeacherCard({ id, name, subject, photo, isSelect, onSelect }) {
	return (
		<article className="teacher-card">
			<Link
				to={frontRoutes.navigate.teachers.getDetail(id)}
				state={{ teacher: { name, subject, photo } }}
				className="teacher-card__img"
			>
				<img className="ibg" src={photo} alt="Photo of the teacher-card" />
			</Link>
			<div className="teacher-card__body">
				<h3 className="teacher-card__name">
					<Link
						to={frontRoutes.navigate.teachers.getDetail(id)}
						state={{ teacher: { name, subject, photo } }}
					>
						{name}
					</Link>
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
