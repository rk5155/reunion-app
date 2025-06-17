<template>
  <v-app>
    <template v-if="isInvitationDetailPage">
      <NuxtPage />
    </template>
    <template v-else>
      <auth-header />
      <v-container class="content pt-6">
        <NuxtPage />
      </v-container>
    </template>
  </v-app>
</template>

<script lang="ts" setup>
import AuthHeader from '@/components/auth/Header.vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const isInvitationDetailPage = computed(() => {
  return route.path.startsWith('/dashboard/invitation/') && route.params.id;
});
</script>

<style scoped>
auth-header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 10;
  height: 64px;
}

.content {
  margin-top: 64px;
}
</style>
