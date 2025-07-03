<template>
  <div class="px-4 py-8 rounded bg-white shadow">
    <v-form @submit.prevent="openConfirmationModal" class="w-100">
      <v-radio-group v-model="formData.attendance" label="出欠 (必須)" required>
        <v-radio label="出席" value="出席"></v-radio>
        <v-radio label="欠席" value="欠席"></v-radio>
      </v-radio-group>

      <v-text-field
        v-model="formData.name"
        label="氏名 (必須)"
        required
        class="mb-4"
      />
      <v-text-field
        v-model="formData.email"
        label="メールアドレス (必須)"
        type="email"
        :rules="[emailRule]"
        required
        class="mb-4"
      />

      <v-text-field
        v-model="formData.className"
        label="クラス (必須)"
        required
        class="mb-4"
      />
      <v-textarea
        v-model="formData.message"
        label="メッセージ"
        rows="4"
        required
        class="mb-4"
      />

      <v-checkbox
        v-model="isPrivacyChecked"
        label="個人情報の取扱いについて同意します"
        required
        class="mb-4"
      />

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

    <common-modal-confirmation
      v-model:isVisible="isModalVisible"
      :confirm-label="dynamicConfirmLabel"
      @confirm="handleSubmit"
      @cancel="closeConfirmationModal"
    >
      <div class="mb-2 border-b py-2">
        <p class="mb-1">出欠</p>
        <p>{{ formData.attendance }}</p>
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
const emit = defineEmits(['submit']);

const formData = ref({
  name: '',
  email: '',
  attendance: '',
  className: '',
  message: '',
});

const isPrivacyChecked = ref(false);

const emailRule = (value: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(value) || '正しいメールアドレスを入力してください';
};

const isFormValid = computed(() => {
  const isEmailValid = emailRule(formData.value.email) === true;
  return (
    formData.value.name &&
    isEmailValid &&
    formData.value.attendance &&
    formData.value.className &&
    isPrivacyChecked.value
  );
});

const isModalVisible = ref(false);

const openConfirmationModal = () => {
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
  return formData.value.attendance === '出席' ? '次へ' : '送信';
});
</script>

<style scoped></style>
