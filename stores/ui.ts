import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useUIStore = defineStore('ui', () => {
  const hydrated = ref(false);
  const loading = ref(false);

  const setHydrated = () => {
    hydrated.value = true;
  };

  const setLoading = (value: boolean) => {
    loading.value = value;
  };

  return { hydrated, loading, setHydrated, setLoading };
});