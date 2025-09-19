<template>
  <div>
    <div class="d-flex align-center ma-4">
      <v-btn icon @click="handleBack" color="deep-purple-darken-3" class="mr-2">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <h2 class="text-h6 font-weight-bold">参加者一覧</h2>
    </div>

    <v-card class="mb-4" outlined>
      <v-card-title class="bg-deep-purple-lighten-3 mb-4">
        {{ invitation.title }}
      </v-card-title>
      <v-card-text>
        <p class="mb-2"><strong>開催日:</strong> {{ invitation.date }}</p>
        <p class="mb-2"><strong>会場:</strong> {{ invitation.venueName }}</p>
      </v-card-text>
    </v-card>

    <v-card class="mt-4" outlined>
      <v-card-title>参加状況サマリー</v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="6">
            <div class="text-center">
              <div class="text-h4 font-weight-bold text-success">
                {{ participantCount }}
              </div>
              <div class="text-body-2">参加者</div>
            </div>
          </v-col>
          <v-col cols="6">
            <div class="text-center">
              <div class="text-h4 font-weight-bold text-error">
                {{ nonParticipantCount }}
              </div>
              <div class="text-body-2">不参加者</div>
            </div>
          </v-col>
        </v-row>
        <v-row class="mt-2">
          <v-col cols="12">
            <div class="text-center">
              <span class="text-h6 font-weight-bold"
                >回答: {{ totalCount }}人</span
              >
            </div>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <!-- 参加者セクション -->
    <v-card outlined class="mb-4">
      <v-card-title
        class="d-flex justify-space-between align-center bg-success-lighten-4"
      >
        <span>参加者</span>
        <v-chip color="success" text-color="white">
          {{ participants.length }}人
        </v-chip>
      </v-card-title>

      <v-card-text v-if="isLoading" class="text-center py-8">
        <v-progress-circular indeterminate color="primary" />
        <p class="mt-2">読み込み中...</p>
      </v-card-text>

      <v-card-text
        v-else-if="participants.length === 0"
        class="text-center py-8"
      >
        <v-icon size="64" color="grey">mdi-account-group-outline</v-icon>
        <p class="text-h6 mt-2">まだ参加者がいません</p>
        <p class="text-body-2 text-grey">
          招待状を共有して参加者を募集しましょう
        </p>
      </v-card-text>

      <v-list v-else>
        <template v-for="(attendee, index) in participants" :key="attendee.id">
          <v-list-item class="py-4">
            <v-icon color="success" size="24" class="mb-1">
              mdi-check-circle
            </v-icon>

            <v-list-item-title class="font-weight-bold mb-1">
              {{ attendee.name }}
            </v-list-item-title>
            <v-list-item-subtitle class="mb-1">
              {{ attendee.email }}
            </v-list-item-subtitle>
            <v-list-item-subtitle class="mb-1">
              クラス: {{ attendee.className }}
            </v-list-item-subtitle>
            <v-list-item-subtitle v-if="attendee.message" class="mt-1">
              <strong>メッセージ:</strong> {{ attendee.message }}
            </v-list-item-subtitle>
            <v-list-item-subtitle class="text-caption text-grey">
              回答日: {{ formatDate(attendee.createdAt) }}
            </v-list-item-subtitle>
          </v-list-item>

          <v-divider v-if="index < participants.length - 1" />
        </template>
      </v-list>
    </v-card>

    <!-- 不参加者セクション -->
    <v-card outlined class="mb-4">
      <v-card-title
        class="d-flex justify-space-between align-center bg-error-lighten-4"
      >
        <span>不参加者</span>
        <v-chip color="error" text-color="white">
          {{ nonParticipants.length }}人
        </v-chip>
      </v-card-title>

      <v-card-text v-if="isLoading" class="text-center py-8">
        <v-progress-circular indeterminate color="primary" />
        <p class="mt-2">読み込み中...</p>
      </v-card-text>

      <v-card-text
        v-else-if="nonParticipants.length === 0"
        class="text-center py-8"
      >
        <v-icon size="64" color="grey">mdi-account-cancel-outline</v-icon>
        <p class="text-h6 mt-2">不参加者はいません</p>
      </v-card-text>

      <v-list v-else>
        <template
          v-for="(attendee, index) in nonParticipants"
          :key="attendee.id"
        >
          <v-list-item class="py-4">
            <v-icon color="error" size="24" class="mb-1"> mdi-cancel </v-icon>

            <v-list-item-title class="font-weight-bold mb-1">
              {{ attendee.name }}
            </v-list-item-title>
            <v-list-item-subtitle class="mb-1">
              {{ attendee.email }}
            </v-list-item-subtitle>
            <v-list-item-subtitle class="mb-1" v-if="attendee.className">
              クラス: {{ attendee.className }}
            </v-list-item-subtitle>
            <v-list-item-subtitle v-if="attendee.message" class="mt-1">
              <strong>メッセージ:</strong> {{ attendee.message }}
            </v-list-item-subtitle>
            <v-list-item-subtitle class="text-caption text-grey">
              回答日: {{ formatDate(attendee.createdAt) }}
            </v-list-item-subtitle>
          </v-list-item>

          <v-divider v-if="index < nonParticipants.length - 1" />
        </template>
      </v-list>
    </v-card>
  </div>
</template>

<script lang="ts" setup>
import {
  doc,
  getDoc,
  collection,
  getDocs,
  where,
  query,
  orderBy,
} from 'firebase/firestore';
import { useFirebase } from '@/composables/useFirebase';
import { useAuthStore } from '@/stores/auth';
import type { Invitation } from '@/types/invitation';

definePageMeta({
  layout: 'dashboard',
});

const { db } = useFirebase();
const router = useRouter();
const route = useRoute();
const authStore = useAuthStore();
const invitationId = route.params.id as string;

const invitation = ref<Invitation>({
  title: '',
  date: '',
  startTime: '',
  endTime: '',
  receptionStartTime: '',
  venueName: '',
  venueAddress: '',
  deadline: '',
  schoolName: '',
  graduationYear: '',
  fee: 0,
  description: '',
  remarks: '',
  creatorId: '',
  organiserName: '',
});

const attendees = ref<any[]>([]);
const isLoading = ref(true);

// 参加者と不参加者を分ける
const participants = computed(() =>
  attendees.value.filter((attendee) => attendee.isAttendance)
);

const nonParticipants = computed(() =>
  attendees.value.filter((attendee) => !attendee.isAttendance)
);

// 参加者数と不参加者数を計算
const participantCount = computed(() => participants.value.length);

const nonParticipantCount = computed(() => nonParticipants.value.length);

const totalCount = computed(
  () => participantCount.value + nonParticipantCount.value
);

// 日付フォーマット関数
const formatDate = (timestamp: any) => {
  if (!timestamp) return '';

  const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
  return date.toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

// 招待状データを取得
const fetchInvitation = async () => {
  try {
    const docRef = doc(db, 'invitations', invitationId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data() as Invitation;
      invitation.value = {
        id: docSnap.id,
        ...data,
      };

      // 権限チェック
      if (data.creatorId !== authStore.user?.uid) {
        alert('アクセス権限がありません');
        router.push('/dashboard');
        return;
      }
    } else {
      alert('招待状が見つかりません');
      router.push('/dashboard');
    }
  } catch (error) {
    console.error('招待状の取得に失敗しました:', error);
    alert('データの読み込みに失敗しました');
  }
};

const fetchAttendees = async () => {
  try {
    const attendancesRef = collection(
      db,
      'invitations',
      invitationId,
      'attendances'
    );
    const q = query(attendancesRef, orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);

    attendees.value = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error('参加者の取得に失敗しました:', error);
    alert('参加者データの読み込みに失敗しました');
  }
};

const handleBack = () => {
  router.push('/dashboard');
};

onMounted(async () => {
  await fetchInvitation();
  await fetchAttendees();
  isLoading.value = false;
});
</script>

<style scoped>
.v-list-item {
  padding: 16px;
}

.v-chip {
  font-weight: bold;
}
</style>
