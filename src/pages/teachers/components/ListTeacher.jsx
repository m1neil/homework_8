import frontRoutes from '@src/routes/frontRoutes'
import { Link } from 'react-router'
import TeacherCard from './TeacherCard'

function ListTeacher({
	className,
	teachersList,
	selectedTeachersId,
	onSelect,
	onDelete
}) {
	const getAnimationDelay = indexElement => ({
		animationDelay: `${indexElement * 0.15}s`
	})

	const createActions = teacher => {
		return (
			<div className="list-teachers__actions">
				<Link
					to={frontRoutes.navigate.teachers.getEdit(teacher.id)}
					state={{ teacher: { ...teacher } }}
					className="list-teachers__button button"
				>
					Edit
				</Link>
				<button
					type="button"
					className="list-teachers__button button button--red"
					onClick={() => onDelete(teacher.id)}
				>
					Delete
				</button>
			</div>
		)
	}

	if (!teachersList.length)
		return <div className="info">The list of teachers is empty!</div>

	return (
		<div className={`${className} list-teachers`}>
			{teachersList.map((teacher, index) => (
				<div
					key={teacher.id}
					className="list-teachers__item"
					style={getAnimationDelay(index)}
				>
					<TeacherCard
						onSelect={onSelect ?? false}
						isSelect={selectedTeachersId.includes(teacher.id)}
						{...teacher}
					/>
					{onDelete && createActions(teacher)}
				</div>
			))}
		</div>
	)
}

export default ListTeacher
