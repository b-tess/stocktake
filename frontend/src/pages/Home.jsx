import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function Home() {
    //If user is logged in, navigate to /adminspace
    //Else load the normal homepage
    const { user } = useSelector((state) => state.auth)

    const navigate = useNavigate()

    useEffect(() => {
        if (user) {
            navigate('/adminspace')
        }
    }, [user, navigate])
    return (
        <>
            <div className='capsule'>
                <h1>STOCKTAKE</h1>
                <Link
                    to={'/adminspace'}
                    className='btn'
                >
                    Log In
                </Link>
                <Link
                    to={'/signup'}
                    className='btn btn-reverse'
                >
                    Create Account
                </Link>
            </div>
        </>
    )
}

export default Home
