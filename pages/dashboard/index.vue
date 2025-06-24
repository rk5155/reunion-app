<template>
  <div>
    <h2 class="text-center text-h6 font-weight-bold mb-4">招待状一覧</h2>

    <template v-if="invitations.length === 0">
      <p class="text-center text-body-1">招待状が作成されていません。</p>
    </template>

    <template v-else>
      <template v-for="invitation in invitations" :key="invitation.id">
        <v-card
          variant="outlined"
          color="deep-purple-lighten-3"
          class="mb-2 rounded-lg d-flex align-center"
          @click="handleViewInvitation(invitation.id)"
        >
          <v-card-text class="pa-4 flex-grow-1">
            <v-list class="pa-0">
              <v-list-item class="pa-0">
                <v-list-item-title class="mb-3 text-h6">{{
                  invitation.title
                }}</v-list-item-title>
                <v-list-item-subtitle
                  >開催日: {{ invitation.date }}</v-list-item-subtitle
                >
              </v-list-item>
            </v-list>
          </v-card-text>

          <v-btn icon size="x-small" color="deep-purple-darken-3" class="ma-2">
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
        </v-card>
      </template>
    </template>

    <v-btn
      class="fixed-add-button"
      color="deep-purple-lighten-3"
      @click="handleAddInvitation"
    >
      招待状を追加する
    </v-btn>

    <button @click="sendEmail">メールを送信</button>
  </div>
</template>

<script lang="ts" setup>
import { useAuthStore } from '@/stores/auth';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { useFirebase } from '@/composables/useFirebase';
import type { Invitation } from '@/src/types/invitation';

const { db } = useFirebase();
const router = useRouter();
const authStore = useAuthStore();
const { user } = storeToRefs(authStore);
const userUid = computed(() => user.value?.uid || null); // UID を取得
const hydrated = ref(false);
const invitations = ref<Invitation[]>([]);

onMounted(() => {
  hydrated.value = true;

  if (!userUid.value) {
    alert('ログインしてください');
    router.push('/login');
    return;
  }

  const invitationsRef = collection(db, 'invitations');
  const userInvitationsQuery = query(
    invitationsRef,
    where('creatorId', '==', userUid.value)
  );

  onSnapshot(userInvitationsQuery, (snapshot) => {
    invitations.value = snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        title: data.title,
        date: data.date,
        ...data,
      };
    });
  });
});

definePageMeta({
  layout: 'dashboard',
});

const handleLogout = async () => {
  try {
    await authStore.logout();
    alert('ログアウトしました！');
    router.push('/login');
  } catch (error: unknown) {
    console.error('ログアウトエラー:', error);
  }
};

const handleAddInvitation = () => {
  router.push('/dashboard/invitation/create');
};

const handleViewInvitation = (id: string) => {
  router.push(`/dashboard/invitation/${id}`);
};

const sendEmail = async () => {
  try {
    await $fetch('/api/send-email', {
      method: 'POST',
      body: {
        to: 'baseballryuki5155@yahoo.co.jp',
        subject: 'テストメール',
        text: 'これはテストです',
      },
    });
    alert('メール送信成功！');
  } catch (error) {
    console.error('通信エラー:', error);
    alert('通信エラーが発生しました');
  }
};
</script>

<style scoped>
.fixed-add-button {
  position: fixed;
  bottom: 50px; /* 画面下部に配置 */
  left: 50%; /* 左右中央に配置 */
  transform: translateX(-50%); /* ボタンの幅を考慮して中央に調整 */
  z-index: 1000; /* 他の要素より前面に表示 */
  padding: 10px 20px;
  font-weight: bold;
  border-radius: 50px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  background-color: #673ab7; /* ボタンの背景色 */
  color: white; /* ボタンの文字色 */
}
</style>
