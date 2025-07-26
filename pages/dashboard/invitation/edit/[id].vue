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
      <v-text-field
        v-model="form.organiserName"
        label="幹事の名前"
        outlined
        required
        class="mb-4"
        hint="幹事の氏名を入力してください"
        persistent-hint
      />
      <v-file-input
        v-model="organiserImage"
        label="幹事の画像"
        outlined
        accept="image/*"
        prepend-icon="mdi-camera"
        class="mb-4"
        show-size
        hint="幹事の写真をアップロードしてください"
        persistent-hint
      />
      <div v-if="form.organiserImageUrl" class="mb-4">
        <p class="text-caption mb-2">現在の幹事画像:</p>
        <v-img
          :src="form.organiserImageUrl"
          max-width="200"
          max-height="200"
          class="rounded"
        />
      </div>
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
        <v-btn
          type="submit"
          color="primary"
          class="mx-2"
          :loading="isUploading"
          :disabled="isUploading"
        >
          {{ isUploading ? 'アップロード中...' : '保存' }}
        </v-btn>
        <v-btn class="mx-2" @click="handleCancel" :disabled="isUploading"
          >キャンセル</v-btn
        >
      </div>
    </v-form>
  </div>
</template>

<script lang="ts" setup>
import { useRouter, useRoute } from 'vue-router';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import {
  getStorage,
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from 'firebase/storage';
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
  organiserName: '',
  organiserImageUrl: '',
});

const selectedTemplate = ref('');
const formRef = ref(null);
const organiserImage = ref<File[]>([]);
const isUploading = ref(false);

// Firebase Storage の設定
const storage = getStorage();

const descriptionTemplates = computed(() => {
  const { schoolName, graduationYear } = form.value;
  return schoolName && graduationYear
    ? generateDescriptionTemplates(schoolName, graduationYear)
    : [];
});

const computedDescription = computed(() => {
  return selectedTemplate.value || form.value.description;
});

// 画像をFirebase Storageにアップロードする関数
const uploadImage = async (file: File): Promise<string> => {
  const timestamp = Date.now();
  const fileName = `organiser-images/${invitationId}/${timestamp}_${file.name}`;
  const imageRef = storageRef(storage, fileName);

  const snapshot = await uploadBytes(imageRef, file);
  const downloadURL = await getDownloadURL(snapshot.ref);

  return downloadURL;
};

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
  try {
    isUploading.value = true;

    let organiserImageUrl = form.value.organiserImageUrl;

    // 新しい画像がアップロードされた場合
    if (organiserImage.value.length > 0) {
      organiserImageUrl = await uploadImage(organiserImage.value[0]);
    }

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
      organiserName: form.value.organiserName,
      organiserImageUrl: organiserImageUrl,
    });

    alert('招待状を更新しました');
    router.push(`/dashboard/invitation/${invitationId}`);
  } catch (error) {
    console.error('Error updating invitation:', error);
    alert('更新中にエラーが発生しました');
  } finally {
    isUploading.value = false;
  }
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
