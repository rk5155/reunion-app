<template>
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
</template>

<script lang="ts" setup>
import { useAuthStore } from '@/stores/auth'; // ★ authストアをインポート
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';

const router = useRouter();
const authStore = useAuthStore();
const { user } = storeToRefs(authStore); // user をリアクティブに取り出す
const userEmail = computed(() => user.value?.email || null);
const hydrated = ref(false);

onMounted(() => {
  hydrated.value = true;
});

// ログアウト処理
const handleLogout = async () => {
  try {
    await authStore.logout();
    alert('ログアウトしました！');
    router.push('/login');
  } catch (error: unknown) {
    console.error('ログアウトエラー:', error);
  }
};
</script>
