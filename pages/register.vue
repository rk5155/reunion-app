<template>
  <v-container>
    <v-card>
      <v-card-title class="text-h5 text-center font-weight-bold mb-4">
        会員登録
      </v-card-title>
      <v-card-text>
        <auth-form
          show-confirm-email
          button-text="登録"
          button-color="deep-purple-accent-1"
          @submit="handleSubmit"
        />
        <div class="text-center mt-6">
          <nuxt-link
            to="/login"
            class="text-deep-purple-darken-1 font-weight-bold"
          >
            すでに会員の方はこちら
          </nuxt-link>
        </div>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script lang="ts" setup>
import { useAuthStore } from '@/stores/auth'; // Pinia ストアをインポート
import { useRouter } from 'vue-router';

const router = useRouter();
const authStore = useAuthStore();

const handleSubmit = async (formData: { email: string; password: string }) => {
  try {
    await authStore.register(formData.email, formData.password); // register メソッドを呼び出し
    alert('会員登録が完了しました！');
    router.push('/dashboard'); // ダッシュボードへ遷移
  } catch (error) {
    console.error('ユーザー登録エラー:', error);
    alert('会員登録に失敗しました: ' + error.message);
  }
};
</script>
