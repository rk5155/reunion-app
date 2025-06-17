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
      ></v-text-field>
      <v-text-field
        v-model="form.date"
        label="開催日"
        outlined
        required
        class="mb-4"
        type="date"
      ></v-text-field>
      <v-btn type="submit" color="primary" class="mt-4">保存</v-btn>
      <v-btn color="secondary" class="mt-4" @click="handleCancel"
        >キャンセル</v-btn
      >
    </v-form>
  </div>
</template>

<script lang="ts" setup>
import { useRouter, useRoute } from 'vue-router';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useFirebase } from '@/composables/useFirebase';
import { ref, onMounted } from 'vue';

definePageMeta({
  layout: 'dashboard',
});

const { db } = useFirebase();
const router = useRouter();
const route = useRoute();
const invitationId = route.params.id;

const form = ref({
  title: '',
  date: '',
});

const formRef = ref(null);

onMounted(async () => {
  if (!invitationId) {
    alert('招待状IDが見つかりません');
    router.push('/dashboard');
    return;
  }

  const docRef = doc(db, 'invitations', invitationId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    form.value = docSnap.data();
  } else {
    alert('招待状が存在しません');
    router.push('/dashboard');
  }
});

const handleSubmit = async () => {
  const docRef = doc(db, 'invitations', invitationId);
  await updateDoc(docRef, {
    title: form.value.title,
    date: form.value.date,
  });
  alert('招待状を更新しました');
  router.push('/dashboard');
};

const handleCancel = () => {
  router.push('/dashboard');
};
</script>

<style scoped>
h2 {
  margin-bottom: 20px;
}
</style>
