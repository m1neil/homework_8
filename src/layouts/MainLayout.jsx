import Footer from '@components/Footer'
import Header from '@components/header/Header'
import { Outlet } from 'react-router'

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
