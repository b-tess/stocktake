import { useSelector, useDispatch } from 'react-redux'
// import { useNavigate } from 'react-router-dom'
import { logout, reset } from '../features/auth/authSlice'
import { Link, useLocation } from 'react-router-dom'
import { GoSignIn, GoSignOut, GoHome, GoPerson } from 'react-icons/go'

function Header() {
    //Check if a user is logged in using the auth state
    const { user } = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const location = useLocation()

    // const navigate = useNavigate()

    function onLogout() {
        dispatch(reset())
        dispatch(logout())
        // navigate('/')
        console.log('logged out')
    }

    function onClick(e) {
        e.preventDefault()
    }

    return (
        <>
            {/* Don't render the header when the page is /verifyemail/:newusertoken */}
            {!location.pathname.startsWith('/verifyemail/') && (
                <header className='header'>
                    {location.pathname === '/login' ? (
                        <Link
                            to={'/'}
                            className='link-disabled'
                            onClick={onClick}
                        >
                            <GoHome /> Stocktake App
                        </Link>
                    ) : (
                        <Link to={'/'}>
                            <GoHome /> Stocktake App
                        </Link>
                    )}

                    <ul>
                        {user && location.pathname !== '/login' ? (
                            <li>
                                <Link
                                    //Give the signout button an absolute url to ensure that it leads home ALWAYS!
                                    to={'http://localhost:3000'}
                                    onClick={onLogout}
                                >
                                    <GoSignOut />
                                    Sign Out
                                </Link>
                            </li>
                        ) : (
                            <>
                                <li>
                                    <Link to={'/login'}>
                                        <GoSignIn /> Sign In
                                    </Link>
                                </li>
                                <li>
                                    <Link to={'/signup'}>
                                        <GoPerson />
                                        Sign Up
                                    </Link>
                                </li>
                            </>
                        )}
                    </ul>
                </header>
            )}
        </>
    )
}

export default Header
