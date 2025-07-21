import ErrorMessage from '@components/ErrorMessage'
import useTeachersApi from '@src/hooks/useTeachersApi'
import { useState } from 'react'
import { useLocation } from 'react-router'

const isEqualObjects = (a, b) => JSON.stringify(a) === JSON.stringify(b)

function TeachersForm() {
	const { state } = useLocation()
	const [teacher, setTeacher] = useState(() =>
		state?.teacher ? { ...state.teacher } : { name: '', subject: '', photo: '' }
	)
	const { isLoading, error, setNewTeacher, updateTeacher } = useTeachersApi()
	const [errorData, setErrorData] = useState('')
	const [isDisabledSendData, setIsDisabledSendData] = useState(true)

	const handleTeacherChange = e => {
		const input = e.target
		const value = input.value
		const nameField = input.name
		const newTeacher = { ...teacher, [nameField]: value }
		setTeacher(() => newTeacher)
		setIsDisabledSendData(
			!isFilledRequiredFields(newTeacher) ||
				(state?.teacher &&
					setIsDisabledSendData(isEqualObjects(state.teacher, newTeacher)))
		)
	}

	const onRemoveError = () => {
		if (errorData) setErrorData('')
	}

	const onSubmit = async e => {
		e.preventDefault()
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
	}

	const isValidFormData = () => {
		if (!isFilledRequiredFields()) {
			setErrorData(
				'Check the filling of mandatory fields (the name of the teacher and the subject that he leads)'
			)
			return false
		} else setErrorData('')

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
		return teacherData.name.trim() && teacherData.subject.trim()
	}

	const trimTeacher = () => {
		const transformTeacher = {}
		for (const key in teacher) {
			const value = teacher[key]
			transformTeacher[key] = typeof value === 'string' ? value.trim() : value
		}
		return transformTeacher
	}

	const cancelData = () => {
		setTeacher(prevTeacher => ({
			...prevTeacher,
			name: '',
			subject: '',
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
		return teacher.name.trim() || teacher.subject.trim() || teacher.photo.trim()
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
					{errorData && <ErrorMessage text={errorData} />}
					{error && <ErrorMessage text={error} />}
				</form>
			</div>
		</section>
	)
}

export default TeachersForm
