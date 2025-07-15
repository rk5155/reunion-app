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
              <h1 class="text-h1 font-weight-normal mb-5 main-title">
                REUNION UP
              </h1>
              <p class="text-h5 font-weight-normal mb-4">
                あの日の仲間と、もう一度つながる。
              </p>
              <p class="text-h5 font-weight-normal">同窓会代行サービス</p>
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
                  class="py-3 problem-list-item"
                >
                  <template v-slot:prepend>
                    <v-icon
                      color="pink-accent-3"
                      :icon="problem.icon"
                      size="x-large"
                      class="me-4"
                    ></v-icon>
                  </template>
                  <v-list-item-title
                    class="text-h5 text-grey-darken-1 problem-title"
                  >
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

    <v-container fluid class="grey-lighten-4 pt-16">
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
    </v-container>

    <v-container fluid class="py-16 bg-white">
      <v-row justify="center">
        <v-col cols="12" class="text-center mb-12">
          <h2
            class="elegant-heading elegant-heading--gradient text-h3 font-weight-bold mb-8"
          >
            リユニオンアップの同窓会プランは<br />サービスが充実！
          </h2>
          <div class="max-w-4xl mx-auto mb-8">
            <p class="text-h6 mb-4">
              リユニオンアップの同窓会は、当日集まった同窓生様の会費のみで<br />
              下記のサービスをご提供しております。
            </p>
            <p class="text-body-1 text-grey-darken-1 mb-4">
              案内状の送付から当日のサポート、精算業務まで行いますので、<br />
              幹事様もこころゆくまで同窓会を楽しむことができます！
            </p>
            <p class="text-h6 font-weight-bold text-deep-purple-darken-1">
              以下のサービス全てがプラン内に含まれます！
            </p>
          </div>
        </v-col>
      </v-row>

      <!-- サービス項目 -->
      <v-row justify="center">
        <v-col cols="12" md="10" lg="12">
          <!-- プランナー -->
          <v-row class="mb-8">
            <v-col cols="12" class="text-center mb-4">
              <h3 class="text-h5 font-weight-bold text-deep-purple-darken-1">
                プランナー
              </h3>
            </v-col>
            <v-col
              v-for="service in plannerServices"
              :key="service.title"
              cols="6"
              sm="6"
              md="3"
              class="d-flex"
            >
              <v-card
                class="flex-grow-1 text-center pa-4 elevation-1 rounded-lg bg-deep-purple-lighten-5"
                height="120"
              >
                <v-icon
                  :icon="service.icon"
                  size="40"
                  color="deep-purple-darken-1"
                  class="mb-2"
                ></v-icon>
                <p class="text-body-2 font-weight-medium text-grey-darken-2">
                  {{ service.title }}
                </p>
              </v-card>
            </v-col>
          </v-row>

          <!-- 案内 -->
          <v-row class="mb-8">
            <v-col cols="12" class="text-center mb-4">
              <h3 class="text-h5 font-weight-bold text-deep-purple-darken-1">
                案内
              </h3>
            </v-col>
            <v-col
              v-for="service in guidanceServices"
              :key="service.title"
              cols="6"
              sm="6"
              md="3"
              class="d-flex"
            >
              <v-card
                class="flex-grow-1 text-center pa-4 elevation-1 rounded-lg bg-light-blue-lighten-5"
                height="120"
              >
                <v-icon
                  :icon="service.icon"
                  size="40"
                  color="light-blue-darken-1"
                  class="mb-2"
                ></v-icon>
                <p class="text-body-2 font-weight-medium text-grey-darken-2">
                  {{ service.title }}
                </p>
              </v-card>
            </v-col>
          </v-row>

          <!-- 当日 -->
          <v-row class="mb-8">
            <v-col cols="12" class="text-center mb-4">
              <h3 class="text-h5 font-weight-bold text-deep-purple-darken-1">
                当日
              </h3>
            </v-col>
            <v-col
              v-for="service in eventDayServices"
              :key="service.title"
              cols="6"
              sm="6"
              md="3"
              class="d-flex"
            >
              <v-card
                class="flex-grow-1 text-center pa-4 elevation-1 rounded-lg bg-pink-lighten-5"
                height="120"
              >
                <v-icon
                  :icon="service.icon"
                  size="40"
                  color="pink-darken-1"
                  class="mb-2"
                ></v-icon>
                <p class="text-body-2 font-weight-medium text-grey-darken-2">
                  {{ service.title }}
                </p>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>

    <!-- 利用者の声セクション -->
    <v-container fluid class="py-16 bg-light-blue-lighten-5">
      <v-row justify="center">
        <v-col cols="12" class="text-center mb-12">
          <h2
            class="elegant-heading elegant-heading--gradient text-h3 font-weight-bold mb-8"
          >
            利用者の声
          </h2>
          <p class="text-h6">
            実際にリユニオンアップをご利用いただいた皆様の声をご紹介します
          </p>
        </v-col>
      </v-row>
      <v-row>
        <v-col
          v-for="(review, index) in reviews"
          :key="index"
          cols="12"
          md="4"
          class="d-flex"
        >
          <v-card
            class="flex-grow-1 pa-6 elevation-2 rounded-xl d-flex flex-column"
            style="border-top: 4px solid #673ab7; height: 400px"
          >
            <v-card-text class="pa-0 d-flex flex-column flex-grow-1">
              <div class="d-flex align-center mb-4">
                <v-avatar :color="review.avatarColor" size="48" class="me-3">
                  <span class="text-white font-weight-bold">
                    {{ review.initial }}
                  </span>
                </v-avatar>
                <div>
                  <h4 class="text-h6 font-weight-bold">
                    {{ review.name }}
                  </h4>
                  <p class="text-body-2 text-grey-darken-1 mb-0">
                    {{ review.role }}
                  </p>
                </div>
              </div>

              <div class="mb-3">
                <v-rating
                  :model-value="review.rating"
                  color="amber"
                  density="compact"
                  readonly
                  size="small"
                ></v-rating>
              </div>

              <blockquote
                class="text-body-1 text-grey-darken-2 font-italic flex-grow-1"
              >
                "{{ review.comment }}"
              </blockquote>

              <v-chip
                :color="
                  review.eventType === 'ホテル・式場プラン'
                    ? 'deep-purple-lighten-3'
                    : 'light-blue-lighten-3'
                "
                size="small"
                class="mt-3 align-self-start"
              >
                {{ review.eventType }}
              </v-chip>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <v-container fluid class="grey-lighten-4 py-16">
      <v-row justify="center">
        <v-col cols="12" class="text-center mb-8">
          <h2
            class="elegant-heading elegant-heading--gradient text-h3 font-weight-bold mb-8"
          >
            ご利用の流れ
          </h2>
          <p class="text-h6 mb-4 text-grey-darken-1">
            同窓会プランナーが全てプランニングしてくれるので安心です。<br />
            困ったことがあればいつでもご相談ください。
          </p>
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
                  STEP {{ step.number }}
                </div>
              </template>
              <v-card class="elevation-2 rounded-lg">
                <v-card-text class="pa-6">
                  <h3 class="text-h6 font-weight-medium mb-3 font-weight-bold">
                    {{ step.title }}
                  </h3>
                  <p class="text-body-2 text-grey-darken-1 mb-2">
                    {{ step.description }}
                  </p>
                  <v-chip
                    color="deep-purple-lighten-3"
                    size="small"
                    class="mt-2"
                  >
                    {{ step.timing }}
                  </v-chip>
                </v-card-text>
              </v-card>
            </v-timeline-item>
          </v-timeline>
        </v-col>
      </v-row>
      <div class="text-center mt-8">
        <p class="text-h5 text-grey-darken-1">
          ※期間は目安です。<br />
          準備期間が短くても、お気軽にご相談ください。
        </p>
      </div>
    </v-container>

    <!-- Footer -->
    <v-footer class="bg-blue-grey-lighten-4 text-center pa-8">
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
    title: '希望日時・プランなどを相談',
    description:
      'ご希望の開催日時や会場のイメージ、参加予定人数などをお聞かせください。専任プランナーがご要望に合わせて最適なプランをご提案いたします。',
    timing: '開催5ヶ月前',
  },
  {
    number: 2,
    title: '会場手配&会費決定',
    description:
      'プランナーが会場の手配を行い、参加費を決定いたします。全国4,000件以上の提携会場から、ご予算と人数に最適な会場をご提案いたします。',
    timing: '開催4ヶ月前',
  },
  {
    number: 3,
    title: 'SNS提供',
    description:
      '同窓会専用のSNSを提供いたします。参加者同士の交流や情報共有にご活用ください。事前に盛り上がりを作ることで当日がより楽しくなります。',
    timing: '開催3ヶ月前',
  },
  {
    number: 4,
    title: '案内状発送',
    description:
      'デザインされた案内状を印刷・発送いたします。名簿管理や不着確認もお任せください。WEB案内状での出欠確認も同時に開始いたします。',
    timing: '開催3ヶ月前',
  },
  {
    number: 5,
    title: 'プランナーと最終確認',
    description:
      '参加人数の確定や当日の流れ、特別な演出などについて最終確認を行います。不安なことがあれば何でもご相談ください。',
    timing: '開催1ヶ月前',
  },
  {
    number: 6,
    title: '同窓会を開催',
    description:
      '当日は運営スタッフが受付から司会進行まで全面サポート。幹事様も安心して同窓会をお楽しみください。写真撮影や精算業務もお任せです。',
    timing: '開催当日',
  },
];

// リユニオンアップのサービス項目
const plannerServices = [
  { title: '企画プランニング', icon: 'mdi-lightbulb-on-outline' },
  { title: '同窓会SNS提供', icon: 'mdi-devices' },
  { title: '参加促進のフォロー', icon: 'mdi-trending-up' },
  { title: '会場リサーチ・交渉', icon: 'mdi-map-search-outline' },
  { title: '会場手配', icon: 'mdi-phone' },
  { title: '打ち合わせ', icon: 'mdi-account-group-outline' },
  { title: '同窓会SNSへの写真アップロード', icon: 'mdi-camera-plus-outline' },
];

const guidanceServices = [
  { title: '案内状デザイン', icon: 'mdi-palette-outline' },
  { title: '案内状印刷・発送', icon: 'mdi-printer-outline' },
  { title: '名簿管理', icon: 'mdi-account-multiple-outline' },
  { title: '名簿データ化', icon: 'mdi-database-outline' },
  { title: '案内状不着確認', icon: 'mdi-email-check-outline' },
];

const eventDayServices = [
  { title: 'ディレクター業務', icon: 'mdi-face-man-outline' },
  { title: '運営スタッフ', icon: 'mdi-account-group' },
  { title: '受付業務', icon: 'mdi-desk' },
  { title: '精算業務', icon: 'mdi-calculator-variant-outline' },
  { title: '名札作成', icon: 'mdi-badge-account-outline' },
  { title: '参加者名簿作成', icon: 'mdi-file-document-outline' },
  { title: '司会進行サポート', icon: 'mdi-microphone-outline' },
  { title: '写真撮影', icon: 'mdi-camera-outline' },
  { title: 'お食事', icon: 'mdi-food-fork-drink' },
  { title: 'フリードリンク', icon: 'mdi-glass-cocktail' },
  { title: '当日キャンセルリスク保証', icon: 'mdi-shield-check-outline' },
];

// 利用者の声データ
const reviews = [
  {
    name: '田中 美香さん',
    role: '高校3年2組 同窓会幹事',
    initial: '田',
    avatarColor: 'deep-purple-lighten-1',
    rating: 5,
    comment:
      '初めての幹事で不安でしたが、リユニオンアップのおかげで大成功でした！出欠管理から会場手配まで全てお任せできて、当日は私も心から楽しめました。みんなから「また来年もやろう！」と言ってもらえて嬉しかったです。',
    eventType: 'ホテル・式場プラン',
  },
  {
    name: '山田 健太さん',
    role: '大学ゼミ 卒業10周年',
    initial: '山',
    avatarColor: 'pink-accent-3',
    rating: 5,
    comment:
      'カジュアルな雰囲気で久しぶりの仲間と楽しい時間を過ごせました。子連れでも参加しやすく、みんなが気軽に来てくれたのが良かったです。料金も手頃で大満足でした！',
    eventType: 'レストランプラン',
  },
  {
    name: '佐藤 麗子さん',
    role: '中学校同窓会 実行委員長',
    initial: '佐',
    avatarColor: 'light-blue-darken-1',
    rating: 5,
    comment:
      '150人規模の同窓会でしたが、ドタキャン保証があったので安心でした。当日7名のキャンセルがありましたが、追加料金は一切なし。会場も素晴らしく、みんなに喜んでもらえました。',
    eventType: 'ホテル・式場プラン',
  },
];
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;400;500;700;900&display=swap');

* {
  font-family: 'Noto Sans JP', sans-serif !important;
}

.main-title {
  font-family: 'Noto Sans JP', sans-serif !important;
  font-weight: 700 !important;
  letter-spacing: 0.1em !important;
}

.elegant-heading--gradient {
  background: linear-gradient(135deg, #673ab7, #d974eb, #fa1d67);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-size: 200% 200%;
  animation: gradientShift 3s ease-in-out infinite;
  font-size: 24px;
  font-family: 'Noto Sans JP', sans-serif !important;
  font-weight: 700 !important;
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

.text-h1,
.text-h2,
.text-h3,
.text-h4,
.text-h5,
.text-h6 {
  font-family: 'Noto Sans JP', sans-serif !important;
  font-weight: 600 !important;
}

.text-h5 {
  font-weight: bold !important;
}

.text-body-1,
.text-body-2 {
  font-family: 'Noto Sans JP', sans-serif !important;
  font-weight: 400 !important;
  line-height: 1.6 !important;
}

.v-btn {
  font-family: 'Noto Sans JP', sans-serif !important;
  font-weight: 600 !important;
}

.v-list-item-title {
  font-family: 'Noto Sans JP', sans-serif !important;
}

.problem-title {
  white-space: normal !important;
  overflow: visible !important;
  text-overflow: unset !important;
  line-height: 1.3 !important;
  font-family: 'Noto Sans JP', sans-serif !important;
}

.problem-list-item {
  min-height: auto !important;
  align-items: flex-start !important;
}

blockquote {
  font-family: 'Noto Sans JP', sans-serif !important;
  font-weight: 400 !important;
  line-height: 1.5 !important;
}

.v-chip {
  font-family: 'Noto Sans JP', sans-serif !important;
  font-weight: 500 !important;
}

.v-card-text p {
  font-family: 'Noto Sans JP', sans-serif !important;
  line-height: 1.6 !important;
}

@media (max-width: 599px) {
  .text-h3 {
    font-size: 1.75rem !important;
    line-height: 1.2 !important;
  }

  .problem-title {
    font-size: 1rem !important;
    line-height: 1.4 !important;
  }

  .main-title {
    font-size: 2.5rem !important;
  }
}
</style>
