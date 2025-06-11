<template>
  <v-container>
    <v-card>
      <v-card-title class="text-h5 text-center font-weight-bold mb-4">
        ログイン
      </v-card-title>
      <v-card-text>
        <auth-form
          :show-confirm-email="false"
          button-text="ログイン"
          button-color="deep-purple-accent-1"
          @submit="handleLogin"
        />
        <div class="text-center mt-6">
          <nuxt-link
            to="/register"
            class="text-deep-purple-darken-1 font-weight-bold"
          >
            新規登録はこちら
          </nuxt-link>
        </div>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script lang="ts" setup>
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

const handleLogin = async (formData: { email: string; password: string }) => {
  try {
    await authStore.login(formData.email, formData.password);
    alert('ログインに成功しました！');
    router.push('/dashboard');
  } catch (error) {
    console.error('ログインエラー:', error);
    alert('ログインに失敗しました: ' + (error as Error).message);
  }
};
</script>
