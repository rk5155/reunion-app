<template>
  <v-app>
    <auth-header />
    <div class="content">
      <NuxtPage />
    </div>
  </v-app>
</template>

<script lang="ts" setup>
import AuthHeader from '@/components/auth/Header.vue';
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
