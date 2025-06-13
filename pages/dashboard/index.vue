<template>
  <v-app>
    <v-container>
      <v-card>
        <v-card-title class="text-h5 text-center font-weight-bold mb-4">
          ダッシュボード
        </v-card-title>
        <v-card-text>
          <div class="text-center">
            <h2 v-if="hydrated && userEmail">
              ようこそ、{{ user.email }} さん！
            </h2>
            <h2 v-else>ようこそ、ゲストさん！</h2>
            <p>ここでは、イベントの管理やプロフィールの編集ができます。</p>
          </div>
          <v-btn color="deep-purple-accent-1" @click="handleLogout">
            ログアウト
          </v-btn>
        </v-card-text>
      </v-card>
    </v-container>
    <!-- 画面下部に追従するボタン -->
    <v-btn
      class="fixed-add-button"
      color="deep-purple-lighten-3"
      @click="handleAddInvitation"
    >
      招待状を追加する
    </v-btn>
  </v-app>
</template>

<script lang="ts" setup>
import { useAuthStore } from '@/stores/auth';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';

const router = useRouter();
const authStore = useAuthStore();
const { user } = storeToRefs(authStore);
const userEmail = computed(() => user.value?.email || null);
const hydrated = ref(false);

onMounted(() => {
  hydrated.value = true;
});

definePageMeta({
  layout: 'dashboard',
});

const handleLogout = async () => {
  try {
    await authStore.logout();
    alert('ログアウトしました！');
    router.push('/login');
  } catch (error: unknown) {
    console.error('ログアウトエラー:', error);
  }
};

const handleAddInvitation = () => {
  alert('招待状を追加する機能が呼び出されました！');
  // 必要に応じてロジックを追加
};
</script>

<style scoped>
.fixed-add-button {
  position: fixed;
  bottom: 50px; /* 画面下部に配置 */
  left: 50%; /* 左右中央に配置 */
  transform: translateX(-50%); /* ボタンの幅を考慮して中央に調整 */
  z-index: 1000; /* 他の要素より前面に表示 */
  padding: 10px 20px;
  font-weight: bold;
  border-radius: 50px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  background-color: #673ab7; /* ボタンの背景色 */
  color: white; /* ボタンの文字色 */
}
</style>
