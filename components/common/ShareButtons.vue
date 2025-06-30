<template>
  <div class="d-flex flex-column align-center">
    <v-btn color="success" class="mb-2 w-100" @click="shareOnLine">
      <v-icon left>mdi-chat</v-icon>
      LINEで共有
    </v-btn>
    <v-btn color="info" class="mb-2 w-100" @click="shareOnX">
      <v-icon left>mdi-twitter</v-icon>
      Xで共有
    </v-btn>
    <v-btn color="pink" class="mb-2 w-100" @click="copyUrl">
      <v-icon left>mdi-link</v-icon>
      URLをコピー
    </v-btn>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
});

const shareOnLine = () => {
  const url = `https://line.me/R/msg/text/?${encodeURIComponent(
    `イベント「${props.title}」に参加しませんか？\n\n詳細はこちら:\n${window.location.href}`
  )}`;
  window.open(url, '_blank');
};

const shareOnX = () => {
  const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    `イベント「${props.title}」に参加しませんか？\n\n詳細はこちら:\n${window.location.href}`
  )}`;
  window.open(url, '_blank');
};

const copyUrl = () => {
  const url = window.location.href;
  navigator.clipboard
    .writeText(url)
    .then(() => {
      alert('URLをコピーしました！');
    })
    .catch((error) => {
      console.error('URLのコピーに失敗しました:', error);
      alert('URLのコピーに失敗しました。もう一度お試しください。');
    });
};
</script>
