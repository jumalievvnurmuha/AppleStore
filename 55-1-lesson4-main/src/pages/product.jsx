import {useParams} from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import {ShoppingCart} from 'lucide-react'
import {useBasket} from '../store/use-basket'
import {useProductById} from '../store/use-products.js'
import {useAuth} from '../store/use-auth'

export function Product() {
    const {id} = useParams()
    const isAuth = useAuth((state) => state.isAuth)
    const addToBasket = useBasket().addToBasket
    const {data: product, isLoading, error} = useProductById(id)

    if (isLoading) {
        return <div>LOADING...</div>
    }

    if (error) {
        return <div>{error.message || error}</div>
    }

    if (!product) {
        return <div>Product not found</div>
    }

    const handleAddToBasket = () => {
        addToBasket({
            id: product.id,
            name: product.name,
            price: product.price,
            year: product.year,
            picture: product.picture,
            description: product.description,
        })
    }

    return (
        <Card className='my-4'>
            <Card.Img className='product-image' variant='top' src={product.picture} />
            <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>{product.description}</Card.Text>
                <p>{product.price}</p>
                <p>{product.year}</p>
                <div className='d-flex gap-2'>
                    <Button variant='secondary' onClick={() => window.history.back()}>
                        Back
                    </Button>
                    {isAuth && (
                        <Button
                            variant='outline-primary'
                            onClick={handleAddToBasket}
                            aria-label='Р”РѕР±Р°РІРёС‚СЊ РІ РєРѕСЂР·РёРЅСѓ'
                        >
                            <ShoppingCart size={18} />
                        </Button>
                    )}
                </div>
            </Card.Body>
        </Card>
    )
}
