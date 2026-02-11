import {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import {$mainApi} from '../api/requester.js'

export function Product() {
    const {id} = useParams()
    const [product, setProduct] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchProduct = async () => {
            setIsLoading(true)
            setError(null)

            try {
                const {data} = await $mainApi.get(`/products/${id}`)
                setProduct(data)
            }
            catch (e) {
                setError(e.message)
            }
            finally {
                setIsLoading(false)
            }
        }

        if (id) {
            fetchProduct()
        }
    }, [id])

    if (isLoading) {
        return <div>LOADING...</div>
    }

    if (error) {
        return <div>{error}</div>
    }

    if (!product) {
        return <div>Product not found</div>
    }

    return (
        <Card className='my-4'>
            <Card.Img className='product-image' variant='top' src={product.picture} />
            <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>{product.description}</Card.Text>
                <p>{product.price}</p>
                <p>{product.year}</p>
                <Button variant='secondary' onClick={() => window.history.back()}>
                    Back
                </Button>
            </Card.Body>
        </Card>
    )
}
