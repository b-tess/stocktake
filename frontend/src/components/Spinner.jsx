import { BallTriangle } from 'react-loading-icons'

function Spinner() {
    return (
        <div className='spinnerContainer'>
            <BallTriangle
                fill='rgba(0, 0, 0, 1)'
                strokeWidth={5}
                stroke='#c9184a'
            />
        </div>
    )
}

export default Spinner
