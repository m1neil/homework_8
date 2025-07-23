const API_BASE_URL = 'http://localhost:8080'

const apiRoutes = {
	// teachers ====================================================
	getAllTeachers: `${API_BASE_URL}/api/Teacher/GetTeachers`, // method get
	setNewTeacher: `${API_BASE_URL}/api/Teacher/CreateTeacher`, // method post
	getTeacherById: id => `${API_BASE_URL}/api/teachers/${id}`, // method get
	setCallTeachersToMeeting: `${API_BASE_URL}/api/Teacher/CallTeachersToMeeting`,
	cancelTeachersFromMeeting: `${API_BASE_URL}/api/Teacher/CancelTeachersToMeeting`,
	updateTeacherById: `${API_BASE_URL}/api/Teacher/UpdateTeacher`, // method put
	deleteTeacherById: id => `${API_BASE_URL}/api/Teacher/DeleteTeacher/${id}`, // method delete
	// subjects ====================================================
	getAllSubjects: `${API_BASE_URL}/api/Subject/GetSubjects`,
	setNewSubject: id => `${API_BASE_URL}/api/Subject/DeleteSubject/${id}`,
	updateSubjectById: id => `${API_BASE_URL}/api/Subject/UpdateSubject/${id}`,
	deleteSubjectById: id => `${API_BASE_URL}/api/Subject/DeleteSubject/${id}`
}

export default apiRoutes
