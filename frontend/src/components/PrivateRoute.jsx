import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStatus } from '../hooks/useAuthStatus'
import Spinner from './Spinner'

function PrivateRoute() {
    //Destructure the values that useAuthState returns
    const { isLoggedIn, loading } = useAuthStatus()

    if (loading) {
        return <Spinner />
    }

    return isLoggedIn ? <Outlet /> : <Navigate to={'/login'} />
}

export default PrivateRoute
