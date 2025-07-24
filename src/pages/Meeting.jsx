import frontRoutes from '@src/routes/frontRoutes'
import { useEffect } from 'react'
import { Link } from 'react-router'
import ErrorMessage from '../components/ErrorMessage'
import Loader from '../components/Loader'
import useTeachersApi from '../hooks/useTeachersApi'
import ListTeacher from './teachers/components/ListTeacher'

function Meeting() {
	const {
		data: teachers,
		isLoading,
		error,
		getTeachesMeeting
	} = useTeachersApi()

	useEffect(() => {
		getTeachesMeeting()
	}, [])

	return (
		<section className="meeting">
			<div className="meeting__container">
				<h1 className="meeting__title title">Participants in the way</h1>
				<div className="meeting__info info">
					{teachers.length > 0
						? `Amount teachers ${teachers.length} To call to meeting:`
						: 'Nothing!'}
				</div>
				{!!teachers.length && (
					<ListTeacher className="meeting__list" teachersList={teachers} />
				)}
				{isLoading && (
					<div className="meeting__loader">
						<Loader />
					</div>
				)}
				{error && <ErrorMessage text={error.message} />}
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
