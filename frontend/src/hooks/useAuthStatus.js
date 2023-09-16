import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

//A hook for use in protected routes
export function useAuthStatus() {
    //Establish a local state on page load
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [loading, setLoading] = useState(true)

    //Access the global state
    const { user } = useSelector((state) => state.auth)

    useEffect(() => {
        if (user) {
            setIsLoggedIn(true)
        } else {
            setIsLoggedIn(false)
        }

        setLoading(false)
    }, [user])

    return { isLoggedIn, loading }
}
