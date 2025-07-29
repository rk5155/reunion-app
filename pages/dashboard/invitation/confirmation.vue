<template>
  <div
    class="confirmation d-flex justify-center align-center fill-height text-center px-6 bg-grey-lighten-4"
  >
    <v-card class="py-12 px-4 elevation-10 w-100">
      <template v-if="isAttendance">
        <v-icon color="cyan-darken-1" size="100" class="mb-6"
          >mdi-check-circle</v-icon
        >
        <h2 class="text-h5 font-weight-bold mb-6">
          出欠のご回答<br />ありがとうございました!
        </h2>
        <p class="text-body-1 mb-6">
          同窓会当日にお会いできるのを<br />楽しみにしております。
        </p>
        <p class="text-success font-weight-bold text-h6 mb-6">
          メールを送信しましたので<br />ご確認ください。
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
      </template>
      <template v-else>
        <v-icon color="red-darken-1" size="100" class="mb-6">
          mdi-cancel
        </v-icon>
        <h2 class="text-h5 font-weight-bold mb-6">
          出欠のご回答<br />ありがとうございました。
        </h2>
        <p class="text-body-1 mb-6">
          今回はご参加いただけないとのこと、<br />
          残念ですがまたの機会を楽しみにしております。
        </p>
      </template>
    </v-card>
  </div>
</template>

<script lang="ts" setup>
import {
  collection,
  addDoc,
  getDoc,
  doc,
  deleteDoc,
  getDocs,
  query,
  where,
  updateDoc,
} from 'firebase/firestore';
import { useFirebase } from '@/composables/useFirebase';
import { createEmailText } from '@/utils/email';

const router = useRouter();
const route = useRoute();
const reservationId = route.query.reservationId;
const isAttendance = route.query.isAttendance === 'true';
const { sendEmail } = useSendEmail();
const { db } = useFirebase();
const reservationData = ref<any>(null);

onMounted(async () => {
  // await handleAttend();
});

// const handleAttend = async () => {
//   if (!isAttendance) return;
//   reservationData.value = await fetchReservationData();
//   const attendanceData = {
//     email: reservationData.value?.email,
//     name: reservationData.value?.name,
//     className: reservationData.value?.className,
//     isAttendance: reservationData.value?.isAttendance,
//     message: reservationData.value?.message,
//     invitationId: reservationData.value?.invitationId,
//   };
//   await saveAttendanceData(attendanceData);
//   const emailText = createEmailText(reservationData.value.invitation);
//   await sendConfirmationEmail(
//     reservationData.value?.email,
//     reservationData.value?.invitation?.title,
//     emailText
//   );
//   await deleteReservation();
// };

const handleBackToDetail = () => {
  router.push(`/dashboard/invitation/${reservationData.value.invitationId}`);
};

// const fetchReservationData = async () => {
//   const reservationRef = doc(db, 'reservations', reservationId as string);
//   const reservationSnap = await getDoc(reservationRef);
//   return reservationSnap.data();
// };

// const deleteReservation = async () => {
//   const reservationRef = doc(db, 'reservations', reservationId as string);
//   await deleteDoc(reservationRef);
// };

// const saveAttendanceData = async (attendanceData: Record<string, any>) => {
//   const attendancesSubCollection = collection(
//     db,
//     'invitations',
//     attendanceData.invitationId,
//     'attendances'
//   );

//   const querySnapshot = await getDocs(
//     query(attendancesSubCollection, where('name', '==', attendanceData.name))
//   );

//   if (!querySnapshot.empty) {
//     const docRef = querySnapshot.docs[0].ref;
//     await updateDoc(docRef, attendanceData);
//     return;
//   }
//   await addDoc(attendancesSubCollection, attendanceData);
// };

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
