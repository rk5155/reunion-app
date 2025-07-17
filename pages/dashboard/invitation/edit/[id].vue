<template>
  <div>
    <h2 class="text-center text-h6 font-weight-bold mb-4">招待状を編集</h2>

    <v-form ref="formRef" @submit.prevent="handleSubmit">
      <v-text-field
        v-model="form.title"
        label="タイトル"
        outlined
        required
        class="mb-4"
      />
      <v-text-field
        v-model="form.date"
        label="開催日"
        outlined
        required
        class="mb-4"
        type="date"
      />
      <v-text-field
        v-model="form.startTime"
        label="開始時間"
        outlined
        required
        class="mb-4"
        type="time"
      />
      <v-text-field
        v-model="form.endTime"
        label="終了時間"
        outlined
        required
        class="mb-4"
        type="time"
      />
      <v-text-field
        v-model="form.receptionStartTime"
        label="受付開始時間"
        outlined
        required
        class="mb-4"
        type="time"
      />
      <v-text-field
        v-model="form.venueName"
        label="会場名"
        outlined
        required
        class="mb-4"
      />
      <v-text-field
        v-model="form.venueAddress"
        label="会場の住所"
        outlined
        required
        class="mb-4"
      />
      <v-text-field
        v-model="form.venueUrl"
        label="会場のURL"
        outlined
        class="mb-4"
        type="url"
      />
      <v-text-field
        v-model="form.mapEmbedUrl"
        label="Google Maps埋め込みURL"
        outlined
        class="mb-4"
        type="url"
        hint="Google Mapsの「地図を埋め込む」から取得したsrc URLを入力してください"
        persistent-hint
      />
      <v-text-field
        v-model="form.nearestStation"
        label="アクセス"
        outlined
        class="mb-4"
      />
      <v-text-field
        v-model="form.deadline"
        label="回答締切日"
        outlined
        required
        class="mb-4"
        type="date"
      />
      <v-text-field
        v-model="form.schoolName"
        label="学校名"
        outlined
        required
        class="mb-4"
      />
      <v-text-field
        v-model="form.graduationYear"
        label="卒業年度"
        outlined
        required
        class="mb-4"
        type="number"
      />
      <v-text-field
        v-model="form.fee"
        label="料金"
        outlined
        required
        class="mb-4"
        type="number"
      />
      <v-select
        v-model="selectedTemplate"
        :items="descriptionTemplates"
        label="案内文テンプレート"
        outlined
        class="mb-4"
      />
      <v-textarea
        v-model="computedDescription"
        label="案内文"
        outlined
        required
        class="mb-4"
      />
      <v-textarea v-model="form.remarks" label="備考" outlined class="mb-4" />
      <div class="d-flex justify-center pa-4 bg-white">
        <v-btn type="submit" color="primary" class="mx-2">保存</v-btn>
        <v-btn class="mx-2" @click="handleCancel">キャンセル</v-btn>
      </div>
    </v-form>
  </div>
</template>

<script lang="ts" setup>
import { useRouter, useRoute } from 'vue-router';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useFirebase } from '@/composables/useFirebase';
import { useAuthStore } from '@/stores/auth';
import { generateDescriptionTemplates } from '@/constants/descriptionTemplates';
import { ref, computed, onMounted } from 'vue';
import type { Invitation } from '@/types/invitation';

definePageMeta({ layout: 'dashboard' });

const { db } = useFirebase();
const router = useRouter();
const route = useRoute();
const authStore = useAuthStore();
const invitationId = route.params.id;

const form = ref<Invitation>({
  title: '',
  date: '',
  startTime: '',
  endTime: '',
  receptionStartTime: '',
  venueName: '',
  venueAddress: '',
  venueUrl: '',
  mapEmbedUrl: '',
  nearestStation: '',
  deadline: '',
  schoolName: '',
  graduationYear: '',
  fee: 0,
  description: '',
  remarks: '',
  creatorId: '',
});

const selectedTemplate = ref('');
const formRef = ref(null);

const descriptionTemplates = computed(() => {
  const { schoolName, graduationYear } = form.value;
  return schoolName && graduationYear
    ? generateDescriptionTemplates(schoolName, graduationYear)
    : [];
});

const computedDescription = computed(() => {
  return selectedTemplate.value || form.value.description;
});

onMounted(async () => {
  if (!invitationId) {
    alert('招待状IDが見つかりません');
    router.push('/dashboard');
    return;
  }

  const docRef = doc(db, 'invitations', invitationId as string);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    form.value = { ...(docSnap.data() as Invitation) };
  }

  if (form.value.creatorId !== authStore.user?.uid) {
    alert('編集権限がありません');
    router.push('/');
  }
});

const handleSubmit = async () => {
  const docRef = doc(db, 'invitations', invitationId as string);
  await updateDoc(docRef, {
    title: form.value.title,
    date: form.value.date,
    startTime: form.value.startTime,
    endTime: form.value.endTime,
    receptionStartTime: form.value.receptionStartTime,
    venueName: form.value.venueName,
    venueAddress: form.value.venueAddress,
    venueUrl: form.value.venueUrl,
    mapEmbedUrl: form.value.mapEmbedUrl,
    nearestStation: form.value.nearestStation,
    deadline: form.value.deadline,
    schoolName: form.value.schoolName,
    graduationYear: form.value.graduationYear,
    fee: form.value.fee,
    description: computedDescription.value,
    remarks: form.value.remarks,
  });
  alert('招待状を更新しました');
  router.push(`/dashboard/invitation/${invitationId}`);
};

const handleCancel = () => {
  router.push(`/dashboard/invitation/${invitationId}`);
};
</script>

<style scoped>
h2 {
  margin-bottom: 20px;
}
</style>
