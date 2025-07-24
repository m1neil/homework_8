import axios from 'axios'
import { useCallback, useState } from 'react'
import apiRoutes from '../api/apiRoutes'

const useTeachersApi = (initData = [], isInitLoading = false) => {
	const [data, setData] = useState(() => initData)
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

	const getTeachesMeeting = useCallback(async () => {
		setIsLoading(true)
		setError(null)
		try {
			const response = await axios.get(apiRoutes.getTeachesMeeting)
			setData(response.data)
		} catch (error) {
			setError(error)
		} finally {
			setIsLoading(false)
		}
	}, [])

	const getTeacherById = useCallback(async id => {
		setIsLoading(true)
		setError(null)
		try {
			const response = await axios.get(apiRoutes.getTeacherById(id))
			setData(response.data)
		} catch (error) {
			setError(error)
		} finally {
			setIsLoading(false)
		}
	}, [])

	const deleteTeacherById = useCallback(async id => {
		setError(null)
		try {
			await axios.delete(apiRoutes.deleteTeacherById(id))
		} catch (error) {
			setError(error)
		}
	}, [])

	const setNewTeacher = useCallback(async newTeacher => {
		setIsLoading(true)
		setError(null)
		try {
			axios.post(apiRoutes.setNewTeacher, newTeacher)
		} catch (error) {
			setError(error)
		} finally {
			setIsLoading(false)
		}
	}, [])

	const updateTeacher = useCallback(async teacher => {
		setIsLoading(true)
		setError(null)
		try {
			axios.put(apiRoutes.updateTeacherById, teacher)
		} catch (error) {
			setError(error)
		} finally {
			setIsLoading(false)
		}
	}, [])

	const getAllSubjects = useCallback(async () => {
		setIsLoading(true)
		setError(null)
		try {
			const response = await axios.get(apiRoutes.getAllSubjects)
			setData(response.data)
		} catch (error) {
			setError(error)
		} finally {
			setIsLoading(false)
		}
	}, [])

	const setCallTeachersToMeeting = useCallback(async teacher => {
		setError(null)
		try {
			axios.put(apiRoutes.setCallTeachersToMeeting, teacher)
		} catch (error) {
			setError(error)
		} finally {
			setIsLoading(false)
		}
	}, [])

	const cancelTeachersFromMeeting = useCallback(async teacherId => {
		setError(null)
		try {
			axios.post(apiRoutes.cancelTeachersFromMeeting, teacherId)
		} catch (error) {
			setError(error)
		} finally {
			setIsLoading(false)
		}
	}, [])

	return {
		data,
		isLoading,
		error,
		setData,
		getAllTeachers,
		deleteTeacherById,
		setNewTeacher,
		updateTeacher,
		getTeacherById,
		getAllSubjects,
		setCallTeachersToMeeting,
		cancelTeachersFromMeeting,
		getTeachesMeeting
	}
}

export default useTeachersApi
