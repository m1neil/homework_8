const API_BASE_URL = 'http://localhost:5000'

const apiRoutes = {
	getAllTeachers: `${API_BASE_URL}/api/teachers`, // method get
	setNewTeacher: `${API_BASE_URL}/api/teachers`, // method post
	getTeacherById: id => `${API_BASE_URL}/api/teachers/${id}`, // method get
	updateTeacherById: id => `${API_BASE_URL}/api/teachers/${id}`, // method put
	deleteTeacherById: id => `${API_BASE_URL}/api/teachers/${id}` // method delete
}

export default apiRoutes
