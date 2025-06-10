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
const handleSubmit = (formData: {
  email: string;
  confirmEmail?: string;
  password: string;
}) => {
  console.log('登録情報:', formData);
  // API呼び出しなどを行います
};
</script>
