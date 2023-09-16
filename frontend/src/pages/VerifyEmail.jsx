import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { isVerified } from '../features/auth/authSlice'
import { MdWavingHand } from 'react-icons/md'
import { FaGrinAlt } from 'react-icons/fa'

function VerifyEmail() {
    //Access the user object from the global state
    const { user } = useSelector((state) => state.auth)

    const { newusertoken } = useParams()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(isVerified(newusertoken))
    }, [newusertoken, dispatch])

    return (
        <div className='capsule'>
            <h2>Welcome to the Stocktake App</h2>
            <p>
                Hello {user.name}. <MdWavingHand size={'20px'} />
            </p>
            <p>
                Please log into the app from the same page where you signed up.
            </p>
            <FaGrinAlt
                size={'25px'}
                fill='#212529'
            />
        </div>
    )
}

export default VerifyEmail
