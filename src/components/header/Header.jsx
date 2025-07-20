import frontRoutes from '@src/routes/frontRoutes'
import { Link } from 'react-router'
import Menu from './Menu'

function Header() {
	return (
		<header className="header">
			<div className="header__container">
				<Link to={frontRoutes.navigate.home} className="header__logo">
					Teachers
				</Link>
				<Menu className="header__menu" />
			</div>
		</header>
	)
}

export default Header
