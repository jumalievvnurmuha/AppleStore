import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import {useNavigate} from 'react-router-dom'

export function ProductCard({ id, name, price, year, picture, description }) {
    const navigate = useNavigate()

    const handleDetailsClick = () => {
        navigate(`/products/${id}`)
    }

    return (
        <Card className='col-3'>
            <Card.Img variant="top" src={picture} />
            <Card.Body>
                <Card.Title>{name}</Card.Title>
                <Card.Text>
                    {description}
                </Card.Text>
                <p>{price}</p>
                <p>{year}</p>
                <Button variant="primary" onClick={handleDetailsClick}>
                    Подробнее
                </Button>
            </Card.Body>
        </Card>
    )
}
