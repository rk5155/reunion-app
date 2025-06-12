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
import { useRoute } from 'vue-router';
import Header from '@/components/Header';

export default {
  setup() {
    const authStore = useAuthStore();
    authStore.initializeUser();

    const route = useRoute();
    const showHeader = ['/', '/login', '/register'].includes(route.path);

    return {
      showHeader,
    };
  },
};
</script>
