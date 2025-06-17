<template>
  <div class="invitation-detail text-center">
    <v-card class="px-4 semi-transparent-card py-8 mb-4">
      <!-- カードの上に画像を表示 -->
      <v-img
        src="/images/invitation.jpg"
        alt="イベント画像"
        class="event-image mb-4"
        contain
      ></v-img>
      <p class="text-center text-h6 font-weight-bold mb-0 text-black">
        {{ invitation.title }}
      </p>
      <v-card-text>
        <div class="mb-2 text-h7 font-weight-bold">{{ invitation.date }}</div>
        <div class="mb-2 text-h7 font-weight-bold">
          {{ invitation.startTime }} - {{ invitation.endTime }}
        </div>
        <div class="mb-2 text-h7 font-weight-bold">
          {{ invitation.venueName }}
        </div>
        <div class="text-h7 font-weight-bold">
          {{ invitation.venueAddress }}
        </div>
      </v-card-text>
    </v-card>
    <v-card class="px-4 semi-transparent-card py-8">
      <v-card-text class="pa-0">
        <div class="mb-2">{{ invitation.description }}</div>
        <div class="mb-2 text-h7 font-weight-bold">
          回答締切: {{ invitation.deadline }}
        </div>
        <div class="mb-2 text-h7 font-weight-bold">
          招待状ID: {{ invitationId }}
        </div>
      </v-card-text>
    </v-card>
    <v-btn color="primary" class="mt-4" @click="handleEdit">編集する</v-btn>
    <v-btn color="secondary" class="mt-4" @click="handleBack">戻る</v-btn>
  </div>
</template>

<script lang="ts" setup>
import { useRouter, useRoute } from 'vue-router';
import { doc, getDoc } from 'firebase/firestore';
import { useFirebase } from '@/composables/useFirebase';
import { ref, onMounted } from 'vue';

definePageMeta({ layout: 'dashboard' });

const { db } = useFirebase();
const router = useRouter();
const route = useRoute();
const invitationId = route.params.id;

const invitation = ref({
  title: '',
  date: '',
  startTime: '',
  endTime: '',
  venueName: '',
  venueAddress: '',
  deadline: '',
  description: '',
});

onMounted(async () => {
  if (!invitationId) {
    alert('招待状IDが見つかりません');
    router.push('/dashboard');
    return;
  }

  const docRef = doc(db, 'invitations', invitationId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    invitation.value = docSnap.data();
  } else {
    alert('招待状が存在しません');
    router.push('/dashboard');
  }
});

const handleEdit = () => {
  router.push(`/dashboard/invitation/edit/${invitationId}`);
};

const handleBack = () => {
  router.push('/dashboard');
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Kiwi+Maru&family=Zen+Antique&display=swap');

.invitation-detail {
  background-image: url('/images/bg.png'); /* 背景画像を設定 */
  background-size: cover; /* 背景画像を画面全体にフィット */
  background-position: center; /* 背景画像を中央に配置 */
  min-height: 100vh; /* コンテンツが少ない場合でも画面全体を覆う */
  padding: 20px; /* コンテンツの余白を設定 */
  font-family: 'Kiwi Maru', serif; /* フォントを適用 */
}

.event-image {
  width: 100%;
  height: auto;
  border-radius: 10px 10px 0 0; /* カードの上部に画像をフィットさせる */
}

h2 {
  margin-bottom: 20px;
  color: #fff; /* 背景に合わせて文字色を白に変更 */
  font-family: 'Zen Antique', serif; /* フォントを適用 */
}

.semi-transparent-card {
  background-color: rgba(255, 255, 255, 0.8); /* 背景を半透明に設定 */
  border-radius: 10px; /* カードの角を丸くする */
  font-family: 'Kiwi Maru', serif; /* フォントを適用 */
}
</style>
