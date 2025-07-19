<template>
  <div class="px-4 py-8 rounded bg-white shadow">
    <v-form @submit.prevent="openConfirmationModal" class="w-100">
      <div class="d-flex align-center mb-3">
        <p class="text-h6 font-weight-bold mr-2">出欠</p>
        <v-chip size="x-small" color="pink-accent-3" text-color="white"
          >必須</v-chip
        >
      </div>
      <v-radio-group v-model="formData.isAttendance" required class="mb-6">
        <v-radio label="出席" :value="true"></v-radio>
        <v-radio label="欠席" :value="false"></v-radio>
      </v-radio-group>

      <div class="d-flex align-center mb-3">
        <p class="text-h6 font-weight-bold mr-2">氏名（旧姓）</p>
        <v-chip size="x-small" color="pink-accent-3" text-color="white"
          >必須</v-chip
        >
      </div>
      <v-text-field
        v-model="formData.name"
        placeholder="例 山田太郎"
        required
        class="mb-6"
      />

      <div class="d-flex align-center mb-3">
        <p class="text-h6 font-weight-bold mr-2">メールアドレス</p>
        <v-chip size="x-small" color="pink-accent-3" text-color="white"
          >必須</v-chip
        >
      </div>
      <v-text-field
        v-model="formData.email"
        type="email"
        :rules="[emailRule]"
        required
        class="mb-6"
      />

      <div class="d-flex align-center mb-3">
        <p class="text-h6 font-weight-bold mr-2">クラス</p>
        <v-chip size="x-small" color="pink-accent-3" text-color="white"
          >必須</v-chip
        >
      </div>
      <v-text-field
        v-model="formData.className"
        placeholder="例 1"
        required
        class="mb-6"
      />

      <p class="mb-3 text-h6 font-weight-bold text-left">メッセージ</p>
      <v-textarea v-model="formData.message" rows="4" class="mb-6" />

      <div class="d-flex align-center mb-4">
        <v-checkbox
          v-model="isPrivacyChecked"
          label="個人情報の取扱いについて同意します"
          required
          class="mr-2"
        />
      </div>

      <v-btn
        type="submit"
        color="cyan-darken-1"
        class="mt-4 w-100"
        :disabled="!isFormValid"
        rounded="lg"
      >
        確認する
      </v-btn>
    </v-form>

    <v-dialog v-model="showBlockedModal">
      <v-card>
        <v-card-text class="pa-6">
          <v-alert
            type="error"
            variant="tonal"
            class="mb-4 text-center text-h1"
          >
            お前は出禁
          </v-alert>
        </v-card-text>
      </v-card>
    </v-dialog>

    <common-modal-confirmation
      v-model:isVisible="isModalVisible"
      :confirm-label="dynamicConfirmLabel"
      @confirm="handleSubmit"
      @cancel="closeConfirmationModal"
    >
      <div class="mb-2 border-b py-2">
        <p class="mb-1">出欠</p>
        <p>{{ formData.isAttendance ? '出席' : '欠席' }}</p>
      </div>
      <div class="mb-2 border-b py-2">
        <p class="mb-1">氏名</p>
        <p>{{ formData.name }}</p>
      </div>
      <div class="mb-2 border-b py-2">
        <p class="mb-1">メールアドレス</p>
        <p>{{ formData.email }}</p>
      </div>
      <div class="mb-2 border-b py-2">
        <p class="mb-1">クラス</p>
        <p>{{ formData.className }}</p>
      </div>
      <div class="mb-2 border-b py-2">
        <p class="mb-1">メッセージ</p>
        <p>{{ formData.message }}</p>
      </div>
    </common-modal-confirmation>
  </div>
</template>

<script lang="ts" setup>
import { BLOCKED_USER_LIST } from '@/constants/blockList';

const emit = defineEmits(['submit']);

const formData = ref({
  name: '',
  email: '',
  isAttendance: null,
  className: '',
  message: '',
});

const isPrivacyChecked = ref(false);
const showBlockedModal = ref(false);

const emailRule = (value: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(value) || '正しいメールアドレスを入力してください';
};

const isFormValid = computed(() => {
  const isEmailValid = emailRule(formData.value.email) === true;
  return (
    formData.value.name &&
    isEmailValid &&
    formData.value.isAttendance !== null &&
    formData.value.className &&
    isPrivacyChecked.value
  );
});

const isModalVisible = ref(false);

const openConfirmationModal = () => {
  if (BLOCKED_USER_LIST.includes(formData.value.name.replace(/\s/g, ''))) {
    showBlockedModal.value = true;
    return;
  }
  isModalVisible.value = true;
};

const closeConfirmationModal = () => {
  isModalVisible.value = false;
};

const handleSubmit = () => {
  emit('submit', formData.value);
  closeConfirmationModal();
};

const dynamicConfirmLabel = computed(() => {
  return formData.value.isAttendance ? '次へ' : '送信';
});
</script>
