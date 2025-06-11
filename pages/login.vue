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
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useFirebase } from '@/composables/useFirebase';

// Firebase アプリを取得
const { app } = useFirebase();
const auth = getAuth(app);

const handleLogin = async (formData: { email: string; password: string }) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      formData.email,
      formData.password
    );
    console.log('ログイン成功:', userCredential.user);
    alert('ログインに成功しました！');
  } catch (error) {
    console.error('ログインエラー:', error);
    alert('ログインに失敗しました: ' + error.message);
  }
};
</script>
