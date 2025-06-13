import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUIStore = defineStore('ui', () => {
  const hydrated = ref(false)

  const setHydrated = () => {
    hydrated.value = true
  }

  return { hydrated, setHydrated }
})