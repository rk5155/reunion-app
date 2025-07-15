<template>
  <v-app>
    <!-- Header Section -->
    <v-container fluid class="pa-0">
      <v-row no-gutters>
        <v-col cols="12">
          <v-card
            height="568"
            class="d-flex align-center justify-center position-relative overflow-hidden"
            style="
              background-image: url('/images/main_pc.jpg');
              background-size: cover;
              background-position: center;
            "
          >
            <!-- CSS-based overlay -->
            <div
              class="position-absolute w-100 h-100 bg-black"
              style="opacity: 0.3; top: 0; left: 0; z-index: 1"
            ></div>
            <div
              class="text-center text-white position-relative"
              style="z-index: 2"
            >
              <h1
                class="text-h2 font-weight-normal mb-5"
                style="font-family: 'Pacifico', cursive"
              >
                REUNION UP
              </h1>
              <h2 class="text-h5 font-weight-normal">
                あの日の仲間と、もう一度つながる。
              </h2>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <!-- CTA Button -->
    <v-container class="py-10">
      <v-row justify="center">
        <v-col cols="12" class="text-center">
          <v-btn
            href="#createInvitation"
            color="deep-purple-lighten-3"
            size="large"
            class="font-weight-bold rounded-pill px-8"
          >
            無料で招待状を作ってみる
          </v-btn>
        </v-col>
      </v-row>
    </v-container>

    <!-- FEATURE Section -->
    <v-container fluid class="grey-lighten-4 py-16">
      <v-container>
        <v-row>
          <v-col cols="12" class="text-center mb-8">
            <h2
              class="elegant-heading elegant-heading--gradient text-h3 font-weight-bold"
            >
              他とは違う！リユニオンアップの3大ポイント
            </h2>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col cols="12" md="10" lg="12">
            <v-row>
              <v-col
                v-for="(feature, index) in features"
                :key="index"
                cols="12"
                md="4"
                class="d-flex"
              >
                <v-card
                  class="flex-grow-1 text-center pa-4 elevation-0 bg-light-blue-lighten-5 rounded-xl"
                >
                  <v-img
                    :src="feature.image"
                    :alt="feature.alt"
                    class="rounded-lg mb-4"
                    contain
                    height="200"
                  ></v-img>
                  <v-card-text class="px-2">
                    <h3 class="text-h5 mb-3 text-deep-purple-darken-1">
                      <span class="text-pink-accent-3 font-weight-bold me-1">
                        {{ feature.number }}
                      </span>
                      {{ feature.title }}
                    </h3>
                    <p class="text-body-2 text-grey-darken-1 text-left">
                      {{ feature.description }}
                    </p>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </v-container>

    <v-container fluid class="py-16 bg-light-blue-lighten-5">
      <v-row justify="center">
        <v-col cols="12" class="text-center mb-8">
          <h2
            class="elegant-heading elegant-heading--gradient text-h3 font-weight-bold"
          >
            同窓会幹事さんのこんなお悩み、ありませんか？
          </h2>
        </v-col>
        <v-col cols="12">
          <v-row>
            <v-col cols="12" md="6" class="d-flex align-center">
              <v-img
                src="/images/problem.png"
                alt="同窓会幹事のお悩み"
                class="rounded-lg"
                contain
                height="400"
              ></v-img>
            </v-col>

            <!-- 右側：お悩みリスト -->
            <v-col cols="12" md="6" class="d-flex align-center">
              <v-list class="bg-white px-6 py-8 rounded-xl shadow-lg w-100">
                <v-list-item
                  v-for="(problem, index) in problems"
                  :key="index"
                  class="py-3"
                >
                  <template v-slot:prepend>
                    <v-icon
                      color="pink-accent-3"
                      :icon="problem.icon"
                      size="x-large"
                      class="me-4"
                    ></v-icon>
                  </template>
                  <v-list-item-title class="text-h5 text-grey-darken-1">
                    {{ problem.title }}
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <p class="text-center text-h3 font-weight-bold mt-16">
        当日の会費だけで 全てサポートします！
      </p>
    </v-container>

    <div fluid class="grey-lighten-4 pt-16">
      <v-row>
        <v-col cols="12" class="text-center mb-16">
          <h2
            class="elegant-heading elegant-heading--gradient text-h3 font-weight-bold mb-8"
          >
            あなたの同窓会に合ったプラン、一緒に見つけましょう。
          </h2>
          <p class="text-h6 font-weight-bold">
            選べる会場は全国4,000件以上！
            提携外も対応OK。あなたの理想の会場、きっと見つかります。
          </p>
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-col
          v-for="(plan, index) in plans"
          :key="index"
          cols="12"
          :class="index % 2 === 0 ? 'order-1 order-md-1' : 'order-1 order-md-2'"
        >
          <v-row no-gutters>
            <v-col
              cols="12"
              md="6"
              :class="
                index % 2 === 0 ? 'order-1 order-md-1' : 'order-1 order-md-2'
              "
            >
              <v-img :src="plan.image" height="400" cover></v-img>
            </v-col>
            <v-col
              cols="12"
              md="6"
              :class="
                index % 2 === 0 ? 'order-2 order-md-2' : 'order-2 order-md-1'
              "
              class="d-flex align-center"
            >
              <div class="pa-8 pa-md-16">
                <h2 class="elegant-heading elegant-heading--gradient mb-4">
                  {{ plan.title }}
                </h2>
                <p class="text-body-1 text-grey-darken-1">
                  {{ plan.description }}
                </p>
              </div>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </div>

    <!-- STORY Section -->
    <v-container
      fluid
      class="py-16 position-relative"
      style="
        background: url(/images/bgSec04.jpg) no-repeat center center fixed;
        background-size: cover;
      "
    >
      <!-- CSS-based overlay -->
      <div
        class="position-absolute w-100 h-100 bg-black"
        style="opacity: 0.6; top: 0; left: 0; z-index: 1"
      ></div>
      <v-container class="position-relative" style="z-index: 2">
        <v-row>
          <v-col cols="12" md="6" class="mb-8 mb-md-0">
            <h2 class="elegant-heading elegant-heading--gradient">
              利用者の声
            </h2>
            <p class="text-body-1 text-white">
              高校時代の同窓会を開催し、連絡先が分からなかった友人とも再会。忘れられない一日になりました！（40代・男性）
            </p>
          </v-col>
          <v-col cols="12" md="6">
            <h2 class="elegant-heading elegant-heading--gradient">再会の力</h2>
            <p class="text-body-1 text-white">
              再会を通じて新しいビジネスが始まったり、失われていた絆が戻ったり。Reunionはそのきっかけを提供します。
            </p>
          </v-col>
        </v-row>
      </v-container>
    </v-container>

    <!-- PROFILE Section -->
    <v-container class="py-16">
      <v-row justify="center">
        <v-col cols="12" class="text-center mb-8">
          <h2 class="elegant-heading elegant-heading--gradient">PROFILE</h2>
        </v-col>
        <v-col cols="12" lg="10">
          <v-row>
            <v-col cols="12" md="6" class="mb-8 mb-md-0">
              <v-list class="bg-transparent">
                <v-list-item class="px-0 py-2">
                  <template v-slot:prepend>
                    <span
                      class="text-body-1 font-weight-medium text-right me-6"
                      style="min-width: 120px"
                      >社名</span
                    >
                  </template>
                  <v-list-item-title class="text-body-1"
                    >Reunion株式会社</v-list-item-title
                  >
                </v-list-item>
                <v-list-item class="px-0 py-2">
                  <template v-slot:prepend>
                    <span
                      class="text-body-1 font-weight-medium text-right me-6"
                      style="min-width: 120px"
                      >代表取締役</span
                    >
                  </template>
                  <v-list-item-title class="text-body-1"
                    >川田 太郎</v-list-item-title
                  >
                </v-list-item>
                <v-list-item class="px-0 py-2">
                  <template v-slot:prepend>
                    <span
                      class="text-body-1 font-weight-medium text-right me-6"
                      style="min-width: 120px"
                      >所在地</span
                    >
                  </template>
                  <v-list-item-title class="text-body-1"
                    >東京都渋谷区〇〇1-2-3</v-list-item-title
                  >
                </v-list-item>
                <v-list-item class="px-0 py-2">
                  <template v-slot:prepend>
                    <span
                      class="text-body-1 font-weight-medium text-right me-6"
                      style="min-width: 120px"
                      >連絡先</span
                    >
                  </template>
                  <v-list-item-title class="text-body-1"
                    >info@reunion-app.com</v-list-item-title
                  >
                </v-list-item>
                <v-list-item class="px-0 py-2">
                  <template v-slot:prepend>
                    <span
                      class="text-body-1 font-weight-medium text-right me-6"
                      style="min-width: 120px"
                      >設立</span
                    >
                  </template>
                  <v-list-item-title class="text-body-1"
                    >2025年4月1日</v-list-item-title
                  >
                </v-list-item>
                <v-list-item class="px-0 py-2">
                  <template v-slot:prepend>
                    <span
                      class="text-body-1 font-weight-medium text-right me-6"
                      style="min-width: 120px"
                      >事業内容</span
                    >
                  </template>
                  <v-list-item-title class="text-body-1"
                    >再会支援サービスの提供</v-list-item-title
                  >
                </v-list-item>
              </v-list>
            </v-col>
            <v-col cols="12" md="6">
              <v-card class="rounded-lg overflow-hidden" height="300">
                <iframe
                  src="https://www.google.com/maps/embed?..."
                  width="100%"
                  height="100%"
                  style="border: 0"
                  allowfullscreen
                  loading="lazy"
                  referrerpolicy="no-referrer-when-downgrade"
                ></iframe>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>

    <!-- 利用の流れ Section -->
    <v-container fluid class="grey-lighten-4 py-16">
      <v-container>
        <v-row justify="center">
          <v-col cols="12" class="text-center mb-8">
            <h2 class="elegant-heading elegant-heading--gradient">
              利用の流れ
            </h2>
          </v-col>
          <v-col cols="12" md="10" lg="8">
            <v-timeline side="end" truncate-line="both">
              <v-timeline-item
                v-for="(step, index) in steps"
                :key="index"
                :dot-color="'deep-purple-lighten-1'"
                size="small"
              >
                <template v-slot:opposite>
                  <div
                    class="text-h6 font-weight-bold text-deep-purple-lighten-1"
                  >
                    {{ step.number }}
                  </div>
                </template>
                <v-card class="elevation-2 rounded-lg">
                  <v-card-text class="pa-6">
                    <h3 class="text-h6 font-weight-medium mb-3">
                      <span
                        class="text-deep-purple-lighten-1 font-weight-bold me-1"
                      >
                        {{ step.number }}.
                      </span>
                      {{ step.title }}
                    </h3>
                    <p class="text-body-2 text-grey-darken-1 mb-0">
                      {{ step.description }}
                    </p>
                  </v-card-text>
                </v-card>
              </v-timeline-item>
            </v-timeline>
          </v-col>
        </v-row>
      </v-container>
    </v-container>

    <!-- Footer -->
    <v-footer class="bg-white text-center pa-8">
      <v-container>
        <div class="text-body-2 text-grey-darken-1 mb-2">
          Copyright(c) 2025 Reunion Inc. All Rights Reserved.
        </div>
        <div>
          <nuxt-link
            to="/trade"
            class="text-grey-darken-1 text-decoration-none"
          >
            特定商取引法に基づく表記
          </nuxt-link>
        </div>
      </v-container>
    </v-footer>
  </v-app>
</template>

<script setup>
const features = [
  {
    number: 1,
    image: '/images/26679704.png',
    alt: '完全無料で使える',
    title: '幹事のやることはWEB招待状を拡散するのみ！',
    description:
      '面倒な準備はすべてリユニオンアップにお任せ！幹事はWEB招待状を拡散するだけ。LINEやSNSで気軽にシェアできます！',
  },
  {
    number: 2,
    image: '/images/mark_heart_anshin_anzen.png',
    alt: '卒業年やクラス単位の管理',
    title: 'ドタキャンリスク保証！',
    description: '当日のドタキャンが何人いても幹事さんの自己負担は0円です！',
  },
  {
    number: 3,
    image: '/images/image.png',
    alt: '準備の手間なし！',
    title: '準備の手間なし！',
    description:
      '会場手配から出欠管理、参加費の回収までリユニオンアップが代行。幹事も安心して参加できます！',
  },
];

const problems = [
  {
    icon: 'mdi-calendar-alert',
    title: '会場探しや人数調整が大変...',
  },
  {
    icon: 'mdi-phone-alert',
    title: '出欠確認の連絡が面倒...',
  },
  {
    icon: 'mdi-currency-jpy',
    title: '集金でトラブルにならないか不安...',
  },
  {
    icon: 'mdi-clock-alert',
    title: '当日バタバタして楽しめない...',
  },
  {
    icon: 'mdi-account-question',
    title: 'そもそも誰に声をかけたらいいかわからない...',
  },
];

// プラン情報
const plans = [
  {
    title: 'ホテル・式場プラン',
    description:
      '雰囲気も料理も大満足！リユニオンアップおすすめの人気プラン。全国のホテルや式場と提携しているので、料理のクオリティはもちろん、ドリンクも豊富にご用意。「せっかくの同窓会だから、雰囲気にもこだわりたい！」という方に選ばれています。ステージやプロジェクター付きの会場も多数ご紹介可能。盛り上がること間違いなしです！',
    image: '/images/masood-aslami-7w-cRdewpJA-unsplash.jpg',
    price: '8,000円〜',
  },
  {
    title: 'レストランプラン - Casual',
    description:
      '若い世代に好評！おしゃれカジュアルな同窓会プラン。気取らず楽しめる雰囲気で、子連れ参加もOK。少人数〜大人数まで幅広く対応できる柔軟なプランです。',
    image: '/images/glenov-brankovic-e4B5AvA7Jqo-unsplash.jpg',
    price: '7,000円〜',
  },
];

const steps = [
  {
    number: 1,
    title: 'アカウント登録',
    description:
      'Reunionに登録して、再会イベントを企画する準備を始めましょう。',
  },
  {
    number: 2,
    title: 'イベント作成',
    description:
      'イベントの詳細を入力し、参加者を招待します。日時や場所を簡単に設定可能です。',
  },
  {
    number: 3,
    title: '招待リンク送信',
    description:
      '招待リンクを参加者に送信し、出欠確認を行います。参加者はリンクから簡単に登録できます。',
  },
  {
    number: 4,
    title: '決済と準備',
    description:
      'Stripeを利用して参加費を集金。イベント当日の準備を進めましょう。',
  },
  {
    number: 5,
    title: 'イベント開催',
    description:
      'Reunionを活用して、参加者との再会を楽しみましょう。写真やコメントを共有して思い出を振り返ることもできます。',
  },
];
</script>

<style scoped>
.elegant-heading--gradient {
  background: linear-gradient(135deg, #673ab7, #d974eb, #fa1d67);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-size: 200% 200%;
  animation: gradientShift 3s ease-in-out infinite;
  font-size: 24px;
}

@keyframes gradientShift {
  0%,
  100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

.text-h5 {
  font-weight: bold !important;
}

@media (max-width: 599px) {
  .text-h3 {
    font-size: 1.75rem !important;
    line-height: 1.2 !important;
  }
}
</style>
