import {useAuth} from '../store/use-auth'
import {Button} from 'react-bootstrap'
import {useNavigate, useLocation} from 'react-router-dom'
import {useProductSearch} from '../store/use-products.js'
import {ShoppingCart, User} from 'lucide-react'
import { useState } from 'react'
import {Basket} from './basket.jsx'


export function Header() {
	const logout = useAuth(state => state.logout)
    const isAuth = useAuth(state => state.isAuth)

    const [showBasket, setShowBasket] = useState(false);

    const location = useLocation()

    const {search, setSearch} = useProductSearch()

    const navigate = useNavigate()

    const onAuthButtonClick = () => {
        if (isAuth) {
            logout()
        }
        else {
            navigate('/login')
        }
    }
    if(location.pathname === '/login' || location.pathname === '/register') {
        return null
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

            {isAuth && (<Button className='d-flex align-items-center gap-1' onClick={() => setShowBasket(true)}>
                    <ShoppingCart size={20} />
                    Войти
                </Button>)}
            </div>

            <Basket show = {showBasket} handleClose={() => setShowBasket(false)} placement = 'end'/>
		</header>
	)
}
