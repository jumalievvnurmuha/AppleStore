
import {create} from 'zustand'
import {$authApi} from '../api/requester'

export const useBasket = create((set) => ({
    list: [],
    isLoading: false,
    error: null,

    fetchBasket: async () => {
        set({isLoading: true, error: null})
        try {
            const {data} = await $authApi.get('/cart')
            set({list: data})
        }
        catch (e) {
            set({error: e.message})
        }
        finally {
            set({isLoading: false})
        }
    },

    addToBasket: async (payload) => {
        set({isLoading: true, error: null})
        try {
            const {data} = await $authApi.post('/cart', payload)
            set((prev) => ({
                list: [data, ...prev.list],
            }))
        }
        catch (e) {
            set({error: e.message})
        }
        finally {
            set({isLoading: false})
        }
    },

    removeFromBasket: async (id) => {
        set({isLoading: true, error: null})
        try {
            await $authApi.delete(`/cart/${id}`)
            set((prev) => ({
                list: prev.list.filter((item) => item.id !== id),
            }))
        }
        catch (e) {
            set({error: e.message})
        }
        finally {
            set({isLoading: false})
        }
    },
}))
