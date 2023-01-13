import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

const useCartStore = defineStore('cartStore', () => {

  const orderProducts = ref()
  const setOrderProducts = products => {
    orderProducts.value = products
  }
  return { orderProducts, setOrderProducts }
}, {
  persist: {
    enable: true,
    storage: sessionStorage
  },
},)

export default useCartStore