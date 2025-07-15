<template>
  <!-- Main Content -->
  <v-main class="bg-grey-lighten-4">
    <v-container class="py-16">
      <v-row justify="center">
        <v-col cols="12" md="8" lg="6">
          <!-- ページタイトル -->
          <div class="text-center mb-8">
            <h1
              class="elegant-heading elegant-heading--gradient text-h3 font-weight-bold mb-4"
            >
              お問い合わせ
            </h1>
            <p class="text-body-1 text-grey-darken-1">
              ご質問やご相談がございましたら、お気軽にお問い合わせください。<br />
              担当者より3営業日以内にご連絡いたします。
            </p>
          </div>

          <!-- お問い合わせフォーム -->
          <v-card class="elevation-4 rounded-xl pa-8">
            <v-form ref="contactForm" @submit.prevent="handleContactSubmit">
              <v-text-field
                v-model="contactFormData.name"
                label="お名前 (必須)"
                variant="outlined"
                required
                :rules="[(v) => !!v || 'お名前は必須です']"
                class="mb-4"
              />

              <v-text-field
                v-model="contactFormData.email"
                label="メールアドレス (必須)"
                type="email"
                variant="outlined"
                required
                :rules="[emailValidation]"
                class="mb-4"
              />

              <v-text-field
                v-model="contactFormData.phone"
                label="電話番号 (任意)"
                variant="outlined"
                class="mb-4"
              />

              <v-select
                v-model="contactFormData.subject"
                :items="contactSubjects"
                label="お問い合わせ内容 (必須)"
                variant="outlined"
                required
                :rules="[(v) => !!v || 'お問い合わせ内容を選択してください']"
                class="mb-4"
              />

              <v-textarea
                v-model="contactFormData.message"
                label="メッセージ (必須)"
                variant="outlined"
                required
                rows="5"
                :rules="[(v) => !!v || 'メッセージは必須です']"
                class="mb-6"
              />

              <div class="text-center">
                <v-btn
                  type="submit"
                  color="deep-purple-lighten-3"
                  size="large"
                  class="font-weight-bold rounded-pill px-8"
                  :loading="isContactFormLoading"
                >
                  送信する
                </v-btn>
              </div>
            </v-form>
          </v-card>

          <!-- 連絡先情報 -->
          <v-card class="elevation-2 rounded-xl pa-6 mt-8">
            <v-card-title class="text-center mb-4">
              <h3 class="text-h5 font-weight-bold text-deep-purple-darken-1">
                その他のお問い合わせ方法
              </h3>
            </v-card-title>
            <v-card-text>
              <div class="text-center">
                <div class="mb-4">
                  <v-icon
                    icon="mdi-email"
                    color="deep-purple-darken-1"
                    class="me-2"
                  />
                  <span class="text-body-1">info@reunion-up.com</span>
                </div>
                <div class="mb-4">
                  <v-icon
                    icon="mdi-clock"
                    color="deep-purple-darken-1"
                    class="me-2"
                  />
                  <span class="text-body-1">営業時間: 平日 9:00 - 18:00</span>
                </div>
                <p class="text-body-2 text-grey-darken-1 mt-4">
                  ※土日祝日は休業日となります。お急ぎの場合はメールにてお問い合わせください。
                </p>
              </div>
            </v-card-text>
          </v-card>

          <!-- トップに戻るボタン -->
          <div class="text-center mt-8">
            <v-btn
              to="/"
              variant="outlined"
              color="deep-purple-darken-1"
              class="font-weight-bold"
            >
              トップページに戻る
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script setup>
// SEO設定
useHead({
  title: 'お問い合わせ - REUNION UP（リユニオンアップ）',
  meta: [
    {
      name: 'description',
      content:
        'REUNION UP（リユニオンアップ）へのお問い合わせページです。同窓会代行サービスに関するご質問やご相談はお気軽にお問い合わせください。',
    },
  ],
});

// フォーム関連
const contactForm = ref(null);
const isContactFormLoading = ref(false);

const contactFormData = ref({
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
});

const contactSubjects = [
  '同窓会プランについて',
  '料金について',
  '会場について',
  'サービス内容について',
  '見積もり依頼',
  'その他のお問い合わせ',
];

// バリデーション関数
const emailValidation = (value) => {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(value) || '正しいメールアドレスを入力してください';
};

// お問い合わせフォーム送信処理
const handleContactSubmit = async () => {
  const { valid } = await contactForm.value.validate();

  if (!valid) {
    return;
  }

  try {
    isContactFormLoading.value = true;

    // メール送信処理
    const emailText = `
お問い合わせをありがとうございます。

【お問い合わせ内容】
お名前: ${contactFormData.value.name}
メールアドレス: ${contactFormData.value.email}
電話番号: ${contactFormData.value.phone || '未入力'}
件名: ${contactFormData.value.subject}

【メッセージ】
${contactFormData.value.message}

---
REUNION UP(リユニオン アップ)
同窓会代行サービス
    `;

    await $fetch('/api/send-email', {
      method: 'POST',
      body: {
        to: 'info@reunion-up.com',
        subject: `【お問い合わせ】${contactFormData.value.subject}`,
        text: emailText,
      },
    });

    // 確認メールを送信者にも送信
    const confirmationText = `
${contactFormData.value.name} 様

この度は、REUNION UP(リユニオン アップ)にお問い合わせいただき、誠にありがとうございます。

以下の内容でお問い合わせを受け付けました。
担当者より3営業日以内にご連絡いたします。

【お問い合わせ内容】
件名: ${contactFormData.value.subject}

【メッセージ】
${contactFormData.value.message}

---
REUNION UP(リユニオン アップ)
同窓会代行サービス
メール: blank.zone.free+reunion-app@gmail.com
営業時間: 平日 9:00 - 18:00
    `;

    await $fetch('/api/send-email', {
      method: 'POST',
      body: {
        to: contactFormData.value.email,
        subject: '【受付完了】お問い合わせありがとうございます - REUNION UP',
        text: confirmationText,
      },
    });

    alert(
      'お問い合わせを送信しました。確認メールをお送りしましたのでご確認ください。'
    );

    // フォームをリセット
    contactFormData.value = {
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
    };

    contactForm.value.reset();
  } catch (error) {
    console.error('お問い合わせ送信エラー:', error);
    alert('送信に失敗しました。しばらく時間をおいて再度お試しください。');
  } finally {
    isContactFormLoading.value = false;
  }
};
</script>
