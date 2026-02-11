import {ProductCard} from './product-card.jsx'
import {useProducts} from '../store/use-products.js'
import {useEffect} from 'react'

export function ProductList() {
    const { products, isLoading, error, fetchProducts, search } = useProducts()

    useEffect(() => {
        fetchProducts({})
    }, [])

    if (isLoading) {
        return <div>LOADING...</div>
    }

    if (error) {
        return <div>{error}</div>
    }

    return (
        <div className='row gap-3 pt-4'>
            {products.map((product) => (
                <ProductCard key={product.id} {...product} />
            ))}
        </div>
    )
}