import {Navigate, useNavigate} from 'react-router-dom'
import {useInput} from '../hooks/use-input'
import {useAuth} from '../store/use-auth'

export function Login() {
	const email = useInput('')
	const password = useInput('')

	const { login, isLoading, error, isAuth } = useAuth()

	const navigate = useNavigate()

	const handleSubmit = async (e) => {
		e.preventDefault()

		await login({
			email: email.value,
			password: password.value,
		})

		navigate('/')
	}

	if (isAuth) {
		return <Navigate to='/' />
	}

	return (
		<>
			<h1>Login</h1>
			<form onSubmit={handleSubmit}>
				<input {...email} type='text' placeholder='Email' />
				<input {...password} type='password' placeholder='Password' />

				<button disabled={isLoading}>Login</button>

				{error && <p>{error}</p>}
			</form>
		</>
	)
}
