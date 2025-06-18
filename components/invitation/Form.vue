<template>
  <div class="px-4 py-8 rounded bg-white shadow">
    <v-form @submit.prevent="openConfirmationModal" class="w-100">
      <v-radio-group v-model="formData.attendance" label="出欠 (必須)" required>
        <v-radio label="参加する" value="参加する"></v-radio>
        <v-radio label="参加しない" value="参加しない"></v-radio>
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
      :title="'送信内容の確認'"
      :message="'以下の内容で送信しますか？'"
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
const formData = ref({
  name: '',
  email: '',
  attendance: '',
  className: '',
  message: '',
});

const emit = defineEmits(['submit']);

const emailRule = (value: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(value) || '正しいメールアドレスを入力してください';
};

// フォームがすべて入力されているかをチェック
const isFormValid = computed(() => {
  const isEmailValid = emailRule(formData.value.email) === true;
  return (
    formData.value.name &&
    isEmailValid &&
    formData.value.attendance &&
    formData.value.className
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
</script>

<style scoped></style>
