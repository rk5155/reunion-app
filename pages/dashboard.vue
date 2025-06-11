<template>
  <v-container>
    <v-card>
      <v-card-title class="text-h5 text-center font-weight-bold mb-4">
        ダッシュボード
      </v-card-title>
      <v-card-text>
        <div class="text-center">
          <h2>ようこそ、{{ user?.email }} さん！</h2>
          <p>ここでは、イベントの管理やプロフィールの編集ができます。</p>
        </div>
        <v-btn color="deep-purple-accent-1" @click="handleLogout">
          ログアウト
        </v-btn>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script lang="ts" setup>
import { getAuth, signOut } from 'firebase/auth';

// Firebase Authentication
const auth = getAuth();
const user = ref(auth.currentUser);
console.log('Current User:', user.value);

onMounted(() => {
  // ユーザー情報を取得
  user.value = auth.currentUser;
});

const handleLogout = async () => {
  try {
    await signOut(auth);
    alert('ログアウトしました！');
    window.location.href = '/login'; // ログインページにリダイレクト
  } catch (error) {
    console.error('ログアウトエラー:', error);
    alert('ログアウトに失敗しました: ' + error.message);
  }
};
</script>
