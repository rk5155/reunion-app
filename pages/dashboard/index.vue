<template>
  <v-app>
    <v-container>
      <h2>招待状一覧</h2>

      <v-card class="mt-4">
        <v-card-text>
          <v-list>
            <v-list-item v-for="invitation in invitations" :key="invitation.id">
              <v-list-item-title>{{ invitation.title }}</v-list-item-title>
              <v-list-item-subtitle>{{ invitation.date }}</v-list-item-subtitle>
            </v-list-item>
          </v-list>
        </v-card-text>
      </v-card>
    </v-container>

    <v-btn
      class="fixed-add-button"
      color="deep-purple-lighten-3"
      @click="handleAddInvitation"
    >
      招待状を追加する
    </v-btn>
  </v-app>
</template>

<script lang="ts" setup>
import { useAuthStore } from '@/stores/auth';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import { collection, onSnapshot } from 'firebase/firestore';
import { useFirebase } from '@/composables/useFirebase';

const { db } = useFirebase();
const router = useRouter();
const authStore = useAuthStore();
const { user } = storeToRefs(authStore);
const userEmail = computed(() => user.value?.email || null);
const hydrated = ref(false);
const invitations = ref([]);

onMounted(() => {
  hydrated.value = true;

  const invitationsRef = collection(db, 'invitations');
  onSnapshot(invitationsRef, (snapshot) => {
    invitations.value = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
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
