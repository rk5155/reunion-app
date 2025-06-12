<template>
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
      v-if="props.showConfirmEmail"
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
      :color="props.buttonColor"
      block
      class="font-weight-bold rounded-pill"
    >
      {{ props.buttonText }}
    </v-btn>
    <div class="divider-container">
      <span class="divider-line"></span>
      <span class="divider-text">または</span>
      <span class="divider-line"></span>
    </div>
    <v-btn
      color="amber-darken-4"
      block
      class="font-weight-bold rounded-pill"
      @click="handleGoogleLogin"
    >
      Googleでログイン
    </v-btn>
  </v-form>
</template>

<script lang="ts" setup>
import { ref, defineProps, defineEmits } from 'vue';
import { useAuthStore } from '@/stores/auth';

// Propsの型を定義
const props = defineProps<{
  showConfirmEmail: boolean;
  buttonText: string;
  buttonColor: string;
}>();

// Emitsの型を定義
const emit = defineEmits<{
  (
    event: 'submit',
    formData: { email: string; confirmEmail?: string; password: string }
  ): void;
}>();

// フォームデータの型を定義
const form = ref<{
  email: string;
  confirmEmail?: string;
  password: string;
}>({
  email: '',
  confirmEmail: '',
  password: '',
});

// handleSubmit関数
const handleSubmit = () => {
  if (props.showConfirmEmail && form.value.email !== form.value.confirmEmail) {
    console.error('メールアドレスが一致しません');
    return;
  }
  emit('submit', form.value);
};

// Googleログイン処理
const authStore = useAuthStore();
const handleGoogleLogin = async () => {
  try {
    await authStore.loginWithGoogle();
    alert('Googleログインに成功しました！');
    router.push('/dashboard');
  } catch (error) {
    console.error('Googleログインエラー:', error);
    alert('Googleログインに失敗しました: ' + (error as Error).message);
  }
};
</script>

<style scoped>
.divider-container {
  display: flex;
  align-items: center;
  margin: 16px 0;
}

.divider-line {
  flex: 1;
  height: 1px;
  background-color: #ccc;
}

.divider-text {
  margin: 0 8px;
  font-weight: bold;
  color: #666;
}
</style>
