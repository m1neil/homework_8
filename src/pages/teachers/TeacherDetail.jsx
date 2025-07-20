import { useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router'
import frontRoutes from '../../routes/frontRoutes'

function TeacherDetail() {
	const { state } = useLocation()
	const navigate = useNavigate()

	useEffect(() => {
		if (!state?.teacher) navigate(frontRoutes.navigate.teachers.index)
	}, [])

	if (!state?.teacher) return

	const { teacher } = state
	return (
		<section className="detail">
			<div className="detail__container">
				<div className="detail__img">
					<img className="ibg" src={teacher.photo} alt="photo" />
				</div>
				<h1 className="detail__title title">{teacher.name}</h1>
				<div className="detail__subject">
					<span>Subject:</span> {teacher.subject}
				</div>
				<Link
					to={frontRoutes.navigate.teachers.index}
					className="detail__button button"
				>
					On the page of teachers
				</Link>
			</div>
		</section>
	)
}

export default TeacherDetail
