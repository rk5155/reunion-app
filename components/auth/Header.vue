<template>
  <div>
    <common-loading-overlay :visible="uiStore.loading" />

    <v-app-bar v-if="uiStore.hydrated" color="deep-purple-accent-1" dark>
      <v-toolbar-title>Reunion App</v-toolbar-title>
      <v-app-bar-nav-icon
        v-if="isSmallScreen"
        @click="drawer = !drawer"
      ></v-app-bar-nav-icon>
      <template v-if="!isSmallScreen">
        <v-btn text @click="navigateToHome">ホーム</v-btn>
        <v-btn text @click="navigateToProfile">プロフィール</v-btn>
        <v-btn text @click="handleLogout">ログアウト</v-btn>
      </template>
    </v-app-bar>

    <v-navigation-drawer v-if="uiStore.hydrated" v-model="drawer" app temporary>
      <v-list>
        <v-list-item>
          <v-list-item-title>ログイン中: {{ userEmail }}</v-list-item-title>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item @click="navigateToHome">
          <v-list-item-title>ホーム</v-list-item-title>
        </v-list-item>
        <v-list-item @click="navigateToProfile">
          <v-list-item-title>プロフィール</v-list-item-title>
        </v-list-item>
        <v-list-item @click="handleLogout">
          <v-list-item-title>ログアウト</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { computed, onMounted, ref } from 'vue';
import { useDisplay } from 'vuetify';
import { useUIStore } from '@/stores/ui';
import { useAuthStore } from '@/stores/auth';

const router = useRouter();
const drawer = ref(false);
const { smAndDown } = useDisplay();

const uiStore = useUIStore();
const authStore = useAuthStore();

onMounted(() => {
  uiStore.setHydrated();
});

const hydrated = computed(() => uiStore.hydrated);
const isSmallScreen = computed(() => smAndDown.value);
const userEmail = computed(() => authStore.user?.email || 'ゲスト');

const navigateToHome = () => {
  router.push('/');
  drawer.value = false;
};

const navigateToProfile = () => {
  router.push('/profile');
  drawer.value = false;
};

const handleLogout = async () => {
  uiStore.setLoading(true); // ローディング開始
  try {
    await authStore.logout();
    alert('ログアウトしました！');
    router.push('/login');
  } catch (error) {
    console.error('ログアウトエラー:', error);
    alert('ログアウトに失敗しました。');
  } finally {
    uiStore.setLoading(false); // ローディング終了
    drawer.value = false;
  }
};
</script>
