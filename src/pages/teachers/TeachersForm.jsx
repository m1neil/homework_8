import { useState } from 'react'
import { useLocation } from 'react-router'

function TeachersForm() {
	const { state } = useLocation()
	const [teacher, setTeacher] = useState(
		() => state?.teacher ?? { name: '', subject: '', photo: '' }
	)

	const handleTeacherChange = e => {
		const input = e.target
		const value = input.value
		const nameField = input.name
		setTeacher(prevTeacher => ({ ...prevTeacher, [nameField]: value }))
	}

	const onSubmit = e => {
		e.preventDefault()
		if (!isRequiredFieldsFilled()) return
		const methodFetch = state?.teacher ? 'put' : 'post'
	}

	const isRequiredFieldsFilled = () => {
		return teacher.name && teacher.subject
	}

	const cancelData = () => {
		setTeacher({ name: '', subject: '', photo: '' })
	}

	return (
		<section className="editor">
			<div className="editor__container">
				<h1 className="editor__title title">
					{state?.teacher ? 'Teacher editing' : 'Add a new teacher'}
				</h1>
				<form onSubmit={onSubmit} action="#" className="editor__form form">
					<div className="form__row">
						<label htmlFor="#" className="form__label">
							Имя
						</label>
						<input
							name="name"
							value={teacher.name}
							type="text"
							className="form__input input"
							onChange={handleTeacherChange}
						/>
					</div>
					<div className="form__row">
						<label htmlFor="#" className="form__label">
							Предмет
						</label>
						<input
							name="subject"
							value={teacher.subject}
							type="text"
							className="form__input input"
							onChange={handleTeacherChange}
						/>
					</div>
					<div className="form__row">
						<label htmlFor="#" className="form__label">
							Фото
						</label>
						<input
							name="photo"
							value={teacher.photo}
							type="text"
							className="form__input input"
							onChange={handleTeacherChange}
						/>
					</div>
					<div className="form__actions">
						<button type="submit" className="form__button button button--green">
							{state?.teacher ? 'Update teachers' : 'Add new teacher'}
						</button>
						<button
							type="button"
							className="form__button button"
							disabled={!isRequiredFieldsFilled()}
							onClick={cancelData}
						>
							Cancel
						</button>
					</div>
				</form>
			</div>
		</section>
	)
}

export default TeachersForm
