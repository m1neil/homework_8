const frontRoutes = {
	pages: {
		home: '/',
		teachers: {
			index: '/teachers',
			new: 'new',
			edit: 'teacher/:id/edit',
			detail: 'teacher/:id'
		},
		meeting: '/meeting',
		aboutApp: '/about-app',
		aboutDev: '/about-dev'
	},
	navigate: {
		home: '/',
		teachers: {
			index: '/teachers',
			new: '/teachers/new',
			getEdit: id => `/teachers/teacher/${id}/edit`,
			getDetail: id => `/teachers/teacher/${id}`
		},
		meeting: '/meeting',
		aboutApp: '/about-app',
		aboutDev: '/about-dev'
	}
}

export default frontRoutes
