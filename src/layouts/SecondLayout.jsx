import { Outlet } from 'react-router'

function SecondLayout() {
	return (
		<main className="page">
			<Outlet />
		</main>
	)
}

export default SecondLayout
