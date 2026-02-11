import {Navigate, useNavigate} from 'react-router-dom'
import {useInput} from '../hooks/use-input'
import {useAuth} from '../store/use-auth'

export function Register() {
	const fullName = useInput('')
	const email = useInput('')
	const password = useInput('')

	const { register, isLoading, error, isAuth } = useAuth()

	const navigate = useNavigate()

	const handleSubmit = async (e) => {
		e.preventDefault()

		await register({
			fullName: fullName.value,
			email: email.value,
			password: password.value,
		})

		navigate('/login')
	}

	if (isAuth) {
		return <Navigate to='/' />
	}

	return (
		<>
			<h1>Register</h1>
			<form onSubmit={handleSubmit}>
				<input {...fullName} type='text' placeholder='Full Name' />
				<input {...email} type='text' placeholder='Email' />
				<input {...password} type='password' placeholder='Password' />

				<button disabled={isLoading}>Register</button>

				{error && <p>{error}</p>}
			</form>
		</>
	)
}
