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
import { collection, addDoc, getDoc, doc } from 'firebase/firestore';
import { useFirebase } from '@/composables/useFirebase';
import { createEmailText } from '@/utils/email';

const router = useRouter();
const route = useRoute();
const reservationId = route.query.reservationId;
const { sendEmail } = useSendEmail();
const { db } = useFirebase();
const reservationData = ref<any>(null);

onMounted(async () => {
  reservationData.value = await fetchReservationData(reservationId as string);

  const attendanceData = {
    email: reservationData.value?.email,
    name: reservationData.value?.name,
    className: reservationData.value?.className,
    attendance: reservationData.value?.attendance,
    message: reservationData.value?.message,
  };

  await saveAttendanceData(attendanceData);

  const emailText = createEmailText(reservationData.value.invitation);

  await sendConfirmationEmail(
    reservationData.value?.email,
    reservationData.value?.title,
    emailText
  );
});

const handleBackToDetail = () => {
  router.push(`/dashboard/invitation/${reservationData.value.invitationId}`);
};

const fetchReservationData = async (reservationId: string) => {
  const reservationRef = doc(db, 'reservations', reservationId);
  const reservationSnap = await getDoc(reservationRef);
  return reservationSnap.data();
};

const saveAttendanceData = async (attendanceData: Record<string, any>) => {
  await addDoc(collection(db, 'attendances'), attendanceData);
};

const sendConfirmationEmail = async (
  email: string,
  title: string,
  text: string
) => {
  await sendEmail(email, `【受付完了】${title}の受付が完了しました。`, text);
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
