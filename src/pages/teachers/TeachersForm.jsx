import { useState } from 'react'
import { useLocation } from 'react-router'
import ErrorMessage from '../../components/ErrorMessage'
import useTeachersApi from '../../hooks/useTeachersApi'

function TeachersForm() {
	const { state } = useLocation()
	const [teacher, setTeacher] = useState(() =>
		state?.teacher ? { ...state.teacher } : { name: '', subject: '', photo: '' }
	)
	const { isLoading, error, setNewTeacher, updateTeacher } = useTeachersApi()
	const [errorData, setErrorData] = useState('')

	const handleTeacherChange = e => {
		const input = e.target
		const value = input.value
		const nameField = input.name
		setTeacher(prevTeacher => ({ ...prevTeacher, [nameField]: value }))
	}

	const isValidTeacherPhoto = () => {
		const regExp = /^(https?:\/\/.*\.(jpg|jpeg|webp|png))$/
		const isValidAddress = regExp.test(teacher.photo)
		if (!isValidAddress) setErrorData('Not a valid photo address!')
		else setErrorData('')
		return isValidAddress
	}

	const isFilledRequiredFields = () => {
		return teacher.name.trim() && teacher.subject.trim()
	}

	const trimTeacher = () => {
		const transformTeacher = {}
		for (const key in teacher) {
			const value = teacher[key]
			transformTeacher[key] = typeof value === 'string' ? value.trim() : value
		}
		return transformTeacher
	}

	const onSubmit = async e => {
		e.preventDefault()

		if (!isFilledRequiredFields()) {
			setErrorData(
				'Check the filling of mandatory fields (the name of the teacher and the subject that he leads)'
			)
			return
		} else setErrorData('')
		if (teacher.photo.trim() && !isValidTeacherPhoto()) return

		const methodFetch = state?.teacher ? 'put' : 'post'
		const transformTeacher = trimTeacher()

		if (methodFetch === 'post') {
			await setNewTeacher(transformTeacher)
			cancelData()
		} else {
			await updateTeacher(transformTeacher)
			state.teacher = { ...transformTeacher }
		}
	}

	const isEqualObjects = (a, b) => JSON.stringify(a) === JSON.stringify(b)

	const cancelData = () => {
		setTeacher(prevTeacher => ({
			...prevTeacher,
			name: '',
			subject: '',
			photo: ''
		}))
	}

	const getTextButtonSubmit = () => {
		let btnText
		if (!isLoading)
			btnText = state?.teacher ? 'Update teachers' : 'Add new teacher'
		else btnText = 'Sending data ...'
		return btnText
	}

	const isCanClear = () => {
		return teacher.name.trim() || teacher.subject.trim() || teacher.photo.trim()
	}

	const onRemoveError = () => {
		if (errorData) setErrorData('')
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
								Имя
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
							<label htmlFor="subject" className="form__label">
								Предмет
							</label>
							<input
								name="subject"
								id="subject"
								value={teacher.subject}
								type="text"
								className="form__input input"
								placeholder="The Vedas subject the teacher"
								onChange={handleTeacherChange}
								onFocus={onRemoveError}
							/>
						</div>
						<div className="form__row">
							<label htmlFor="photo" className="form__label">
								Фото
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
							disabled={
								isLoading ||
								(state?.teacher && isEqualObjects(teacher, state?.teacher))
							}
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
					{errorData && <ErrorMessage text={errorData} />}
					{error && <ErrorMessage text={error} />}
				</form>
			</div>
		</section>
	)
}

export default TeachersForm
