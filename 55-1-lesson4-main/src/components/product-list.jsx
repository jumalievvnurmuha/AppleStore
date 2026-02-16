import {ProductCard} from './product-card.jsx'
import {useProductSearch, useProducts} from '../store/use-products.js'
import {useDebounce } from '../hooks/usw-debounce.js'

export function ProductList() {
    const { search } = useProductSearch()
    const debouncedSearch = useDebounce(search, 500)
    const { products, isLoading, error } = useProducts(debouncedSearch)

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
