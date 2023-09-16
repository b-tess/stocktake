import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

export function useAdminStatus() {
    const [isAdministrator, setIsAdministrator] = useState(false)

    const { user } = useSelector((state) => state.auth)

    useEffect(() => {
        if (user && user.isAdmin) {
            setIsAdministrator(true)
        } else {
            setIsAdministrator(false)
        }

        //eslint-disable-next-line
    }, [])

    return { isAdministrator }
}
