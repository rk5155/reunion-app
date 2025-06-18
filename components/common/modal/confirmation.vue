<template>
  <v-dialog
    :model-value="isVisible"
    @update:model-value="(val) => emit('update:isVisible', val)"
    persistent
  >
    <v-card class="px-4 py-8">
      <v-card-title class="text-h6 text-center mb-4 font-weight-bold pa-0">{{
        title
      }}</v-card-title>
      <v-card-text class="pa-0 mb-6">
        <p class="mb-4">{{ message }}</p>

        <div class="mb-2 border-b py-2">
          <p>{{ details.attendance }}</p>
        </div>
        <div class="mb-2 border-b py-2">
          <p class="mb-2">氏名</p>
          <p>{{ details.name }}</p>
        </div>
        <div class="mb-2 border-b py-2">
          <p class="mb-2">メールアドレス</p>
          <p>{{ details.email }}</p>
        </div>
        <div class="mb-2 border-b py-2">
          <p class="mb-2">クラス</p>
          <p>{{ details.className }}</p>
        </div>
        <div class="mb-2 border-b py-2">
          <p class="mb-2">メッセージ</p>
          <p>{{ details.message }}</p>
        </div>
      </v-card-text>
      <div class="d-flex">
        <v-btn
          color="cyan-darken-1"
          @click="onConfirm"
          class="w-50 font-weight-bold"
          >送信</v-btn
        >
        <v-btn
          color="grey-lighten-3"
          @click="onCancel"
          class="w-50 font-weight-bold"
          >キャンセル</v-btn
        >
      </div>
    </v-card>
  </v-dialog>
</template>

<script lang="ts" setup>
const props = defineProps({
  isVisible: Boolean,
  title: {
    type: String,
    default: '確認',
  },
  message: {
    type: String,
    default: '以下の内容でよろしいですか？',
  },
  details: {
    type: Object,
    default: () => ({}),
  },
});

const emit = defineEmits(['confirm', 'cancel', 'update:isVisible']);

const onConfirm = () => {
  emit('confirm');
};

const onCancel = () => {
  emit('update:isVisible', false);
  emit('cancel');
};
</script>
