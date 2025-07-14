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
            <h2 class="text-h4 font-weight-normal text-grey-darken-2">
              メリット
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
                  class="flex-grow-1 text-center pa-4 elevation-0 bg-transparent"
                >
                  <v-img
                    :src="feature.image"
                    :alt="feature.alt"
                    class="rounded-lg mb-4"
                    contain
                    height="200"
                  ></v-img>
                  <v-card-text class="px-2">
                    <h3 class="text-h6 mb-3">
                      <span
                        class="text-deep-purple-lighten-1 font-weight-bold me-1"
                      >
                        {{ feature.number }}.
                      </span>
                      {{ feature.title }}
                    </h3>
                    <p
                      class="text-body-2 text-grey-darken-1"
                      style="line-height: 1.6"
                    >
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

    <!-- VISION Section -->
    <v-container class="py-16">
      <v-row justify="center">
        <v-col cols="12" class="text-center mb-8">
          <h2 class="text-h4 font-weight-normal text-grey-darken-2">VISION</h2>
        </v-col>
        <v-col cols="12" md="10" lg="8" class="text-center">
          <p class="text-body-1 text-grey-darken-1">
            Reunionは、長らく会っていない友人・知人との再会をサポートするサービスです。人生の大切な縁をもう一度つなぎ、思い出を新たに共有できる場を提供します。
          </p>
        </v-col>
      </v-row>
    </v-container>

    <!-- MESSAGE Section -->
    <v-container fluid class="grey-lighten-4 py-0">
      <v-row no-gutters>
        <v-col cols="12" md="6" order="1" order-md="1">
          <v-img src="/images/sec02_01.jpg" height="400" cover></v-img>
        </v-col>
        <v-col
          cols="12"
          md="6"
          order="2"
          order-md="2"
          class="d-flex align-center"
        >
          <div class="pa-8 pa-md-16">
            <h2 class="text-h4 font-weight-normal mb-5 text-grey-darken-2">
              MESSAGE
            </h2>
            <p class="text-body-1 text-grey-darken-1">
              離れていても、気持ちは繋がっています。Reunionは、再会のきっかけをテクノロジーでつくり出すことで、あなたの人間関係を豊かにします。
            </p>
          </div>
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-col
          cols="12"
          md="6"
          order="2"
          order-md="1"
          class="d-flex align-center"
        >
          <div class="pa-8 pa-md-16">
            <h2 class="text-h4 font-weight-normal mb-5 text-grey-darken-2">
              MESSAGE
            </h2>
            <p class="text-body-1 text-grey-darken-1">
              Reunionを使えば、再会イベントの企画から連絡、日程調整、参加管理まで一括して行うことができます。思い出をつなぐ一歩を、今ここから。
            </p>
          </div>
        </v-col>
        <v-col cols="12" md="6" order="1" order-md="2">
          <v-img src="/images/sec02_02.jpg" height="400" cover></v-img>
        </v-col>
      </v-row>
    </v-container>

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
            <h2 class="text-h4 font-weight-normal mb-5 text-white">
              利用者の声
            </h2>
            <p class="text-body-1 text-white">
              高校時代の同窓会を開催し、連絡先が分からなかった友人とも再会。忘れられない一日になりました！（40代・男性）
            </p>
          </v-col>
          <v-col cols="12" md="6">
            <h2 class="text-h4 font-weight-normal mb-5 text-white">再会の力</h2>
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
          <h2 class="text-h4 font-weight-normal text-grey-darken-2">PROFILE</h2>
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
            <h2 class="text-h4 font-weight-normal text-grey-darken-2">
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
// Features data
const features = [
  {
    number: 1,
    image: '/images/feature_01.png',
    alt: '完全無料で使える',
    title: '幹事のやることはWEB招待状を拡散するのみ！',
    description:
      '登録・利用・イベント開催まですべて無料。広告や課金も一切ナシで安心して使えます。',
  },
  {
    number: 2,
    image: '/images/feature_02.png',
    alt: '卒業年やクラス単位の管理',
    title: '卒業年やクラス単位の管理',
    description: 'クラス・部活・ゼミ・学科などでグルーピング。',
  },
  {
    number: 3,
    image: '/images/circleImg03.png',
    alt: '当時の思い出写真投稿',
    title: '当時の思い出写真投稿',
    description:
      '「昔の写真をアップしてね」「担任のエピソード」などの投稿機能。イベント当日にはスライドショー表示も可能。',
  },
];

// Steps data
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
/* Remove the scoped styles as requested */
</style>
