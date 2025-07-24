import ErrorMessage from '@components/ErrorMessage'
import useTeachersApi from '@src/hooks/useTeachersApi'
import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router'

const isEqualObjects = (a, b) => JSON.stringify(a) === JSON.stringify(b)

function TeachersForm() {
	const { state } = useLocation()
	const [isSuccess, setIsSuccess] = useState(false)
	const refInterval = useRef(null)
	const [teacher, setTeacher] = useState(() =>
		state?.teacher
			? { ...state.teacher }
			: { name: '', subjectId: '', photo: '' }
	)
	const {
		data: subjects,
		isLoading,
		error,
		setNewTeacher,
		updateTeacher,
		getAllSubjects
	} = useTeachersApi()
	const [errorData, setErrorData] = useState('')
	const [isDisabledSendData, setIsDisabledSendData] = useState(true)
	const DEFAULT_PHOTO = 'https://cdn-icons-png.flaticon.com/512/168/168726.png'

	useEffect(() => {
		if (!isSuccess) return
		refInterval.current = setTimeout(() => {
			setIsSuccess(false)
		}, 3000)
		return () => clearTimeout(refInterval.current)
	}, [isSuccess])

	const handleTeacherChange = e => {
		const target = e.target
		const value = target.value
		const nameField = target.name
		const newTeacher = { ...teacher, [nameField]: value }
		setTeacher(() => newTeacher)
		setIsDisabledSendData(
			!isFilledRequiredFields(newTeacher) ||
				(state?.teacher && isEqualObjects(state.teacher, newTeacher))
		)
	}

	useEffect(() => {
		getAllSubjects()
	}, [])

	const onRemoveError = () => {
		if (errorData) setErrorData('')
	}

	const onSubmit = async e => {
		e.preventDefault()
		refInterval.current = null

		if (!isValidFormData()) return

		const methodFetch = state?.teacher ? 'put' : 'post'
		const transformTeacher = trimTeacher()

		if (
			methodFetch === 'put' &&
			isEqualObjects(transformTeacher, state.teacher)
		) {
			setErrorData('Data has not changed!')
			return
		} else setErrorData('')

		if (methodFetch === 'post') {
			await setNewTeacher(transformTeacher)
			cancelData()
		} else {
			await updateTeacher(transformTeacher)
			state.teacher = { ...transformTeacher }
			setIsDisabledSendData(true)
		}

		setIsSuccess(true)
	}

	const isValidFormData = () => {
		if (teacher.photo.trim() && !isValidTeacherPhoto()) {
			setErrorData('Not a valid photo address!')
			return false
		} else setErrorData('')
		return true
	}

	const isValidTeacherPhoto = () => {
		const regExp = /^(https?:\/\/.*\.(jpg|jpeg|webp|png))$/
		return regExp.test(teacher.photo)
	}

	const isFilledRequiredFields = (teacherData = teacher) => {
		return teacherData.name.trim() && teacherData.subjectId
	}

	const trimTeacher = () => {
		const transformTeacher = {}
		for (const key in teacher) {
			if (key === 'subject') continue
			const value = teacher[key]
			if (key === 'photo' && !value) {
				transformTeacher[key] = DEFAULT_PHOTO
			} else
				transformTeacher[key] = typeof value === 'string' ? value.trim() : value
		}
		return transformTeacher
	}

	const cancelData = () => {
		setTeacher(prevTeacher => ({
			...prevTeacher,
			name: '',
			subjectId: '',
			photo: ''
		}))
		setIsDisabledSendData(true)
	}

	const getTextButtonSubmit = () => {
		let btnText
		if (!isLoading)
			btnText = state?.teacher ? 'Update teachers' : 'Add new teacher'
		else btnText = 'Sending data ...'
		return btnText
	}

	const isCanClear = () => {
		return !!(teacher.name.trim() || teacher.subjectId || teacher.photo.trim())
	}

	return (
		<section className="editor">
			<div className="editor__container">
				<h1 className="editor__title title">
					{state?.teacher ? 'Teacher editing' : 'Add a new teacher'}
				</h1>
				<form onSubmit={onSubmit} action="#" className="editor__form form">
					<div className="form__body">
						<div className="form__row">
							<label htmlFor="name" className="form__label">
								Name
							</label>
							<input
								name="name"
								id="name"
								value={teacher.name}
								type="text"
								className="form__input input"
								placeholder="Keep the name of the teacher"
								onChange={handleTeacherChange}
								onFocus={onRemoveError}
							/>
						</div>
						<div className="form__row">
							<label htmlFor="subjectId" className="form__label">
								Subject
							</label>
							<select
								value={teacher.subjectId}
								name="subjectId"
								id="subjectId"
								className="form__select select"
								onChange={handleTeacherChange}
							>
								<option value="" disabled className="select__option">
									Select the subject
								</option>
								{subjects.map(subject => (
									<option
										key={subject.id}
										value={subject.id}
										className="select__option"
									>
										{subject.name}
									</option>
								))}
							</select>
						</div>
						<div className="form__row">
							<label htmlFor="photo" className="form__label">
								Photo
							</label>
							<input
								name="photo"
								id="photo"
								value={teacher.photo}
								type="text"
								className="form__input input"
								placeholder="Enter URL photos"
								onChange={handleTeacherChange}
								onFocus={onRemoveError}
							/>
						</div>
					</div>
					<div className="form__actions">
						<button
							disabled={isLoading || isDisabledSendData}
							type="submit"
							className="form__button button button--green"
						>
							{getTextButtonSubmit()}
						</button>
						<button
							type="button"
							className="form__button button"
							disabled={!isCanClear()}
							onClick={cancelData}
						>
							Clear
						</button>
					</div>
					{!errorData && !error && isSuccess && (
						<div className="success">
							{state?.teacher
								? 'The teacher is successfully updated'
								: 'The teacher is successfully added'}
						</div>
					)}
					{errorData && <ErrorMessage text={errorData} />}
					{error && <ErrorMessage text={error} />}
				</form>
			</div>
		</section>
	)
}

export default TeachersForm
