import {Navigate, Outlet} from 'react-router-dom'
import {useAuth} from '../store/use-auth'

export function ProtectedRoute() {
	const isAuth = useAuth(state => state.isAuth)

	if (!isAuth) {
		return <Navigate to='/login' replace />
	}

	return <Outlet />
}
