import {create} from 'zustand'
import {$mainApi} from '../api/requester.js'

export const useProducts = create((set) => ({
    products: [],
    isLoading: false,
    error: null,

    search: '',
    setSearch: (text) => set({ search: text }),

    fetchProducts: async (params) => {
        set({ isLoading: true, error: null })

        try {
            const {data} = await $mainApi.get(`/products`, {params})
            set({ products: data })
        }
        catch (e) {
            set({ error: e.message })
        }
        finally {
            set({ isLoading: false })
        }
    }

}))