import frontRoutes from '@src/routes/frontRoutes'
import { NavLink } from 'react-router'

function Menu({ className }) {
	const { navigate } = frontRoutes

	const getClassLink = ({ isActive }) => {
		let className = 'menu__link'
		if (isActive) className += ' menu__link--active'
		return className
	}

	return (
		<div className={`${className} menu`}>
			<nav className="menu__body">
				<ul className="menu__list">
					<li className="menu__item">
						<NavLink to={navigate.teachers.index} className={getClassLink}>
							Teachers
						</NavLink>
					</li>
					<li className="menu__item">
						<NavLink to={navigate.meeting} className={getClassLink}>
							Meeting
						</NavLink>
					</li>
					<li className="menu__item">
						<NavLink to={navigate.aboutApp} className={getClassLink}>
							About app
						</NavLink>
					</li>
					<li className="menu__item">
						<NavLink to={navigate.aboutDev} className={getClassLink}>
							About dev
						</NavLink>
					</li>
				</ul>
			</nav>
		</div>
	)
}

export default Menu
