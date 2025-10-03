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
        <p class="text-h6 font-weight-bold mr-2">最終学年のクラス</p>
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

      <!-- 子連れ人数入力 -->
      <div v-if="formData.isAttendance" class="mb-6">
        <div class="d-flex align-center mb-3">
          <p class="text-h6 font-weight-bold mr-2">お子様の人数</p>
        </div>
        <p class="text-caption text-grey-darken-1 mb-3">
          ※小学生以下のお子様は参加費・飲食費無料です
        </p>
        <v-text-field
          v-model.number="formData.childrenCount"
          type="number"
          min="0"
          max="10"
          placeholder="0"
          persistent-hint
          class="mb-2"
        />
      </div>

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
        <v-card-text class="pa-6 text-h1 text-red text-center font-weight-bold">
          <div>お前は<br />出禁</div>
        </v-card-text>
      </v-card>
    </v-dialog>

    <common-modal-confirmation
      v-model:isVisible="isModalVisible"
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
      <div
        v-if="formData.isAttendance && formData.childrenCount > 0"
        class="mb-2 border-b py-2"
      >
        <p class="mb-1">お子様の人数</p>
        <p>{{ formData.childrenCount }}人</p>
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
  childrenCount: 0,
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
    setTimeout(() => {
      window.location.href =
        'https://img2.erogazou.gallery/article3/813/s/01.jpg';
    }, 1500);
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
</script>
