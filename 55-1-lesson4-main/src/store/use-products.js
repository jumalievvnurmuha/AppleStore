import {useQuery, useQueryClient} from '@tanstack/react-query'
import {$mainApi} from '../api/requester.js'

const SEARCH_QUERY_KEY = ['products', 'search']
const PRODUCTS_QUERY_KEY = (search) => ['products', search || '']
const PRODUCT_QUERY_KEY = (id) => ['product', id]

const fetchProducts = async (search) => {
    const params = search ? {name: `*${search}`} : undefined
    const {data} = await $mainApi.get('/products', {params})
    return data
}

const fetchProductById = async (id) => {
    const {data} = await $mainApi.get(`/products/${id}`)
    return data
}

export const useProductSearch = () => {
    const queryClient = useQueryClient()
    const searchQuery = useQuery({
        queryKey: SEARCH_QUERY_KEY,
        queryFn: () => '',
        initialData: '',
        staleTime: Infinity,
    })

    const setSearch = (text) => {
        queryClient.setQueryData(SEARCH_QUERY_KEY, text)
    }

    return {
        search: searchQuery.data || '',
        setSearch,
    }
}

export const useProducts = (search) => {
    const productsQuery = useQuery({
        queryKey: PRODUCTS_QUERY_KEY(search),
        queryFn: () => fetchProducts(search),
    })

    return {
        products: productsQuery.data || [],
        isLoading: productsQuery.isLoading,
        error: productsQuery.error?.message || null,
        refetch: productsQuery.refetch,
    }
}

export const useProductById = (id) => {
    return useQuery({
        queryKey: PRODUCT_QUERY_KEY(id),
        queryFn: () => fetchProductById(id),
        enabled: Boolean(id),
    })
}
