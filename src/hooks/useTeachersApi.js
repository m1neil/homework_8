import axios from 'axios'
import { useCallback, useState } from 'react'
import apiRoutes from '../api/apiRoutes'

const useTeachersApi = (isInitLoading = false) => {
	const [data, setData] = useState(() => [])
	const [isLoading, setIsLoading] = useState(isInitLoading)
	const [error, setError] = useState(null)

	const getAllTeachers = useCallback(async () => {
		setIsLoading(true)
		setError(null)
		try {
			const response = await axios.get(apiRoutes.getAllTeachers)
			setData(response.data)
		} catch (error) {
			setError(error)
		} finally {
			setIsLoading(false)
		}
	}, [])

	const deleteTeacherById = async id => {
		setError(null)
		try {
			await axios.delete(apiRoutes.deleteTeacherById(id))
		} catch (error) {
			setError(error)
		}
	}

	return { data, isLoading, error, setData, getAllTeachers, deleteTeacherById }
}

export default useTeachersApi
