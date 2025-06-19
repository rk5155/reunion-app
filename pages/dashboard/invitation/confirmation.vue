<template>
  <div
    class="confirmation d-flex justify-center align-center fill-height text-center mx-4"
  >
    <v-card class="py-12 elevation-10 w-100">
      <v-icon color="cyan-darken-1" size="100" class="mb-4"
        >mdi-check-circle</v-icon
      >
      <h2 class="text-h5 font-weight-bold mb-4">
        出欠のご回答<br />ありがとうございました!
      </h2>
      <p class="text-body-1 mb-6">
        同窓会当日にお会いできるのを<br />楽しみにしております。
      </p>
      <v-btn
        color="cyan-darken-1"
        @click="handleBackToDetail"
        class="mt-4 font-weight-bold"
        size="large"
        rounded="xl"
      >
        招待状に戻る
      </v-btn>
    </v-card>
  </div>
</template>

<script lang="ts" setup>
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();

const handleBackToDetail = () => {
  const invitationId = route.query.id;
  if (invitationId) {
    router.push(`/dashboard/invitation/${invitationId}`);
  } else {
    router.push('/');
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400..900&family=Kiwi+Maru&family=Zen+Antique&display=swap');

.confirmation,
.text-h2,
.text-h3,
.text-h4,
.text-h5,
.text-h6 {
  font-family: 'Cinzel', serif !important;
}
</style>
