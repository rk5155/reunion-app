<template>
  <v-app-bar color="" dark>
    <v-toolbar-title>Reunion</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
    <template v-if="!isSmallScreen">
      <v-btn text href="#sec01">VISION</v-btn>
      <v-btn text href="#sec02">MESSAGE</v-btn>
      <v-btn text href="#sec03">SERVICE</v-btn>
      <v-btn text href="#sec04">STORY</v-btn>
      <v-btn text href="#sec05">PROFILE</v-btn>
      <v-btn text href="#sec06">FEATURE</v-btn>
    </template>
  </v-app-bar>

  <v-navigation-drawer v-model="drawer" app temporary>
    <v-list>
      <v-list-item href="#sec01">VISION</v-list-item>
      <v-list-item href="#sec02">MESSAGE</v-list-item>
      <v-list-item href="#sec03">SERVICE</v-list-item>
      <v-list-item href="#sec04">STORY</v-list-item>
      <v-list-item href="#sec05">PROFILE</v-list-item>
      <v-list-item href="#sec06">FEATURE</v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts" setup>
import { useDisplay } from 'vuetify';

const route = useRoute();
const drawer = ref(false);
const { smAndDown } = useDisplay();
const isSmallScreen = computed(() => smAndDown.value);
</script>

<style scoped>
/* Add any custom styles if needed */
</style>
