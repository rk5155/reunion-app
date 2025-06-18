<template>
  <v-dialog
    :model-value="isVisible"
    @update:model-value="(val) => emit('update:isVisible', val)"
    persistent
  >
    <v-card>
      <v-card-title class="text-h6">{{ title }}</v-card-title>
      <v-card-text>
        <p>{{ message }}</p>
        <ul v-if="details">
          <li v-for="(value, key) in details" :key="key">
            <strong>{{ key }}:</strong> {{ value }}
          </li>
        </ul>
      </v-card-text>
      <v-card-actions>
        <v-btn color="green" @click="onConfirm">確認</v-btn>
        <v-btn color="red" @click="onCancel">キャンセル</v-btn>
      </v-card-actions>
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
    default: '以下の内容で送信しますか？',
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
