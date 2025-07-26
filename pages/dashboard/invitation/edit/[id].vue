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

      <!-- 幹事セクション -->
      <v-card class="mb-4" outlined>
        <v-card-title class="text-h6">
          幹事情報
          <v-spacer />
          <v-btn
            color="primary"
            icon
            @click="addOrganiser"
            :disabled="isUploading"
          >
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </v-card-title>

        <v-card-text>
          <div
            v-for="(organiser, index) in organisers"
            :key="index"
            class="organiser-item mb-4 pa-3"
            style="border: 1px solid #e0e0e0; border-radius: 4px"
          >
            <div class="d-flex justify-between align-center mb-3">
              <h4 class="text-subtitle-1">幹事 {{ index + 1 }}</h4>
              <v-btn
                v-if="organisers.length > 1"
                color="error"
                icon
                small
                @click="removeOrganiser(index)"
                :disabled="isUploading"
              >
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </div>

            <v-text-field
              v-model="organiser.name"
              label="幹事の名前"
              outlined
              required
              class="mb-3"
              hint="幹事の氏名を入力してください"
              persistent-hint
            />

            <v-file-input
              v-model="organiser.imageFile"
              label="幹事の画像"
              outlined
              accept="image/*"
              prepend-icon="mdi-camera"
              class="mb-3"
              show-size
              hint="幹事の写真をアップロードしてください"
              persistent-hint
              @change="handleImageChange(index, $event)"
            />

            <!-- プレビュー画像表示 -->
            <div v-if="getPreviewUrl(index) || organiser.imageUrl" class="mb-3">
              <p class="text-caption mb-2">
                {{
                  getPreviewUrl(index)
                    ? '選択された画像のプレビュー:'
                    : '現在の幹事画像:'
                }}
              </p>
              <v-img
                :src="getPreviewUrl(index) || organiser.imageUrl"
                max-width="200"
                max-height="200"
                class="rounded"
              />
              <p
                v-if="getPreviewUrl(index)"
                class="text-caption text-warning mt-2"
              >
                ※ 保存ボタンを押すと、この画像に更新されます
              </p>
            </div>
          </div>
        </v-card-text>
      </v-card>

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
        <v-btn class="mx-2" @click="handleCancel" :disabled="isUploading">
          キャンセル
        </v-btn>
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
  deleteObject,
} from 'firebase/storage';
import { useFirebase } from '@/composables/useFirebase';
import { useAuthStore } from '@/stores/auth';
import { generateDescriptionTemplates } from '@/constants/descriptionTemplates';
import { ref, computed, onMounted, onUnmounted } from 'vue';
import type { Invitation } from '@/types/invitation';

definePageMeta({ layout: 'dashboard' });

interface Organiser {
  name: string;
  imageUrl?: string;
  imageFile?: File[];
}

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
const isUploading = ref(false);
const organisers = ref<Organiser[]>([
  {
    name: '',
    imageUrl: '',
    imageFile: [],
  },
]);

// プレビューURLを別途管理
const previewUrls = ref<Map<number, string>>(new Map());

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

// プレビューURLを取得
const getPreviewUrl = (index: number): string => {
  return previewUrls.value.get(index) || '';
};

// 画像ファイル変更時の処理
const handleImageChange = (index: number, files: File[]) => {
  // 既存のプレビューURLをクリーンアップ
  const existingUrl = previewUrls.value.get(index);
  if (existingUrl) {
    URL.revokeObjectURL(existingUrl);
    previewUrls.value.delete(index);
  }

  // 新しい画像が選択された場合、プレビューURLを生成
  if (files && files.length > 0) {
    const newPreviewUrl = URL.createObjectURL(files[0]);
    previewUrls.value.set(index, newPreviewUrl);
  }
};

// 幹事を追加
const addOrganiser = () => {
  organisers.value.push({
    name: '',
    imageUrl: '',
    imageFile: [],
  });
};

// 幹事を削除
const removeOrganiser = async (index: number) => {
  const organiser = organisers.value[index];

  try {
    // Firebase Storageから画像を削除
    if (organiser.imageUrl) {
      await deleteOldImage(organiser.imageUrl);
      console.log('幹事の画像をStorageから削除しました:', organiser.imageUrl);
    }
  } catch (error) {
    console.warn('幹事の画像削除に失敗しました:', error);
    // エラーが発生しても削除処理は続行
  }

  // プレビューURLをクリーンアップ
  const previewUrl = previewUrls.value.get(index);
  if (previewUrl) {
    URL.revokeObjectURL(previewUrl);
    previewUrls.value.delete(index);
  }

  // インデックスを調整
  const newPreviewUrls = new Map<number, string>();
  previewUrls.value.forEach((url, idx) => {
    if (idx > index) {
      newPreviewUrls.set(idx - 1, url);
    } else if (idx < index) {
      newPreviewUrls.set(idx, url);
    }
  });
  previewUrls.value = newPreviewUrls;

  organisers.value.splice(index, 1);
};

// 古い画像をFirebase Storageから削除する関数
const deleteOldImage = async (imageUrl: string): Promise<void> => {
  try {
    const imageRef = storageRef(storage, imageUrl);
    await deleteObject(imageRef);
    console.log('古い画像を削除しました:', imageUrl);
  } catch (error) {
    console.warn('古い画像の削除に失敗しました:', error);
    throw error; // エラーを再throw
  }
};

// 画像をFirebase Storageにアップロードする関数
const uploadImage = async (
  file: File,
  organiserIndex: number
): Promise<string> => {
  const timestamp = Date.now();
  const fileName = `organiser-images/${invitationId}/${organiserIndex}_${timestamp}_${file.name}`;
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
    const data = docSnap.data() as Invitation;
    form.value = { ...data };

    // 既存の幹事データを読み込み（後方互換性のため）
    if (data.organiserName || data.organiserImageUrl) {
      organisers.value = [
        {
          name: data.organiserName || '',
          imageUrl: data.organiserImageUrl || '',
          imageFile: [],
        },
      ];
    }

    // 複数幹事データがある場合（将来の拡張用）
    if (data.organisers) {
      organisers.value = data.organisers.map((org) => ({
        name: org.name,
        imageUrl: org.imageUrl || '',
        imageFile: [],
      }));
    }
  }

  if (form.value.creatorId !== authStore.user?.uid) {
    alert('編集権限がありません');
    router.push('/');
  }
});

// コンポーネント破棄時のクリーンアップ
onUnmounted(() => {
  previewUrls.value.forEach((url) => {
    URL.revokeObjectURL(url);
  });
  previewUrls.value.clear();
});

const handleSubmit = async () => {
  try {
    isUploading.value = true;

    // 各幹事の画像をアップロード
    const updatedOrganisers = await Promise.all(
      organisers.value.map(async (organiser, index) => {
        let imageUrl = organiser.imageUrl;

        // 新しい画像がアップロードされた場合
        if (organiser.imageFile && organiser.imageFile.length > 0) {
          // 既存の画像がある場合は削除
          if (organiser.imageUrl) {
            await deleteOldImage(organiser.imageUrl);
          }
          // 新しい画像をアップロード
          imageUrl = await uploadImage(organiser.imageFile[0], index);
        }

        return {
          name: organiser.name,
          imageUrl,
        };
      })
    );

    // 後方互換性のため、最初の幹事を個別フィールドにも保存
    const firstOrganiser = updatedOrganisers[0];

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
      organiserName: firstOrganiser?.name || '',
      organiserImageUrl: firstOrganiser?.imageUrl || '',
      organisers: updatedOrganisers,
    });

    // プレビューURLをクリーンアップ
    previewUrls.value.forEach((url) => {
      URL.revokeObjectURL(url);
    });
    previewUrls.value.clear();

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
  // プレビューURLをクリーンアップ
  previewUrls.value.forEach((url) => {
    URL.revokeObjectURL(url);
  });
  previewUrls.value.clear();
  router.push(`/dashboard/invitation/${invitationId}`);
};
</script>

<style scoped>
h2 {
  margin-bottom: 20px;
}

.organiser-item {
  background-color: #fafafa;
}
</style>
