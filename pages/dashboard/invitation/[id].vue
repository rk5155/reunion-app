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

      <invitation-alerts :deadline="invitation.deadline" />

      <v-card class="semi-transparent-card">
        <v-img
          src="/images/invitation.jpg"
          alt="イベント画像"
          class="event-image mb-4 rounded-0"
          contain
        />

        <invitation-header />

        <invitation-description :invitation="invitation" />

        <invitation-messages :attendees-with-messages="attendeesWithMessages" />

        <invitation-organizers :organizers="invitation.organisers" />

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

        <invitation-participation
          :attendee-count="attendeeCount"
          :show-attendee-count="showAttendeeCount"
        />

        <invitation-countdown :date="invitation.date" :countdown="countdown" />

        <invitation-information :invitation="invitation" />

        <invitation-attendance-form
          :deadline="invitation.deadline"
          :is-deadline-passed="isDeadlinePassed"
          @submit="handleFormSubmit"
        />

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
import type { Invitation, Countdown, Attendee } from '@/types/invitation';
import AOS from 'aos';
import 'aos/dist/aos.css';

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
const attendeesWithMessages = ref<Attendee[]>([]);

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

  const attendeesQuery = query(
    attendancesSubCollection,
    where('isAttendance', '==', true)
  );
  const attendeeDocs = await getDocs(attendeesQuery);

  const attendeesWithMsg = attendeeDocs.docs
    .map((doc) => ({ id: doc.id, ...doc.data() } as Attendee))
    .filter((attendee) => attendee.message && attendee.message.trim() !== '');

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
</style>
