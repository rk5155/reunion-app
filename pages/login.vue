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
          <a
            href="/register"
            class="text-deep-purple-darken-1 font-weight-bold"
          >
            新規登録はこちら
          </a>
        </div>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script lang="ts" setup>
const handleLogin = (formData: { email: string; password: string }) => {
  console.log('ログイン情報:', formData);
  // API呼び出しなどを行います
};
</script>
