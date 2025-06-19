<template>
  <div class="confirmation-page text-center">
    <v-card class="semi-transparent-card pa-8">
      <h2 class="text-h4 font-weight-bold mb-4">受付が完了しました</h2>
      <p class="text-body-1 mb-6">
        ご登録いただきありがとうございます。イベント当日を楽しみにお待ちください。
      </p>
      <v-btn color="primary" @click="handleBackToDetail" class="mt-4">
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
.confirmation-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f9f9f9;
}

.semi-transparent-card {
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
</style>
