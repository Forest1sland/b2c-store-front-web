import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

const useUserStore = defineStore('userStore', () => {

  //登录状态
  const loginState = ref(false)
  //登录用户账号
  const userId = ref()
  const setLoginState = state => {
    loginState.value = state
  }
  const setUserId = id => {
    userId.value = id
  }


  return { loginState, userId, setLoginState, setUserId }
}, {
  persist: {
    enable: true,
    storage: sessionStorage
  },
},)

export default useUserStore