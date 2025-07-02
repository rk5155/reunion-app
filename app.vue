<template>
  <v-app>
    <NuxtLayout>
      <template v-if="showHeader">
        <header />
      </template>
      <NuxtPage />
    </NuxtLayout>
  </v-app>
</template>

<script lang="ts" setup>
import { useAuthStore } from '@/stores/auth';
import { useUIStore } from '@/stores/ui';
import { useRoute } from 'vue-router';
import { onMounted, computed } from 'vue';

const uiStore = useUIStore();
const authStore = useAuthStore();
const route = useRoute();

onMounted(() => {
  uiStore.setHydrated();
  authStore.initializeUser();
});

const showHeader = computed(() =>
  ['/', '/login', '/register'].includes(route.path)
);
</script>
