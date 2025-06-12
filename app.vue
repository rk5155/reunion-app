<template>
  <v-app>
    <NuxtLayout>
      <template v-if="showHeader">
        <Header />
      </template>
      <NuxtPage />
    </NuxtLayout>
  </v-app>
</template>

<script>
import { useAuthStore } from '@/stores/auth';

export default {
  setup() {
    const authStore = useAuthStore();
    authStore.initializeUser();

    const route = useRoute();
    const showHeader = computed(() =>
      ['/', '/login', '/register'].includes(route.path)
    );

    return {
      showHeader,
    };
  },
};
</script>
