<template>
  <div v-if="visible" class="loading-overlay">
    <v-progress-circular
      indeterminate
      color="deep-purple-lighten-3"
      size="50"
    ></v-progress-circular>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  visible: {
    type: Boolean,
    required: true,
  },
});
</script>

<style scoped>
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}
</style>
