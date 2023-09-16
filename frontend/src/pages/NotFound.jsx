import { Link } from 'react-router-dom'
import { GoHome } from 'react-icons/go'

function NotFound() {
    return (
        <section className='capsule'>
            <h1>Page Not Found</h1>
            <p>Click the link below to navigate back home.</p>
            <Link
                to={'/'}
                className='not-found-home-link'
            >
                <GoHome /> Back Home
            </Link>
        </section>
    )
}

export default NotFound
