import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import {useNavigate} from 'react-router-dom'
import {ShoppingCart} from 'lucide-react'
import {useBasket} from '../store/use-basket'

export function ProductCard({id, name, price, year, picture, description}) {
    const navigate = useNavigate()
    const addToBasket = useBasket((state) => state.addToBasket)

    const handleDetailsClick = () => {
        navigate(`/products/${id}`)
    }

    const handleAddToBasket = () => {
        addToBasket({
            id,
            name,
            price,
            year,
            picture,
            description,
        })
    }

    return (
        <Card className='col-3'>
            <Card.Img className='product-card-img' variant='top' src={picture} />
            <Card.Body>
                <Card.Title>{name}</Card.Title>
                <Card.Text>{description}</Card.Text>
                <p>{price}</p>
                <p>{year}</p>
                <div className='d-flex gap-2'>
                    <Button variant='primary' onClick={handleDetailsClick}>
                        Подробнее
                    </Button>
                    <Button
                        variant='outline-primary'
                        onClick={handleAddToBasket}
                        aria-label='Добавить в корзину'
                    >
                        <ShoppingCart size={18} />
                    </Button>
                </div>
            </Card.Body>
        </Card>
    )
}
