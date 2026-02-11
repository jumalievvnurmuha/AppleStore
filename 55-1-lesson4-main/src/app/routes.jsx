import {createBrowserRouter} from 'react-router-dom'
import {Home} from '../pages/home'
import {Login} from '../pages/login'
import {Register} from '../pages/register'
import {Product} from '../pages/product'
import {Layout} from './layout'
import {ProtectedRoute} from './protected-route'

export const router = createBrowserRouter([
	{
		element: <Layout />,
		children: [
			{
				element: <ProtectedRoute />,
				children: [
                    {
                        path: '/orders',
                        element: <div>Orders</div>
                    }
				],
			},
			{
				path: '/register',
				element: <Register />,
			},
			{
				path: '/login',
				element: <Login />,
			},
            {
                path: '/products/:id',
                element: <Product />,
            },
            {
                path: '/',
                element: <Home />,
            },
		],
	},
])
