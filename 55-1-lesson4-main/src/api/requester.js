import axios from 'axios'

const createApi = () =>
	axios.create({
		baseURL: 'https://59d7ac916afc684b.mokky.dev',
		headers: {
			'Content-Type': 'application/json',
		},
	})

const $mainApi = createApi()
const $authApi = createApi()

$authApi.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('tokenAuth')
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

export { $mainApi, $authApi }
