<template>
  <div>
    <h2 class="text-center text-h6 font-weight-bold mb-4">招待状の詳細</h2>
    <v-card class="pa-4">
      <v-card-title class="text-h5">{{ invitation.title }}</v-card-title>
      <v-card-subtitle class="text-h6"
        >開催日: {{ invitation.date }}</v-card-subtitle
      >
      <v-card-text>
        <p>開始時間: {{ invitation.startTime }}</p>
        <p>終了時間: {{ invitation.endTime }}</p>
        <p>会場名: {{ invitation.venueName }}</p>
        <p>会場住所: {{ invitation.venueAddress }}</p>
        <p>締切日: {{ invitation.deadline }}</p>
        <p>説明: {{ invitation.description }}</p>
        <p>招待状ID: {{ invitationId }}</p>
      </v-card-text>
    </v-card>
    <v-btn color="primary" class="mt-4" @click="handleEdit">編集する</v-btn>
    <v-btn color="secondary" class="mt-4" @click="handleBack">戻る</v-btn>
  </div>
</template>

<script lang="ts" setup>
import { useRouter, useRoute } from 'vue-router';
import { doc, getDoc } from 'firebase/firestore';
import { useFirebase } from '@/composables/useFirebase';
import { ref, onMounted } from 'vue';

definePageMeta({ layout: 'dashboard' });

const { db } = useFirebase();
const router = useRouter();
const route = useRoute();
const invitationId = route.params.id;

const invitation = ref({
  title: '',
  date: '',
  startTime: '',
  endTime: '',
  venueName: '',
  venueAddress: '',
  deadline: '',
  description: '',
});

onMounted(async () => {
  if (!invitationId) {
    alert('招待状IDが見つかりません');
    router.push('/dashboard');
    return;
  }

  const docRef = doc(db, 'invitations', invitationId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    invitation.value = docSnap.data();
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
</script>

<style scoped>
h2 {
  margin-bottom: 20px;
}
</style>
