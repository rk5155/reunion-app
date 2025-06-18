<template>
  <div class="invitation-detail text-center pa-0">
    <v-card class="semi-transparent-card">
      <!-- カードの上に画像を表示 -->
      <v-img
        src="/images/invitation.jpg"
        alt="イベント画像"
        class="event-image mb-4"
        contain
      />
      <h2 class="text-center text-h3 font-weight-bold my-16 text-black">
        Reunion invitations
      </h2>

      <v-card-text class="bg-black py-10">
        <p class="text-center text-h6 font-weight-bold mb-4">
          {{ invitation.title }}
        </p>
        <div>{{ invitation.description }}</div>
      </v-card-text>

      <v-card-text class="py-10">
        <h3 class="text-h5 font-weight-bold mb-4">INFORMATION</h3>
        <div class="mb-2 font-weight-bold text-h4">{{ invitation.date }}</div>
        <div class="mb-2 font-weight-bold text-h5">
          {{ invitation.startTime }} - {{ invitation.endTime }}
        </div>
        <div class="mb-2 font-weight-bold text-h5">
          会場/{{ invitation.venueName }}
        </div>
        <div class="font-weight-bold">
          {{ invitation.venueAddress }}
        </div>
      </v-card-text>

      <v-card-text class="py-10 bg-grey-lighten-2">
        <h3 class="text-h5 font-weight-bold mb-4">Presence or Absence</h3>
        <div class="new-action-design-tm-Heading3">
          お手数ですが　下記お日にち迄に<br />
          出欠情報のご連絡をお願い申し上げます<br />
          <div class="text-h5 mt-4">{{ invitation.deadline }}</div>
        </div>
      </v-card-text>
    </v-card>

    <v-btn color="primary" @click="handleEdit">編集する</v-btn>
    <v-btn color="secondary" @click="handleBack">戻る</v-btn>
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
@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400..900&family=Kiwi+Maru&family=Zen+Antique&display=swap');

.invitation-detail {
  background-image: url('/images/bg.png'); /* 背景画像を設定 */
  background-size: cover; /* 背景画像を画面全体にフィット */
  background-position: center; /* 背景画像を中央に配置 */
  min-height: 100vh; /* コンテンツが少ない場合でも画面全体を覆う */
  padding: 20px; /* コンテンツの余白を設定 */
  font-family: 'Zen Antique', serif !important; /* フォントを適用 */
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

.semi-transparent-card {
  background-color: rgba(255, 255, 255, 0.8); /* 背景を半透明に設定 */
}

.text-h3,
.text-h5,
.text-h6 {
  font-family: 'Cinzel', serif !important; /* タイトルフォントを適用 */
}
</style>
