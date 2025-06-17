<template>
  <div>
    <common-loading-overlay :visible="uiStore.loading" />

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
  </div>
</template>

<script lang="ts" setup>
import { useAuthStore } from '@/stores/auth';
import { useUIStore } from '@/stores/ui';

const router = useRouter();
const authStore = useAuthStore();
const uiStore = useUIStore();

const handleSubmit = async (formData: { email: string; password: string }) => {
  try {
    uiStore.setLoading(true);
    await authStore.register(formData.email, formData.password);
    alert('会員登録が完了しました！');
    router.push('/dashboard');
  } catch (error) {
    console.error('ユーザー登録エラー:', error);
    alert('会員登録に失敗しました: ' + (error as Error).message);
  } finally {
    uiStore.setLoading(false);
  }
};
</script>
