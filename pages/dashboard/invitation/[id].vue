<template>
  <div
    v-if="isLoading"
    class="d-flex justify-center align-center"
    style="min-height: 100vh"
  >
    <v-progress-circular indeterminate size="64" color="primary" />
  </div>
  <div v-else-if="!invitation.id">
    <v-alert type="error" class="text-center">
      招待状が見つかりません。URLを確認してください。
    </v-alert>
  </div>

  <template v-else>
    <invitation-sagi-explanation v-if="showSagiExplanation" />

    <div v-else class="invitation-detail text-center pa-0">
      <common-loading-overlay :visible="uiStore.loading" />

      <h1
        class="invitation-title text-center text-h6 font-weight-bold bg-white d-flex justify-center align-center"
      >
        {{ invitation.title }}
      </h1>

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

        <v-card-text class="py-10 bg-grey-lighten-2" data-aos="fade-up">
          <div class="max-width-800">
            <v-alert color="#f50057" class="mb-6" icon="mdi-clock-outline">
              <div class="text-body-1 font-weight-bold text-left">
                予定が読めない、シフトが出てないから未定の人を考慮して、期限延長しました！
              </div>
            </v-alert>

            <div class="new-action-design-tm-Heading3 mb-4">
              お手数ですが　下記お日にち迄に<br />
              出欠情報のご連絡をお願い申し上げます。<br />
              <div class="text-h5 mt-4 font-weight-bold text-pink-accent-3">
                出欠締切日：{{ getFormattedDate(invitation.deadline) }}
              </div>
            </div>
          </div>
        </v-card-text>

        <v-card-text class="bg-black py-10" data-aos="fade-up">
          <v-img
            src="/images/invitation-2.jpg"
            class="event-image rounded-0"
            contain
          />
          <div class="pt-10">
            <h2 class="text-center text-h6 font-weight-bold mb-4">
              {{ invitation.title }}
            </h2>
            <p class="text-pre-line">{{ invitation.description }}</p>
          </div>
        </v-card-text>

        <v-card-text
          v-if="attendeesWithMessages.length > 0"
          class="py-10 bg-grey-lighten-3"
          data-aos="fade-up"
        >
          <div class="mx-auto" style="max-width: 800px">
            <h2 class="text-h5 font-weight-bold mb-4 text-black text-center">
              MESSAGES FROM ATTENDEES
            </h2>
            <p class="mb-6 text-black text-center">
              みんなからのメッセージ（抜粋）
            </p>

            <div
              class="overflow-x-auto pb-2"
              style="scrollbar-width: none; -ms-overflow-style: none"
            >
              <div
                class="d-flex ga-4"
                style="width: max-content; min-width: 100%"
              >
                <div
                  v-for="(attendee, index) in attendeesWithMessages"
                  :key="index"
                  class="flex-shrink-0"
                  style="width: 280px"
                >
                  <v-card
                    class="pa-4 d-flex align-center justify-center elevation-1"
                    style="height: 150px; border-left: 4px solid #000"
                    hover
                  >
                    <div
                      class="text-body-2 text-center overflow-y-auto pa-2"
                      style="
                        height: 100%;
                        width: 100%;
                        scrollbar-width: thin;
                        scrollbar-color: #ccc transparent;
                      "
                    >
                      <div class="d-flex align-center justify-center h-100">
                        <span class="text-pre-line text-black text-left">
                          {{ attendee.message }}
                        </span>
                      </div>
                    </div>
                  </v-card>
                </div>
              </div>
            </div>
          </div>
        </v-card-text>

        <v-card-text class="py-10 bg-grey-lighten-5" data-aos="fade-up">
          <h2 class="text-h5 font-weight-bold mb-4 text-black">ORGANIZERS</h2>
          <p class="mb-6 text-black">代表幹事</p>

          <div class="organizers-container max-width-800">
            <div
              v-for="(organiser, index) in invitation.organisers"
              :key="index"
              class="organiser-card mb-4 pa-4 bg-white rounded elevation-2"
            >
              <div>
                <div class="organiser-image-container mb-3">
                  <v-avatar
                    v-if="organiser.imageUrl"
                    size="150"
                    class="elevation-3"
                  >
                    <v-img
                      :src="organiser.imageUrl"
                      :alt="organiser.name"
                      cover
                    />
                  </v-avatar>
                  <v-avatar
                    v-else
                    size="80"
                    color="grey-lighten-2"
                    class="elevation-3"
                  >
                    <v-icon size="40" color="grey-darken-1">mdi-account</v-icon>
                  </v-avatar>
                </div>

                <div class="organiser-info flex-grow-1 text-center">
                  <h3 class="text-h6 font-weight-bold text-black mb-1">
                    {{ organiser.name }}
                  </h3>
                </div>
              </div>
            </div>
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

        <v-card-text
          v-if="showAttendeeCount"
          class="py-10 bg-grey-lighten-4"
          data-aos="fade-up"
        >
          <h2 class="text-h5 font-weight-bold mb-4 text-black">
            CURRENT PARTICIPATION
          </h2>
          <p class="mb-2">現在の参加状況</p>
          <p class="text-h4 font-weight-bold text-cyan-lighten-2">
            {{ attendeeCount }} 人
          </p>
        </v-card-text>

        <v-card-text class="py-10 bg-grey-darken-4" data-aos="fade-up">
          <div class="max-width-800">
            <h2 class="text-h5 font-weight-bold mb-4">COUNTDOWN</h2>
            <div class="text-h4 font-weight-bold mb-4">
              to {{ invitation.date }}
            </div>
            <div
              class="text-h4 font-weight-bold text-danger d-flex justify-space-between"
            >
              <div class="w-25">
                <div>{{ countdown.days }}</div>
                <div
                  class="countdown-label text-cyan-lighten-4 font-weight-bold"
                >
                  Days
                </div>
              </div>
              <div class="w-25">
                <div>{{ countdown.hours }}</div>
                <div
                  class="countdown-label text-cyan-lighten-4 font-weight-bold"
                >
                  Hours
                </div>
              </div>
              <div class="w-25">
                <div>{{ countdown.minutes }}</div>
                <div
                  class="countdown-label text-cyan-lighten-4 font-weight-bold"
                >
                  Minutes
                </div>
              </div>
              <div class="w-25">
                <div>{{ countdown.seconds }}</div>
                <div
                  class="countdown-label text-cyan-lighten-4 font-weight-bold"
                >
                  Seconds
                </div>
              </div>
            </div>
          </div>
        </v-card-text>

        <v-card-text class="py-10 text-left max-width-800" data-aos="fade-up">
          <h2 class="text-h5 font-weight-bold mb-4 text-center text-black">
            INFORMATION
          </h2>
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
                  ※当日受付にてお支払いください。
                </td>
              </tr>
              <!-- <tr>
                <td class="w-25">手数料</td>
                <td class="py-4">
                  {{ SERVICE_FEE }}円<br /><br />
                  ※同窓会の円滑な開催のため、企画プランニングやWEB案内状作成、受付・精算対応、写真撮影など、運営を一括でサポートする同窓会代行サービス(リユニオンアップ)を活用しています。<br /><br />
                  このため、同窓会代行サービス利用手数料{{
                    SERVICE_FEE
                  }}円を別途頂戴しております。<br /><br />
                  ご理解とご協力のほど何卒よろしくお願いいたします。<br />
                  申込時に決済を行いますので、予めご了承ください。<br /><br />

                  <a
                    href="/"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="text-primary font-weight-bold text-decoration-underline"
                  >
                    詳細はこちら
                  </a>
                </td>
              </tr> -->

              <tr>
                <td class="w-25">会場地図</td>
                <td class="py-4">
                  <div class="map-container">
                    <iframe
                      :src="invitation.mapEmbedUrl"
                      width="100%"
                      height="300"
                      style="border: 0"
                      loading="lazy"
                      referrerpolicy="no-referrer-when-downgrade"
                      class="rounded"
                    ></iframe>
                  </div>
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
          <h2 class="text-h5 font-weight-bold mb-4 text-black">
            PRESENCE OR ABSENCE
          </h2>
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
              お客様の個人情報は、個人情報の取り扱いについてに則りお取り扱いをいたします。<br />
              <a
                href="/privacy"
                target="_blank"
                rel="noopener noreferrer"
                class="text-primary font-weight-bold"
              >
                個人情報の取扱いについて </a
              >内容に同意の上、入力情報を送信してください。　
            </p>
            <!-- <p class="text-left mb-8 text-danger text-red">
              ※お申し込み時に発生する手数料（{{ SERVICE_FEE }}円）は、
              代行サービスの利用開始と同時に発生するため、<br />
              ご本人都合によるキャンセルや、万が一の開催中止となった場合でも、
              ご返金はできかねます。<br />
              あらかじめご理解のほど、何卒よろしくお願いいたします。
            </p> -->

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
    </div>
  </template>

  <div
    v-if="isCreator && !isLoading"
    class="sticky-bottom d-flex justify-center pa-4 bg-white"
  >
    <v-btn color="primary" @click="handleEdit" class="mx-2"> 編集する </v-btn>
    <v-btn @click="handleBack" class="mx-2">戻る</v-btn>
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
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore';
import { useFirebase } from '@/composables/useFirebase';
import { useUIStore } from '@/stores/ui';
import { useAuthStore } from '@/stores/auth';
import { getFormattedDate } from '@/utils/date';
import type { Invitation, Countdown } from '@/types/invitation';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { ref, onMounted, computed } from 'vue';

const showSagiExplanation = ref(false);
const showAttendeeCount = ref(true);
const isLoading = ref(true);
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
  organiserName: '',
  organiserImageUrl: '',
});

const countdown = ref<Countdown>({
  days: '-',
  hours: '-',
  minutes: '-',
  seconds: '-',
});

const attendeeCount = ref(0);
const attendeesWithMessages = ref<any[]>([]);

onMounted(async () => {
  try {
    const docRef = doc(db, 'invitations', invitationId as string);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data() as Invitation;

      invitation.value = {
        id: docSnap.id,
        ...data,
      };

      showSagiExplanation.value = data.showSagiExplanation ?? true;
      showAttendeeCount.value = data.showAttendeeCount ?? true;
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
    await fetchAttendeeCount();
    await fetchAttendeesWithMessages();

    isLoading.value = false;

    AOS.init({
      duration: 2000,
      once: true,
    });
  } catch (error) {
    console.error('データの読み込みに失敗しました:', error);
    isLoading.value = false;
  }
});

const isDeadlinePassed = computed(() => {
  if (!invitation.value.deadline) return false;
  const deadlineDate = new Date(invitation.value.deadline);
  deadlineDate.setHours(0, 0, 0, 0);
  deadlineDate.setDate(deadlineDate.getDate() + 1);
  const now = new Date();
  return now >= deadlineDate;
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
  const attendancesSubCollection = collection(
    db,
    'invitations',
    invitationId as string,
    'attendances'
  );
  const attendeesQuery = query(
    attendancesSubCollection,
    where('isAttendance', '==', true)
  );
  const attendeeDocs = await getDocs(attendeesQuery);
  attendeeCount.value = attendeeDocs.size;
};

const fetchAttendeesWithMessages = async () => {
  const attendancesSubCollection = collection(
    db,
    'invitations',
    invitationId as string,
    'attendances'
  );

  const allAttendeesQuery = query(attendancesSubCollection);
  const attendeeDocs = await getDocs(allAttendeesQuery);

  const attendeesWithMsg = attendeeDocs.docs
    .map((doc) => ({ id: doc.id, ...doc.data() }))
    .filter((attendee) => attendee.message && attendee.message.trim() !== '')
    .sort((a, b) => {
      // createdAtで降順ソート（新しい順）
      if (a.createdAt && b.createdAt) {
        return b.createdAt.toDate() - a.createdAt.toDate();
      }
      return 0;
    });

  attendeesWithMessages.value = attendeesWithMsg;
};

const formatMessageDate = (timestamp: any) => {
  if (!timestamp) return '';
  const date = timestamp.toDate();
  return date.toLocaleDateString('ja-JP', {
    month: 'numeric',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

const handleEdit = () => {
  router.push(`/dashboard/invitation/edit/${invitationId}`);
};

const handleBack = () => {
  router.push('/dashboard');
};

const registerAttendance = async (formData: Record<string, any>) => {
  const attendancesSubCollection = collection(
    db,
    'invitations',
    invitationId as string,
    'attendances'
  );

  const querySnapshot = await getDocs(
    query(
      attendancesSubCollection,
      where('name', '==', formData.name),
      where('email', '==', formData.email)
    )
  );

  if (!querySnapshot.empty) {
    const docRef = querySnapshot.docs[0].ref;
    await updateDoc(docRef, {
      ...formData,
      updatedAt: serverTimestamp(),
    });
  } else {
    await addDoc(attendancesSubCollection, {
      ...formData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
  }

  router.push({
    path: '/dashboard/invitation/confirmation',
    state: {
      isAttendance: formData.isAttendance,
      email: formData.email,
      title: invitation.value.title,
    },
  });
};

const handleFormSubmit = async (formData: Record<string, any>) => {
  try {
    uiStore.setLoading(true);
    await registerAttendance(formData);
  } catch (error) {
    console.error('登録失敗:', error);
    alert('登録に失敗しました。もう一度お試しください。');
  } finally {
    uiStore.setLoading(false);
  }
};
</script>

<style scoped>
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

.map-container {
  overflow: hidden;
  padding-top: 56.25%; /* 16:9 */
  position: relative;
  height: 0;
}

.map-container iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.overflow-x-auto::-webkit-scrollbar {
  display: none;
}

.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: transparent;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background-color: #ccc;
  border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background-color: #999;
}

@media (max-width: 600px) {
  .overflow-x-auto .flex-shrink-0 {
    width: 240px !important;
  }
}
</style>
