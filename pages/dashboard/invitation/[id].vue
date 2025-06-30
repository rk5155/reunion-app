<template>
  <div class="invitation-detail text-center pa-0">
    <common-loading-overlay :visible="uiStore.loading" />
    <v-card class="semi-transparent-card">
      <!-- カードの上に画像を表示 -->
      <v-img
        src="/images/invitation.jpg"
        alt="イベント画像"
        class="event-image mb-4 rounded-0"
        contain
      />

      <div class="my-16">
        <p class="mb-3 text-grey-darken-3 text-caption">
          Where memories meet, and stories begin.
        </p>
        <h2 class="ttl_center5 text-h3 font-weight-bold text-black mb-3">
          Reunion invitations
        </h2>

        <p class="text-grey-darken-3 text-caption">
          Together again, to cherish the moments we share.
        </p>
      </div>

      <v-card-text class="bg-black py-10">
        <v-img
          src="/images/invitation-2.jpg"
          class="event-image mb-6 rounded-0"
          contain
        />
        <p class="text-center text-h6 font-weight-bold mb-4">
          {{ invitation.title }}
        </p>
        <div class="text-pre-line">{{ invitation.description }}</div>
      </v-card-text>

      <v-card-text class="py-10 bg-grey-lighten-4">
        <h3 class="text-h5 font-weight-bold mb-4">Current participation</h3>
        <p class="mb-2">現在の参加状況</p>
        <p class="text-h4 font-weight-bold text-cyan-lighten-2">
          {{ attendeeCount + 34 }} 人
        </p>
      </v-card-text>

      <v-card-text class="py-10 bg-grey-darken-4">
        <h3 class="text-h5 font-weight-bold mb-4">Countdown</h3>
        <div class="text-h4 font-weight-bold mb-4">
          to {{ invitation.date }}
        </div>
        <div
          class="text-h4 font-weight-bold text-danger d-flex justify-space-between"
        >
          <div class="w-25">
            <div>{{ countdown.days }}</div>
            <div class="countdown-label text-cyan-lighten-4 font-weight-bold">
              Days
            </div>
          </div>
          <div class="w-25">
            <div>{{ countdown.hours }}</div>
            <div class="countdown-label text-cyan-lighten-4 font-weight-bold">
              Hours
            </div>
          </div>
          <div class="w-25">
            <div>{{ countdown.minutes }}</div>
            <div class="countdown-label text-cyan-lighten-4 font-weight-bold">
              Minutes
            </div>
          </div>
          <div class="w-25">
            <div>{{ countdown.seconds }}</div>
            <div class="countdown-label text-cyan-lighten-4 font-weight-bold">
              Seconds
            </div>
          </div>
        </div>
      </v-card-text>

      <v-card-text class="py-10">
        <h3 class="text-h5 font-weight-bold mb-4">INFORMATION</h3>
        <div class="mb-2 font-weight-bold text-h4">
          {{ getFormattedDate(invitation.date) }}
        </div>
        <div class="mb-2 font-weight-bold text-h5">
          {{ invitation.startTime }} - {{ invitation.endTime }}
        </div>
        <div class="mb-2 font-weight-bold text-h5">
          会場/{{ invitation.venueName }}
        </div>
        <div class="mb-2 font-weight-bold text-h5">
          会費：{{ invitation.fee }}円
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
          <div class="text-h5 mt-4">
            {{ getFormattedDate(invitation.deadline) }}
          </div>
        </div>

        <div v-if="isDeadlinePassed" class="text-danger font-weight-bold mt-2">
          受付は終了しました。
        </div>

        <invitation-form v-else class="mt-4" @submit="handleFormSubmit" />

        <div class="py-10 bg-grey-lighten-2 px-0">
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
        </div>

        <h2 class="ttl_center5 text-h3 font-weight-bold my-16 text-black">
          Thank you!!
        </h2>
      </v-card-text>
    </v-card>

    <div
      v-if="isCreator"
      class="sticky-bottom d-flex justify-center pa-4 bg-white"
    >
      <v-btn color="primary" @click="handleEdit" class="mx-2"> 編集する </v-btn>
      <v-btn @click="handleBack" class="mx-2">戻る</v-btn>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRouter, useRoute } from 'vue-router';
import {
  doc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
  addDoc,
} from 'firebase/firestore';
import { useFirebase } from '@/composables/useFirebase';
import { useUIStore } from '@/stores/ui';
import { useAuthStore } from '@/stores/auth';
import type { Invitation, Countdown } from '@/types/invitation';
const { sendEmail } = useSendEmail();

const { db } = useFirebase();
const router = useRouter();
const route = useRoute();
const uiStore = useUIStore();
const authStore = useAuthStore(); // ユーザー情報を取得するストアを使用
const invitationId = route.params.id;

const invitation = ref<Invitation>({
  title: '',
  date: '',
  startTime: '',
  endTime: '',
  venueName: '',
  venueAddress: '',
  deadline: '',
  schoolName: '',
  graduationYear: '',
  fee: 0,
  description: '',
  creatorId: '',
});

const countdown = ref<Countdown>({
  days: '-',
  hours: '-',
  minutes: '-',
  seconds: '-',
});

const attendeeCount = ref(0);

const isDeadlinePassed = computed(() => {
  if (!invitation.value.deadline) return false;
  const deadlineDate = new Date(invitation.value.deadline);
  const now = new Date();
  return now > deadlineDate;
});

const isCreator = computed(() => {
  return invitation.value.creatorId === authStore.user?.uid; // 現在のユーザーIDと作成者IDを比較
});

const getFormattedDate = (dateString: string): string => {
  if (!dateString) return '';
  const eventDate = new Date(dateString);
  const dayNames = ['日', '月', '火', '水', '木', '金', '土'];
  const year = eventDate.getFullYear();
  const month = String(eventDate.getMonth() + 1).padStart(2, '0');
  const date = String(eventDate.getDate()).padStart(2, '0');
  const day = dayNames[eventDate.getDay()];
  return `${year}.${month}.${date}(${day})`;
};

const updateCountdown = () => {
  if (!invitation.value.date) return;
  const eventDate = new Date(invitation.value.date);
  const now = new Date();
  const diffTime = eventDate.getTime() - now.getTime();

  if (diffTime > 0) {
    countdown.value.days = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    countdown.value.hours = Math.floor(
      (diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    countdown.value.minutes = Math.floor(
      (diffTime % (1000 * 60 * 60)) / (1000 * 60)
    );
    countdown.value.seconds = Math.floor((diffTime % (1000 * 60)) / 1000);
  } else {
    countdown.value.days = 0;
    countdown.value.hours = 0;
    countdown.value.minutes = 0;
    countdown.value.seconds = 0;
  }
};

const fetchAttendeeCount = async () => {
  const attendeesQuery = query(
    collection(db, 'attendances'),
    where('invitationId', '==', invitationId),
    where('attendance', '==', '参加する')
  );
  const attendeeDocs = await getDocs(attendeesQuery);
  attendeeCount.value = attendeeDocs.size;
};

onMounted(async () => {
  if (!invitationId) {
    alert('招待状IDが見つかりません');
    router.push('/dashboard');
    return;
  }

  const docRef = doc(db, 'invitations', invitationId as string);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    invitation.value = {
      id: docSnap.id,
      ...(docSnap.data() as Invitation),
    };
    updateCountdown();

    setInterval(updateCountdown, 1000);
    await fetchAttendeeCount();
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

const handleFormSubmit = async (formData: Record<string, any>) => {
  try {
    uiStore.setLoading(true);
    formData.invitationId = invitationId;
    await addDoc(collection(db, 'attendances'), formData);

    const text = [
      'ご参加ありがとうございます！',
      '',
      '久しぶりに皆さんと顔を合わせて、懐かしい話に花を咲かせられればと思っています。',
      '皆さまにお会いできるのを楽しみにしております！',
      '',
      '▼ INFORMATION',
      `日時：${getFormattedDate(invitation.value.date)}`,
      `時間：${invitation.value.startTime} - ${invitation.value.endTime}`,
      `会場：${invitation.value.venueName}`,
      `会費：${invitation.value.fee}円`,
      `住所：${invitation.value.venueAddress}`,
      '',
      '-------------------------------',
      'あの日の仲間と、もう一度つながる。',
      '同窓会支援サービス 「Reunion」',
      'https://reunion-app-new.web.app',
      '-------------------------------',
    ].join('\n');

    await sendEmail(
      formData.email,
      `【受付完了】${invitation.value.title}の受付が完了しました。`,
      text
    );

    router.push({
      path: '/dashboard/invitation/confirmation',
      query: { id: invitationId },
    });
  } catch (error) {
    console.error('登録失敗:', error);
    alert('登録に失敗しました。もう一度お試しください。');
  } finally {
    uiStore.setLoading(false);
  }
};

const shareOnLine = () => {
  const url = `https://line.me/R/msg/text/?${encodeURIComponent(
    `イベント「${invitation.value.title}」に参加しませんか？\n\n詳細はこちら:\n${window.location.href}`
  )}`;
  window.open(url, '_blank');
};

const shareOnX = () => {
  const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    `イベント「${invitation.value.title}」に参加しませんか？\n\n詳細はこちら:\n${window.location.href}`
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
.text-h2,
.text-h3,
.text-h4,
.text-h5,
.text-h6 {
  font-family: 'Cinzel', serif !important; /* タイトルフォントを適用 */
}

.countdown-label {
  font-size: 0.8rem;
}

.ttl_center5 {
  font-weight: bold;
  width: fit-content;
  margin: auto;
  padding: 0.5em 1em;
  text-align: center;
  position: relative;
}

.ttl_center5::before,
.ttl_center5::after {
  content: '';
  background-color: black;
  width: 50%;
  height: 2px;
  position: absolute;
}

.ttl_center5::before {
  top: 0;
  left: 0;
}

.ttl_center5::after {
  bottom: 0;
  right: 0;
}

/* 画面下部のボタンを調整 */
.fixed-bottom {
  background-color: rgba(255, 255, 255, 0.9); /* 半透明の背景 */
  backdrop-filter: blur(10px); /* 背景をぼかす */
  border-top: 1px solid #ddd; /* 上部に境界線 */
  padding: 10px 0; /* 上下のパディング */
}

.sticky-bottom {
  position: sticky;
  bottom: 0;
  z-index: 10;
}
</style>
