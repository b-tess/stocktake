import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { login, reset } from '../features/auth/authSlice'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Spinner from '../components/Spinner'

function Login() {
    //Set local state to manage the form
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })

    const { email, password } = formData

    //Access the global state
    const { isLoading, isSuccess, isError, message } = useSelector(
        (state) => state.auth
    )
    const dispatch = useDispatch()

    const navigate = useNavigate()

    useEffect(() => {
        if (isError) {
            toast.error(message)
            // navigate('/login')
            setFormData({ email: '', password: '' })
            dispatch(reset())
        }

        if (isSuccess) {
            navigate('/adminspace')
            // console.log(`Welcome ${user.name}.`)
        }

        // dispatch(reset())
    }, [isError, message, isSuccess, navigate, dispatch])

    function onChange(e) {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value,
        }))
    }

    function onSubmit(e) {
        e.preventDefault()

        const userData = {
            email,
            password,
        }

        dispatch(login(userData))
    }

    if (isLoading) {
        return <Spinner />
    }

    return (
        <div className='capsule'>
            <h2>Log In</h2>
            <div className='form'>
                <form onSubmit={onSubmit}>
                    <div className='form-group'>
                        <label htmlFor='email'>Email</label>
                        <input
                            type='email'
                            name='email'
                            id='email'
                            value={email}
                            placeholder='Email'
                            onChange={onChange}
                        />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='password'>Password</label>
                        <input
                            type='password'
                            name='password'
                            id='password'
                            value={password}
                            placeholder='Password'
                            onChange={onChange}
                        />
                    </div>
                    <div className='form-group'>
                        <button
                            className='btn'
                            type='submit'
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login
