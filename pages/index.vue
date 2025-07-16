<template>
  <v-main>
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
              <div
                class="position-relative d-inline-block title-decorated-gradient mb-6 rounded-xl"
              >
                <h1 class="text-h1 font-weight-normal main-title-decorated">
                  REUNION UP
                </h1>
              </div>
              <p class="text-h5 font-weight-normal mb-4 subtitle-decorated">
                あの日の仲間と、もう一度つながる。
              </p>
              <p class="text-h5 font-weight-normal subtitle-decorated">
                同窓会代行サービス
              </p>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <home-cta-section />

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
              v-for="(feature, index) in pageData.features"
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
                  v-for="(problem, index) in pageData.problems"
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

    <v-container fluid class="grey-lighten-4 py-16">
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
          v-for="(plan, index) in pageData.plans"
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
              <div class="py-4 pa-md-16">
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

    <v-container fluid class="py-16 bg-grey-lighten-5">
      <v-row justify="center">
        <v-col cols="12" class="text-center">
          <h2
            class="elegant-heading elegant-heading--gradient text-h3 font-weight-bold mb-8"
          >
            リユニオンアップの同窓会プランは<br />サービスが充実！
          </h2>
          <div class="max-w-4xl mx-auto mb-8">
            <p class="text-h6 mb-4">
              リユニオンアップの同窓会は、集まった同窓生様の会費で<br />
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
              v-for="service in pageData.plannerServices"
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
              v-for="service in pageData.guidanceServices"
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
              v-for="service in pageData.eventDayServices"
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
          v-for="(review, index) in pageData.reviews"
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
              v-for="(step, index) in pageData.steps"
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

    <home-cta-section />

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
  </v-main>
</template>

<script setup>
import { usePageData } from '~/constants/usePageData';
const pageData = usePageData();

useSeoMeta({
  title: 'REUNION UP（リユニオンアップ） | 同窓会代行サービス',
  description:
    '同窓会の企画から当日運営まで全てお任せ！幹事の負担を0にする同窓会代行サービス。全国4,000件以上の提携会場から最適なプランをご提案。ドタキャン保証付きで安心です。',
  keywords:
    '同窓会,代行,サービス,幹事,企画,会場,ドタキャン保証,リユニオンアップ',
  author: 'Reunion Inc.',
  robots: 'index,follow',

  // Open Graph
  ogTitle: 'REUNION UP（リユニオンアップ） | 同窓会代行サービス',
  ogDescription:
    '同窓会の企画から当日運営まで全てお任せ！幹事の負担を0にする同窓会代行サービス。全国4,000件以上の提携会場から最適なプランをご提案。',
  ogImage: '/images/og-image.jpg',
  ogImageAlt: 'REUNION UP 同窓会代行サービス',
  ogType: 'website',
  ogUrl: 'https://reunion-app.com/',
  ogSiteName: 'REUNION UP',
  ogLocale: 'ja_JP',

  // Twitter Card
  twitterCard: 'summary_large_image',
  twitterSite: '@reunion_up',
  twitterCreator: '@reunion_up',
  twitterTitle: 'REUNION UP（リユニオンアップ） | 同窓会代行サービス',
  twitterDescription:
    '同窓会の企画から当日運営まで全てお任せ！幹事の負担を0にする同窓会代行サービス。',
  twitterImage: '/images/twitter-card.jpg',
  twitterImageAlt: 'REUNION UP 同窓会代行サービス',
});

useHead({
  htmlAttrs: {
    lang: 'ja',
  },
  link: [
    {
      rel: 'canonical',
      href: 'https://reunion-app.com/',
    },
    {
      rel: 'alternate',
      hreflang: 'ja',
      href: 'https://reunion-app.com/',
    },
  ],
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'REUNION UP（リユニオンアップ）',
        description: '同窓会代行サービス',
        url: 'https://reunion-app.com/',
        logo: 'https://reunion-app.com/images/logo.png',
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: '+81-3-1234-5678',
          contactType: 'customer service',
          areaServed: 'JP',
          availableLanguage: 'Japanese',
        },
        sameAs: [
          'https://twitter.com/reunion_up',
          'https://www.facebook.com/reunionup',
          'https://www.instagram.com/reunion_up',
        ],
        address: {
          '@type': 'PostalAddress',
          addressCountry: 'JP',
          addressRegion: '東京都',
          addressLocality: '渋谷区',
        },
      }),
    },
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: '同窓会代行サービス',
        description: '同窓会の企画から当日運営まで全てを代行するサービス',
        provider: {
          '@type': 'Organization',
          name: 'REUNION UP（リユニオンアップ）',
        },
        areaServed: 'JP',
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: '同窓会プラン',
          itemListElement: [
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'ホテル・式場プラン',
                description: '雰囲気も料理も大満足のプレミアムプラン',
              },
              priceSpecification: {
                '@type': 'PriceSpecification',
                price: '8000',
                priceCurrency: 'JPY',
                valueAddedTaxIncluded: true,
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'レストランプラン',
                description: 'カジュアルで気軽な同窓会プラン',
              },
              priceSpecification: {
                '@type': 'PriceSpecification',
                price: '7000',
                priceCurrency: 'JPY',
                valueAddedTaxIncluded: true,
              },
            },
          ],
        },
      }),
    },
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'REUNION UP（リユニオンアップ）',
        url: 'https://reunion-app.com/',
        potentialAction: {
          '@type': 'SearchAction',
          target: 'https://reunion-app.com/search?q={search_term_string}',
          'query-input': 'required name=search_term_string',
        },
      }),
    },
  ],
});
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;400;500;700;900&display=swap');

* {
  font-family: 'Noto Sans JP', sans-serif !important;
}

.text-h1,
.text-h2,
.text-h3,
.text-h4,
.text-h5,
.text-h6 {
  font-family: 'Noto Sans JP', sans-serif !important;
}

.main-title {
  font-family: 'Noto Sans JP', sans-serif !important;
  font-weight: 700 !important;
  letter-spacing: 0.1em !important;
}

.main-title-decorated {
  font-family: 'Noto Sans JP', sans-serif !important;
  font-weight: 700 !important;
  letter-spacing: 0.15em !important;
  background: linear-gradient(
    45deg,
    #ff6b6b,
    #feca57,
    #48dbfb,
    #ff9ff3,
    #54a0ff
  );
  background-size: 300% 300%;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 0 30px rgba(255, 255, 255, 0.8);
  animation: titleGradient 3s ease-in-out infinite;
  position: relative;
  padding: 20px 30px;
  border-radius: 20px;
  backdrop-filter: blur(1px);
}

.title-decorated-gradient {
  background-color: white;
}

.subtitle-decorated {
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  animation: subtitleGlow 2s ease-in-out infinite alternate;
}

@keyframes titleGradient {
  0%,
  100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

@keyframes titleFloat {
  0%,
  100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}

@keyframes subtitleGlow {
  0% {
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  }
  100% {
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3), 0 0 20px rgba(255, 255, 255, 0.3);
  }
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

  .main-title-decorated {
    font-size: 2.5rem !important;
    padding: 15px 20px;
  }
}
</style>
