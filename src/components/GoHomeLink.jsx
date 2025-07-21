import frontRoutes from '@src/routes/frontRoutes'
import { Link } from 'react-router'

function GoHomeLink() {
	return (
		<Link to={frontRoutes.navigate.home} className="button">
			Go home
		</Link>
	)
}

export default GoHomeLink
