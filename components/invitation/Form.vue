<template>
  <div class="pa-6 ma-4 rounded bg-white shadow">
    <v-form @submit.prevent="handleSubmit" class="w-100">
      <v-text-field
        v-model="formData.name"
        label="名前"
        required
        class="mb-4"
      ></v-text-field>
      <v-text-field
        v-model="formData.email"
        label="メールアドレス"
        type="email"
        required
        class="mb-4"
      ></v-text-field>
      <v-select
        v-model="formData.attendance"
        :items="attendanceOptions"
        label="出欠"
        required
        class="mb-4"
      ></v-select>
      <v-text-field
        v-model="formData.className"
        label="クラス"
        required
        class="mb-4"
      ></v-text-field>
      <v-textarea
        v-model="formData.message"
        label="メッセージ"
        rows="4"
        required
        class="mb-4"
      ></v-textarea>
      <v-btn
        type="submit"
        color="primary"
        class="mt-4"
        :disabled="!isFormValid"
      >
        送信
      </v-btn>
    </v-form>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, defineEmits } from 'vue';

const formData = ref({
  name: '',
  email: '',
  attendance: '',
  className: '',
  message: '',
});

const attendanceOptions = ['参加する', '参加しない'];

const emit = defineEmits(['submit']);

const isFormValid = computed(() => {
  return (
    formData.value.name &&
    formData.value.email &&
    formData.value.attendance &&
    formData.value.className &&
    formData.value.message
  );
});

const handleSubmit = () => {
  emit('submit', formData.value);
};
</script>

<style scoped></style>
