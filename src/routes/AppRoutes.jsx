import AboutApp from '@pages/AboutApp'
import AboutDev from '@pages/AboutDev'
import Home from '@pages/Home'
import Meeting from '@pages/Meeting'
import TeacherDetail from '@pages/teachers/TeacherDetail'
import TeachersForm from '@pages/teachers/TeachersForm'
import TeachersList from '@pages/teachers/TeachersList'
import { Route, Routes } from 'react-router'
import MainLayout from '../layouts/MainLayout'
import SecondLayout from '../layouts/SecondLayout'
import Page404 from '../pages/Page404'
import frontRoutes from './frontRoutes'

function AppRoutes() {
	const { pages } = frontRoutes
	return (
		<Routes>
			{/* Main layout */}
			<Route element={<MainLayout />}>
				<Route path={pages.home} element={<Home />} />
				<Route path={pages.teachers.index}>
					<Route index element={<TeachersList />} />
					<Route path={pages.teachers.new} element={<TeachersForm />} />
					<Route path={pages.teachers.edit} element={<TeachersForm />} />
					<Route path={pages.teachers.detail} element={<TeacherDetail />} />
				</Route>
				<Route path={pages.meeting} element={<Meeting />} />
			</Route>
			{/* Main layout */}
			<Route element={<SecondLayout />}>
				<Route path={pages.aboutApp} element={<AboutApp />} />
				<Route path={pages.aboutDev} element={<AboutDev />} />
				<Route path="*" element={<Page404 />} />
			</Route>
		</Routes>
	)
}

export default AppRoutes
