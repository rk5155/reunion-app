<template>
  <v-app-bar v-if="hydrated" color="deep-purple-accent-1" dark>
    <v-toolbar-title>Reunion App</v-toolbar-title>
    <v-app-bar-nav-icon
      v-if="isSmallScreen"
      @click="drawer = !drawer"
    ></v-app-bar-nav-icon>
    <template v-if="!isSmallScreen">
      <v-btn text @click="navigateToHome">ホーム</v-btn>
      <v-btn text @click="navigateToProfile">プロフィール</v-btn>
    </template>
  </v-app-bar>

  <v-navigation-drawer v-if="hydrated" v-model="drawer" app temporary>
    <v-list>
      <v-list-item @click="navigateToHome">
        <v-list-item-title>ホーム</v-list-item-title>
      </v-list-item>
      <v-list-item @click="navigateToProfile">
        <v-list-item-title>プロフィール</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { computed, onMounted, ref } from 'vue';
import { useDisplay } from 'vuetify';
import { useUIStore } from '@/stores/ui';

const router = useRouter();
const drawer = ref(false);
const { smAndDown } = useDisplay();

const uiStore = useUIStore();

// onMounted で Piniaのhydrated状態をセット
onMounted(() => {
  uiStore.setHydrated();
});

// uiStore.hydrated をcomputedで取得（リアクティブに）
const hydrated = computed(() => uiStore.hydrated);

const isSmallScreen = computed(() => smAndDown.value);

const navigateToHome = () => {
  router.push('/');
  drawer.value = false;
};

const navigateToProfile = () => {
  router.push('/profile');
  drawer.value = false;
};
</script>

<style scoped>
/* 必要に応じてスタイル追加 */
</style>
