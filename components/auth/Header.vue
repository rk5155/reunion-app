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
      <v-btn text @click="handleLogout">ログアウト</v-btn>
      <!-- ログアウトボタン -->
    </template>
  </v-app-bar>

  <v-navigation-drawer v-if="hydrated" v-model="drawer" app temporary>
    <v-list>
      <!-- ログイン情報を表示 -->
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
        <!-- ドロワー内のログアウトボタン -->
        <v-list-item-title>ログアウト</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
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

// onMounted で Piniaのhydrated状態をセット
onMounted(() => {
  uiStore.setHydrated();
});

// uiStore.hydrated をcomputedで取得（リアクティブに）
const hydrated = computed(() => uiStore.hydrated);

const isSmallScreen = computed(() => smAndDown.value);

// ユーザー情報を取得
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
  try {
    await authStore.logout();
    alert('ログアウトしました！');
    router.push('/login');
    drawer.value = false;
  } catch (error) {
    console.error('ログアウトエラー:', error);
  }
};
</script>

<style scoped>
/* 必要に応じてスタイル追加 */
</style>
