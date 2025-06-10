<template>
  <v-container>
    <v-card>
      <v-card-title class="text-h5 text-center font-weight-bold mb-4">
        会員登録
      </v-card-title>
      <v-card-text>
        <v-form @submit.prevent="handleSubmit">
          <v-text-field
            v-model="form.email"
            label="メールアドレス"
            type="email"
            outlined
            required
            bg-color="white"
          />
          <v-text-field
            v-model="form.confirmEmail"
            label="確認用メールアドレス"
            type="email"
            outlined
            required
            bg-color="white"
          />
          <v-text-field
            v-model="form.password"
            label="パスワード"
            type="password"
            outlined
            required
            bg-color="white"
          />
          <v-btn
            type="submit"
            color="deep-purple-accent-1"
            block
            class="font-weight-bold rounded-pill"
          >
            登録
          </v-btn>
        </v-form>
        <div class="text-center mt-6">
          <a href="/login" class="text-deep-purple-darken-1 font-weight-bold">
            すでに会員の方はこちら
          </a>
        </div>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const form = ref({
  email: '',
  confirmEmail: '',
  password: '',
});

const handleSubmit = () => {
  if (form.value.email !== form.value.confirmEmail) {
    console.error('メールアドレスが一致しません');
    return;
  }
  console.log('登録情報:', form.value);
  // API呼び出しなどを行います
};
</script>
