import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    verifyAuthVisible: false as Boolean
  }),
  actions: {
    setAuthVisible(verifyAuthVisible: Boolean) {
      this.verifyAuthVisible = verifyAuthVisible
    }
  }
})
