import { GoArrowLeft } from 'react-icons/go'
import { useNavigate } from 'react-router-dom'

function BackButton({ url }) {
    //Initialize a navigation variable
    const navigate = useNavigate()

    return (
        <>
            <button
                className='btn btn-back'
                onClick={() => navigate(url)}
            >
                <GoArrowLeft /> Back
            </button>
        </>
    )
}

export default BackButton
