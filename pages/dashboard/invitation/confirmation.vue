<template>
  <div
    class="confirmation d-flex justify-center align-center fill-height text-center px-6 bg-grey-lighten-4"
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
import { onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { collection, addDoc, getDoc, doc } from 'firebase/firestore';
import { useFirebase } from '@/composables/useFirebase';

const router = useRouter();
const route = useRoute();
const reservationId = route.query.reservationId;
const { sendEmail } = useSendEmail();
const { db } = useFirebase();
const invitationId = route.query.id;

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

const handleBackToDetail = () => {
  if (invitationId) {
    router.push(`/dashboard/invitation/${invitationId}`);
  } else {
    router.push('/');
  }
};

// Firestore から予約情報を取得
const fetchReservationData = async (reservationId: string) => {
  const reservationRef = doc(db, 'reservations', reservationId);
  const reservationSnap = await getDoc(reservationRef);
  return reservationSnap.data();
};

// Firestore に出席情報を追加
const saveAttendanceData = async (attendanceData: Record<string, any>) => {
  await addDoc(collection(db, 'attendances'), attendanceData);
};

// メール本文を作成
const createEmailText = (reservationData: Record<string, any>) => {
  return [
    'ご参加ありがとうございます！',
    '',
    '久しぶりに皆さんと顔を合わせて、懐かしい話に花を咲かせられればと思っています。',
    '皆さまにお会いできるのを楽しみにしております！',
    '',
    '▼ INFORMATION',
    `日時：${getFormattedDate(reservationData.date)}`,
    `時間：${reservationData.startTime} - ${reservationData.endTime}`,
    `会場：${reservationData.venueName}`,
    `会費：${reservationData.fee}円`,
    `住所：${reservationData.venueAddress}`,
    '',
    '-------------------------------',
    'あの日の仲間と、もう一度つながる。',
    '同窓会支援サービス 「Reunion」',
    'https://reunion-app-new.web.app',
    '-------------------------------',
  ].join('\n');
};

// メール送信
const sendConfirmationEmail = async (
  email: string,
  title: string,
  text: string
) => {
  await sendEmail(email, `【受付完了】${title}の受付が完了しました。`, text);
};

onMounted(async () => {
  try {
    const reservationData = await fetchReservationData(reservationId as string);

    const attendanceData = {
      email: reservationData?.email,
      name: reservationData?.name,
      className: reservationData?.className,
      attendance: reservationData?.attendance,
      message: reservationData?.message,
    };

    await saveAttendanceData(attendanceData);

    const emailText = createEmailText(reservationData);
    await sendConfirmationEmail(
      reservationData?.email,
      reservationData?.title,
      emailText
    );

    console.log('データ保存とメール送信が完了しました。');
  } catch (error) {
    console.error('エラーが発生しました:', error);
  }
});
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
