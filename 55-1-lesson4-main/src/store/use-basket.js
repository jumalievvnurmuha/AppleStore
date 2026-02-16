import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query'
import {$authApi} from '../api/requester'
import {useAuth} from './use-auth'

const BASKET_QUERY_KEY = ['basket']

const fetchBasket = async () => {
    const {data} = await $authApi.get('/cart')
    return data
}

export const useBasket = ({enabled} = {}) => {
    const queryClient = useQueryClient()
    const isAuth = useAuth((state) => state.isAuth)
    const isEnabled = (enabled ?? true) && isAuth

    const basketQuery = useQuery({
        queryKey: BASKET_QUERY_KEY,
        queryFn: fetchBasket,
        enabled: isEnabled,
    })

    const addMutation = useMutation({
        mutationFn: (payload) => $authApi.post('/cart', payload),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: BASKET_QUERY_KEY})
        },
    })

    const removeMutation = useMutation({
        mutationFn: (id) => $authApi.delete(`/cart/${id}`),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: BASKET_QUERY_KEY})
        },
    })

    return {
        list: basketQuery.data || [],
        isLoading: basketQuery.isLoading,
        error: basketQuery.error?.message || null,
        addToBasket: addMutation.mutateAsync,
        removeFromBasket: removeMutation.mutateAsync,
        refetch: basketQuery.refetch,
    }
}
