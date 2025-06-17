<template>
  <div class="invitation-detail">
    <h2 class="text-center text-h6 font-weight-bold mb-4">
      {{ invitation.title }}
    </h2>
    <v-card class="pa-4">
      <!-- カードの上に画像を表示 -->
      <v-img
        src="/images/invitation.jpg"
        alt="イベント画像"
        class="event-image"
        contain
      ></v-img>
      <v-card-text>
        <p>開催日: {{ invitation.date }}</p>
        <p>開始時間: {{ invitation.startTime }}</p>
        <p>終了時間: {{ invitation.endTime }}</p>
        <p>会場名: {{ invitation.venueName }}</p>
        <p>会場住所: {{ invitation.venueAddress }}</p>
        <p>締切日: {{ invitation.deadline }}</p>
        <p>説明: {{ invitation.description }}</p>
        <p>招待状ID: {{ invitationId }}</p>
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
.invitation-detail {
  background-image: url('/images/bg-2.png'); /* 背景画像を設定 */
  background-size: cover; /* 背景画像を画面全体にフィット */
  background-position: center; /* 背景画像を中央に配置 */
  min-height: 100vh; /* コンテンツが少ない場合でも画面全体を覆う */
  padding: 20px; /* コンテンツの余白を設定 */
}

.event-image {
  width: 100%;
  height: auto;
  border-radius: 10px 10px 0 0; /* カードの上部に画像をフィットさせる */
}

h2 {
  margin-bottom: 20px;
  color: #fff; /* 背景に合わせて文字色を白に変更 */
}

v-card {
  background-color: rgba(255, 255, 255, 0.9); /* カードの背景を半透明に設定 */
  border-radius: 10px; /* カードの角を丸くする */
}
</style>
