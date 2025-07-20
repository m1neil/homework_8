import { Outlet } from 'react-router'
import Footer from '../components/Footer'
import Header from '../components/header/Header'

function MainLayout() {
	return (
		<>
			<Header />
			<main className="page">
				<Outlet />
			</main>
			<Footer />
		</>
	)
}

export default MainLayout
