<template>
  <div class="invitation-detail text-center pa-0">
    <common-loading-overlay :visible="uiStore.loading" />

    <h1
      class="invitation-title text-center text-h6 font-weight-bold bg-white d-flex justify-center align-center"
      ref="titleRef"
    ></h1>

    <v-card class="semi-transparent-card">
      <v-img
        src="/images/invitation.jpg"
        alt="イベント画像"
        class="event-image mb-4 rounded-0"
        contain
      />

      <div class="my-16" data-aos="fade-up">
        <p class="mb-3 text-grey-darken-3 text-caption">
          Where memories meet, and stories begin.
        </p>
        <h2 class="ttl_center5 text-h3 font-weight-bold text-black mb-3">
          REUNION INVITATIONS
        </h2>
        <p class="text-grey-darken-3 text-caption">
          Together again, to cherish the moments we share.
        </p>
      </div>

      <v-card-text class="bg-black py-10" data-aos="fade-up">
        <v-img
          src="/images/invitation-2.jpg"
          class="event-image rounded-0"
          contain
        />
        <div class="pt-10">
          <p class="text-center text-h6 font-weight-bold mb-4">
            {{ invitation.title }}
          </p>
          <p class="text-pre-line">{{ invitation.description }}</p>
        </div>
      </v-card-text>

      <common-share-buttons
        :title="invitation.title"
        class="py-10 px-4"
        data-aos="fade-up"
      >
        <h2 class="mb-4 text-black">幹事からのお願い</h2>
        <div class="mb-6">
          <p>
            このページをまだ同窓会の開催を知らなそうな<br />
            同級生に拡散してください！
          </p>
          <p>
            一人でも多くの同窓生と再会できるように<br />ご協力をお願いいたします！
          </p>
        </div>
      </common-share-buttons>

      <v-card-text class="py-10 bg-grey-lighten-4" data-aos="fade-up">
        <h2 class="text-h5 font-weight-bold mb-4 text-black">
          CURRENT PARTICIPATION
        </h2>
        <p class="mb-2">現在の参加状況</p>
        <p class="text-h4 font-weight-bold text-cyan-lighten-2">
          {{ attendeeCount + 20 }} 人
        </p>
      </v-card-text>

      <v-card-text class="py-10 bg-grey-darken-4" data-aos="fade-up">
        <div class="max-width-800">
          <h3 class="text-h5 font-weight-bold mb-4">COUNTDOWN</h3>
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
        </div>
      </v-card-text>

      <v-card-text class="py-10 text-left max-width-800" data-aos="fade-up">
        <h3 class="text-h5 font-weight-bold mb-4 text-center">INFORMATION</h3>
        <v-table>
          <tbody>
            <tr>
              <td class="w-25">開催日</td>
              <td>{{ getFormattedDate(invitation.date) }}</td>
            </tr>
            <tr>
              <td class="w-25">受付開始</td>
              <td>{{ invitation.receptionStartTime }}〜</td>
            </tr>
            <tr>
              <td class="w-25">時間</td>
              <td>{{ invitation.startTime }} - {{ invitation.endTime }}</td>
            </tr>
            <tr>
              <td class="w-25">会場名</td>
              <td>{{ invitation.venueName }}</td>
            </tr>
            <tr>
              <td class="w-25">会費</td>
              <td class="py-4">
                {{ invitation.fee }}円<br />
                ※会費は当日受付にてお支払いください。
              </td>
            </tr>
            <tr>
              <td class="w-25">手数料</td>
              <td class="py-4">
                {{ SERVICE_FEE }}円<br />
                ※同窓会の円滑な開催のため、同窓会代行サービスを利用しております。<br />
                これにより、以下の業務をすべて委託しています。<br />
                ・会場の手配や調整 • 出欠管理・名簿管理 <br />
                ・参加者への連絡や案内 • 支払いの代行 <br />
                ・当日の受付対応や運営サポート<br /><br />
                このため、会費に加え、同窓会代行サービス利用手数料{{
                  SERVICE_FEE
                }}円を別途頂戴しております。<br />
                ご理解とご協力のほど何卒よろしくお願いいたします。<br />
                申込時に決済を行いますので、予めご了承ください。<br /><br />
                <nuxt-link
                  to="/"
                  class="text-primary font-weight-bold text-decoration-underline"
                >
                  詳細はこちら
                </nuxt-link>
              </td>
            </tr>

            <tr>
              <td class="w-25">会場住所</td>
              <td class="py-4">{{ invitation.venueAddress }}</td>
            </tr>
            <tr>
              <td class="w-25">アクセス</td>
              <td class="py-4">{{ invitation.nearestStation }}</td>
            </tr>
            <tr>
              <td class="w-25">会場URL</td>
              <td class="py-4">
                <a
                  :href="invitation.venueUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-primary font-weight-bold"
                >
                  {{ invitation.venueUrl }}
                </a>
              </td>
            </tr>
            <tr>
              <td class="w-25">備考</td>
              <td class="py-4 text-pre-line">{{ invitation.remarks }}</td>
            </tr>
          </tbody>
        </v-table>
      </v-card-text>

      <v-card-text class="py-10 bg-grey-lighten-2" data-aos="fade-up">
        <h3 class="text-h5 font-weight-bold mb-4">PRESENCE OR ABSENCE</h3>
        <div class="max-width-800">
          <div class="new-action-design-tm-Heading3 mb-4">
            お手数ですが　下記お日にち迄に<br />
            出欠情報のご連絡をお願い申し上げます<br />
            <div class="text-h5 mt-4 font-weight-bold text-pink-accent-3">
              出欠締切日：{{ getFormattedDate(invitation.deadline) }}
            </div>
          </div>
          <p class="mb-4 text-left">
            下記のフォームから同窓会への参加の可否を投稿してください。
            投稿後に再度出欠を変更することも可能です。
          </p>
          <p class="mb-4 text-left">個人情報の取り扱いについて</p>
          <p class="text-left mb-8">
            ・本フォームにて入力をいただいた情報は、同窓会の出欠確認および同窓会に関するご連絡にのみ利用をさせていただきます。<br />
            お客様の個人情報は、当社の個人情報の取り扱いについてに則りお取り扱いをいたします。<br />
            <a
              href="/privacy"
              target="_blank"
              rel="noopener noreferrer"
              class="text-primary font-weight-bold"
            >
              個人情報の取扱いについて </a
            >内容に同意の上、入力情報を送信してください。　
          </p>
          <p class="text-left mb-8 text-danger text-red">
            ※お申し込み時に発生する手数料（{{ SERVICE_FEE }}円）は、
            代行サービスの利用開始と同時に発生するため、<br />
            ご本人都合によるキャンセルや、万が一の開催中止となった場合でも、
            ご返金はできかねます。<br />
            あらかじめご理解のほど、何卒よろしくお願いいたします。
          </p>

          <div
            v-if="isDeadlinePassed"
            class="text-danger font-weight-bold mt-2"
          >
            受付は終了しました。
          </div>

          <invitation-form v-else class="mt-4" @submit="handleFormSubmit" />
        </div>
      </v-card-text>

      <common-share-buttons
        :title="invitation.title"
        class="py-10 px-4"
        data-aos="fade-up"
      />

      <p
        class="ttl_center5 text-h3 font-weight-bold my-16 text-black"
        data-aos="fade-up"
      >
        Thank you!!
      </p>
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
import {
  doc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
  addDoc,
  Timestamp,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore';
import { useFirebase } from '@/composables/useFirebase';
import { useUIStore } from '@/stores/ui';
import { useAuthStore } from '@/stores/auth';
import { useCheckout } from '@/composables/useCheckout';
import { getFormattedDate } from '@/utils/date';
import type { Invitation, Countdown } from '@/types/invitation';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Writer from 't-writer.js';
import { ref, onMounted, computed } from 'vue';

const SERVICE_FEE = 980;
const { db } = useFirebase();
const router = useRouter();
const route = useRoute();
const uiStore = useUIStore();
const authStore = useAuthStore();
const invitationId = route.params.id as string;
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
  remarks: '',
  receptionStartTime: '',
});

const countdown = ref<Countdown>({
  days: '-',
  hours: '-',
  minutes: '-',
  seconds: '-',
});

const attendeeCount = ref(0);
const titleRef = ref<HTMLElement | null>(null);

onMounted(async () => {
  const docRef = doc(db, 'invitations', invitationId as string);
  const docSnap = await getDoc(docRef);

  invitation.value = {
    id: docSnap.id,
    ...(docSnap.data() as Invitation),
  };

  updateCountdown();

  setInterval(updateCountdown, 1000);
  await fetchAttendeeCount();

  AOS.init({
    duration: 2000,
    once: true,
  });

  if (titleRef.value) {
    titleRef.value.textContent = '';
    const writer = new Writer(titleRef.value, {
      typeSpeed: 200,
    });
    writer.type(invitation.value.title).start();
  }
});

const isDeadlinePassed = computed(() => {
  if (!invitation.value.deadline) return false;
  const deadlineDate = new Date(invitation.value.deadline);
  const now = new Date();
  return now > deadlineDate;
});

const isCreator = computed(() => {
  return invitation.value.creatorId === authStore.user?.uid;
});

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
    where('isAttendance', '==', true)
  );
  const attendeeDocs = await getDocs(attendeesQuery);
  attendeeCount.value = attendeeDocs.size;
};

const handleEdit = () => {
  router.push(`/dashboard/invitation/edit/${invitationId}`);
};

const handleBack = () => {
  router.push('/dashboard');
};

const saveReservation = async (formData: any) => {
  const expireAt = Timestamp.fromDate(new Date(Date.now() + 60 * 60 * 1000));

  const reservationData = {
    ...formData,
    invitationId: invitationId,
    invitation: {
      title: invitation.value.title,
      date: invitation.value.date,
      startTime: invitation.value.startTime,
      endTime: invitation.value.endTime,
      venueName: invitation.value.venueName,
      venueAddress: invitation.value.venueAddress,
      fee: invitation.value.fee,
      remarks: invitation.value.remarks,
    },
    isPaid: false,
    createdAt: serverTimestamp(),
    expireAt: expireAt, // TTL対象
  };

  const docRef = await addDoc(collection(db, 'reservations'), reservationData);

  return docRef.id;
};

const registerAttend = async (formData: Record<string, any>) => {
  const reservationId = await saveReservation(formData);
  const successUrl = `${window.location.origin}/dashboard/invitation/confirmation?reservationId=${reservationId}&isAttendance=${formData.isAttendance}`;
  const cancelUrl = `${window.location.origin}/dashboard/invitation/${invitationId}`;

  formData.invitationId = invitationId;
  const res = await useCheckout(
    SERVICE_FEE,
    '同窓会代行サービス利用手数料',
    successUrl,
    formData.email,
    cancelUrl
  );
  if (res.url) window.location.href = res.url;
};

const registerAbsence = async (formData: Record<string, any>) => {
  const attendanceCollection = collection(db, 'attendances');
  const querySnapshot = await getDocs(
    query(attendanceCollection, where('name', '==', formData.name))
  );

  if (!querySnapshot.empty) {
    const docRef = querySnapshot.docs[0].ref;
    await updateDoc(docRef, formData);
  } else {
    await addDoc(attendanceCollection, formData);
  }

  router.push({
    path: '/dashboard/invitation/confirmation',
    query: {
      isAttendance: formData.isAttendance,
    },
  });
};

const handleFormSubmit = async (formData: Record<string, any>) => {
  try {
    uiStore.setLoading(true);
    if (formData.isAttendance) {
      await registerAttend(formData);
      return;
    }
    await registerAbsence(formData);
  } catch (error) {
    console.error('登録失敗:', error);
    alert('登録に失敗しました。もう一度お試しください。');
  } finally {
    uiStore.setLoading(false);
  }
};
</script>

<style scoped>
body {
  font-family: 'Sawarabi Mincho', serif;
}

.invitation-title {
  height: 60px;
}
.invitation-detail {
  background-image: url('/images/bg.png');
  background-size: cover;
  background-position: center;
  min-height: 100vh;
  padding: 20px;
  font-family: 'Sawarabi Mincho', serif;
}

.event-image {
  width: 100%;
  height: auto;
  border-radius: 10px 10px 0 0;
}

h2 {
  margin-bottom: 20px;
  color: #fff;
}

.semi-transparent-card {
  background-color: rgba(255, 255, 255, 0.8);
}
.text-h2,
.text-h3,
.text-h4,
.text-h5,
.text-h6 {
  font-family: 'Sawarabi Mincho', serif;
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

.fixed-bottom {
  background-color: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border-top: 1px solid #ddd;
  padding: 10px 0;
}

.sticky-bottom {
  position: sticky;
  bottom: 0;
  z-index: 10;
}

.max-width-800 {
  max-width: 800px;
  margin: auto;
}
</style>
