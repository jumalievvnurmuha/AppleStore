import {useAuth} from '../store/use-auth'
import {Button} from 'react-bootstrap'
import {useNavigate} from 'react-router-dom'
import {useProducts} from '../store/use-products.js'
import {ShoppingCart, User} from 'lucide-react'


export function Header() {
	const logout = useAuth(state => state.logout)
    const isAuth = useAuth(state => state.isAuth)

    const {search, setSearch} = useProducts()

    const navigate = useNavigate()

    const onAuthButtonClick = () => {
        if (isAuth) {
            logout()
        }
        else {
            navigate('/login')
        }
    }


	return (
		<header className='border-bottom p-3 d-flex flex-wrap gap-3 align-items-center justify-content-between'>
            <div>Apple Store</div>
            <input type='text' placeholder='Поиск' value={search} onChange={(e) => setSearch(e.target.value)} />
            <div className='d-flex gap-2'>
                <Button variant={isAuth ? 'secondary' : 'primary'} onClick={onAuthButtonClick} className='d-flex align-items-center gap-1'>
                    {!isAuth && <User size={20} />}
                    {isAuth ? 'Выйти' : 'Войти'}
                </Button>

                <Button className='d-flex align-items-center gap-1'>
                    <ShoppingCart size={20} />
                    Корзина
                </Button>
            </div>
		</header>
	)
}
