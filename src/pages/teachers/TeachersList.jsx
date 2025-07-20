import Loader from '@components/Loader'
import useTeachersApi from '@src/hooks/useTeachersApi'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router'
import frontRoutes from '../../routes/frontRoutes'
import ListTeacher from './components/ListTeacher'

function TeachersList() {
	const {
		data: teachers,
		isLoading,
		error,
		setData: setTeachers,
		getAllTeachers,
		deleteTeacherById
	} = useTeachersApi(true)
	const [selectedTeachersId, setSelectedTeachersId] = useState(() => [])
	const navigate = useNavigate()

	useEffect(() => {
		getAllTeachers()
	}, [])

	const onSelect = idTeacher => {
		if (selectedTeachersId.includes(idTeacher)) {
			setSelectedTeachersId(prevListIds =>
				prevListIds.filter(id => id !== idTeacher)
			)
		} else setSelectedTeachersId(prevListIds => [...prevListIds, idTeacher])
	}

	const onDelete = idTeacher => {
		setTeachers(prevList =>
			prevList.filter(teacher => teacher.id !== idTeacher)
		)
		deleteTeacherById(idTeacher)
	}

	const onCallTeachersToMeet = () => {
		navigate(frontRoutes.navigate.meeting, {
			state: {
				teachers: teachers.filter(teacher =>
					selectedTeachersId.includes(teacher.id)
				)
			}
		})
	}

	let content
	if (isLoading) {
		content = (
			<div className="teachers__loader">
				<Loader />
			</div>
		)
	} else if (error) {
		content = <div className="error">{error.message}</div>
	} else
		content = (
			<ListTeacher
				className="teachers__list"
				teachersList={teachers}
				selectedTeachersId={selectedTeachersId}
				onSelect={onSelect}
				onDelete={onDelete}
			/>
		)

	return (
		<section className="teachers">
			<div className="teachers__container">
				<h1 className="teachers__title title">List of teachers</h1>
				<div className="teachers__actions">
					<Link className="teachers__button button button--green">
						Add new teacher
					</Link>
					{teachers.length > 0 && (
						<button
							disabled={!selectedTeachersId.length}
							type="button"
							className="teachers__button button"
							onClick={onCallTeachersToMeet}
						>
							Call {selectedTeachersId.length} teachers for fees
						</button>
					)}
				</div>
				{content}
			</div>
		</section>
	)
}

export default TeachersList
