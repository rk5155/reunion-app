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
        <slot />
      </v-card-text>
      <div>
        <v-btn
          color="cyan-darken-1"
          @click="onConfirm"
          class="w-100 font-weight-bold d-block mb-4"
        >
          送信
        </v-btn>
        <v-btn
          color="grey-lighten-3"
          @click="onCancel"
          class="w-100 font-weight-bold d-block"
        >
          キャンセル
        </v-btn>
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
