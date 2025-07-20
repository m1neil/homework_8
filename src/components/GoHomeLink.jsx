import { Link } from 'react-router'
import frontRoutes from '../routes/frontRoutes'

function GoHomeLink() {
	return (
		<Link to={frontRoutes.navigate.home} className="button">
			Go home
		</Link>
	)
}

export default GoHomeLink
