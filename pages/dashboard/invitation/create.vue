<template>
  <v-container>
    <v-card>
      <v-card-title class="text-h5 text-center font-weight-bold mb-4">
        招待状を作成
      </v-card-title>
      <v-card-text>
        <v-form @submit.prevent="handleSubmit">
          <v-text-field
            v-model="form.title"
            label="イベントタイトル"
            outlined
            required
          />
          <v-text-field
            v-model="form.date"
            label="開催日"
            type="date"
            outlined
            required
          />
          <v-btn
            type="submit"
            color="deep-purple-accent-1"
            block
            class="font-weight-bold rounded-pill"
          >
            作成
          </v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { collection, addDoc } from 'firebase/firestore';
import { useFirebase } from '@/composables/useFirebase'; // useFirebase をインポート

definePageMeta({
  layout: 'dashboard',
});

const router = useRouter();
const { db } = useFirebase(); // Firestore インスタンスを取得

const form = ref({
  title: '',
  date: '',
});

const handleSubmit = async () => {
  if (!form.value.title || !form.value.date) {
    alert('すべてのフィールドを入力してください。');
    return;
  }

  try {
    // Firestore にデータを保存
    const docRef = await addDoc(collection(db, 'invitations'), {
      title: form.value.title,
      date: form.value.date,
    });

    console.log('招待状ID:', docRef.id);
    alert('招待状が作成されました！');
    router.push('/dashboard'); // 作成後にダッシュボードへリダイレクト
  } catch (error) {
    console.error('招待状の作成に失敗しました:', error);
    alert('招待状の作成に失敗しました。');
  }
};
</script>

<style scoped>
/* 必要に応じてスタイルを追加 */
</style>
