import {Outlet} from 'react-router-dom'
import {useEffect} from 'react'
import {Header} from '../components/header'
import {Footer} from '../components/footer.jsx'
import {useAuth} from '../store/use-auth.js'
import {$authApi} from '../api/requester.js'

export function Layout() {
    const setUser = useAuth(state => state.setUser)

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const { data } = await $authApi.get('/auth_me')
                setUser(data)
            }
            catch (err) {
                console.log(err)
            }
        }

        checkAuth()
    }, [setUser])

	return (
		<>
			<Header />
			<main className='container'>
				<Outlet />
			</main>
            <Footer />
		</>
	)
}
