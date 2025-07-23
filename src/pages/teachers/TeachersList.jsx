import Loader from '@components/Loader'
import useTeachersApi from '@src/hooks/useTeachersApi'
import frontRoutes from '@src/routes/frontRoutes'
import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import ListTeacher from './components/ListTeacher'

function TeachersList() {
	const {
		data: teachers,
		isLoading,
		error,
		setData: setTeachers,
		getAllTeachers,
		deleteTeacherById,
		setCallTeachersToMeeting,
		cancelTeachersFromMeeting
	} = useTeachersApi(true)
	const [selectedTeachersId, setSelectedTeachersId] = useState(() => [])

	useEffect(() => {
		getAllTeachers()
	}, [])

	console.log(teachers)

	useEffect(() => {
		if (!teachers.length) return
		const amountCallTeachers = teachers.reduce(
			(teachersOnMeeting, curTeacher) =>
				curTeacher.meeting
					? [...teachersOnMeeting, curTeacher.id]
					: teachersOnMeeting,
			[]
		)
		setSelectedTeachersId(amountCallTeachers)
	}, [teachers])

	const onSelect = idTeacher => {
		if (selectedTeachersId.includes(idTeacher)) {
			setSelectedTeachersId(prevList => prevList.filter(id => id !== idTeacher))
			cancelTeachersFromMeeting({ id: idTeacher })
		} else {
			setSelectedTeachersId(prevListIds => [...prevListIds, idTeacher])
			setCallTeachersToMeeting({ teacherIds: [idTeacher] })
		}
		setTeachers(prevTeachers =>
			prevTeachers.map(teacher =>
				teacher.id === idTeacher
					? { ...teacher, meeting: !teacher.meeting }
					: teacher
			)
		)
	}

	const onDelete = idTeacher => {
		setTeachers(prevList =>
			prevList.filter(teacher => teacher.id !== idTeacher)
		)
		deleteTeacherById(idTeacher)
	}

	return (
		<section className="teachers">
			<div className="teachers__container">
				<h1 className="teachers__title title">List of teachers</h1>
				<div className="teachers__actions">
					<Link
						to={frontRoutes.navigate.teachers.new}
						className="teachers__button button button--green"
					>
						Add new teacher
					</Link>
					{teachers.length > 0 && (
						<div type="button" className="teachers__info">
							Call {selectedTeachersId.length} teachers for fees
						</div>
					)}
				</div>
				{!isLoading && !error && (
					<ListTeacher
						className="teachers__list"
						teachersList={teachers}
						selectedTeachersId={selectedTeachersId}
						onSelect={onSelect}
						onDelete={onDelete}
					/>
				)}
				{isLoading && (
					<div className="teachers__loader">
						<Loader />
					</div>
				)}
				{error && <ErrorMessage text={error.message} />}
			</div>
		</section>
	)
}

export default TeachersList
