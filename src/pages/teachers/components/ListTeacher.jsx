import frontRoutes from '@src/routes/frontRoutes'
import { Link } from 'react-router'
import TeacherCard from './TeacherCard'

function ListTeacher({
	className,
	teachersList,
	onSelect,
	selectedTeachersId,
	onDelete
}) {
	const getAnimationDelay = indexElement => ({
		animationDelay: `${indexElement * 0.15}s`
	})

	const createActions = id => {
		return (
			<div className="list-teachers__actions">
				<Link
					to={frontRoutes.navigate.teachers.getEdit(id)}
					className="list-teachers__button button"
				>
					Edit
				</Link>
				<button
					type="button"
					className="list-teachers__button button button--red"
					onClick={() => onDelete(id)}
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
						isSelect={
							selectedTeachersId
								? selectedTeachersId.includes(teacher.id)
								: false
						}
						{...teacher}
					/>
					{onDelete && createActions(teacher.id)}
				</div>
			))}
		</div>
	)
}

export default ListTeacher
