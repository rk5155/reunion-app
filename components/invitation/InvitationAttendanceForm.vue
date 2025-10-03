<template>
  <v-card-text class="py-10 bg-grey-lighten-2" data-aos="fade-up">
    <h2 class="text-h5 font-weight-bold mb-4 text-black">
      PRESENCE OR ABSENCE
    </h2>
    <div class="max-width-800">
      <div class="new-action-design-tm-Heading3 mb-4">
        お手数ですが　下記お日にち迄に<br />
        出欠情報のご連絡をお願い申し上げます<br />
        <div class="text-h5 mt-4 font-weight-bold text-pink-accent-3">
          出欠締切日：{{ getFormattedDate(deadline) }}
        </div>
      </div>
      <p class="mb-4 text-left">
        下記のフォームから同窓会への参加の可否を投稿してください。
        投稿後に再度出欠を変更することも可能です。
      </p>
      <p class="mb-4 text-left">個人情報の取り扱いについて</p>
      <p class="text-left mb-8">
        ・本フォームにて入力をいただいた情報は、同窓会の出欠確認および同窓会に関するご連絡にのみ利用をさせていただきます。<br />
        お客様の個人情報は、個人情報の取り扱いについてに則りお取り扱いをいたします。<br />
        <a
          href="/privacy"
          target="_blank"
          rel="noopener noreferrer"
          class="text-primary font-weight-bold"
        >
          個人情報の取扱いについて </a
        >内容に同意の上、入力情報を送信してください。　
      </p>

      <div v-if="isDeadlinePassed" class="text-danger font-weight-bold mt-2">
        受付は終了しました。
      </div>

      <invitation-form v-else class="mt-4" @submit="$emit('submit', $event)" />
    </div>
  </v-card-text>
</template>

<script setup lang="ts">
import { getFormattedDate } from '@/utils/date';

const props = defineProps<{
  deadline: string;
  isDeadlinePassed: boolean;
}>();

defineEmits<{
  submit: [formData: Record<string, any>];
}>();
</script>

<style scoped>
.new-action-design-tm-Heading3 {
  text-align: center;
}

.max-width-800 {
  max-width: 800px;
  margin: 0 auto;
}
</style>
