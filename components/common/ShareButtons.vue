<template>
  <div class="d-flex flex-column align-center max-width-800">
    <slot />
    <v-btn color="success" class="mb-2 w-100" @click="shareOnLine">
      <v-icon left>mdi-chat</v-icon>
      LINEで共有
    </v-btn>
    <v-btn color="info" class="mb-2 w-100" @click="shareOnX">
      <v-icon left>mdi-twitter</v-icon>
      Xで共有
    </v-btn>
    <v-btn color="blue-grey-darken-1" class="mb-2 w-100" @click="copyUrl">
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

const generateShareMessage = () =>
  `「${props.title}✉️」\n\n${window.location.href}`;

const shareOnLine = () => {
  const url = `https://line.me/R/msg/text/?${encodeURIComponent(
    generateShareMessage()
  )}`;
  window.open(url, '_blank');
};

const shareOnX = () => {
  const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    generateShareMessage()
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

<style scoped>
.max-width-800 {
  max-width: 800px;
  margin: auto;
}
</style>
