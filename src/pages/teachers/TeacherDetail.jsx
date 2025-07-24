import frontRoutes from '@src/routes/frontRoutes'
import { useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router'

function TeacherDetail() {
	const { state } = useLocation()
	const navigate = useNavigate()

	useEffect(() => {
		if (!state?.teacher) navigate(frontRoutes.navigate.teachers.index)
	}, [])

	if (!state?.teacher) return

	const getLinkFromPage = () => {
		const fromPage = {
			text: 'teachers',
			link: frontRoutes.navigate.teachers.index
		}
		if (state?.pageFrom === frontRoutes.pages.meeting) {
			fromPage.link = frontRoutes.navigate.meeting
			fromPage.text = 'meeting'
		}
		return fromPage
	}

	const fromPage = getLinkFromPage()

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
				<Link to={fromPage.link} className="detail__button button">
					On the page of {fromPage.text}
				</Link>
			</div>
		</section>
	)
}

export default TeacherDetail
