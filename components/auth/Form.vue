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
  </v-form>
</template>

<script lang="ts" setup>
import { ref, defineProps, defineEmits } from 'vue';

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
</script>
