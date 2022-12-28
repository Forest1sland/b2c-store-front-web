import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

const useUserStore = defineStore('userStore', () => {

  //登录状态
  const loginState = ref(false)
  //登录用户账号
  const userId = ref()


  return { loginState, userId }
})

export default useUserStore