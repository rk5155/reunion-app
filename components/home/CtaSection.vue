<template>
  <v-container
    fluid
    class="py-16 bg-gradient-to-br from-deep-purple-lighten-4 to-pink-lighten-4"
  >
    <v-row justify="center">
      <v-col cols="12" class="text-center">
        <div class="cta-section">
          <h2 class="text-h3 font-weight-bold mb-4 text-deep-purple-darken-2">
            {{ title }}
          </h2>
          <p class="text-h6 mb-8 text-grey-darken-1">
            {{ description }}
          </p>
          <v-btn
            :to="buttonLink"
            size="x-large"
            class="cta-button font-weight-bold rounded-pill px-12 py-4 elevation-8"
            height="80"
          >
            <v-icon start size="large">{{ buttonIcon }}</v-icon>
            {{ buttonText }}
            <v-icon end size="large">mdi-arrow-right</v-icon>
          </v-btn>
          <div class="mt-6">
            <v-chip
              color="orange-lighten-2"
              size="large"
              class="font-weight-bold pulse-animation"
            >
              <v-icon start>mdi-star</v-icon>
              {{ chipText }}
            </v-chip>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: '今すぐ同窓会を始めませんか？',
  },
  description: {
    type: String,
    default: '無料相談で理想の同窓会をプランニング',
  },
  buttonText: {
    type: String,
    default: 'お問い合わせ・相談はこちら',
  },
  buttonLink: {
    type: String,
    default: '/contact',
  },
  buttonIcon: {
    type: String,
    default: 'mdi-phone',
  },
  chipText: {
    type: String,
    default: '相談無料・見積もり無料',
  },
});
</script>

<style scoped>
.cta-section {
  padding: 40px 20px;
  border-radius: 20px;
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.9) 0%,
    rgba(255, 255, 255, 0.7) 100%
  );
  backdrop-filter: blur(10px);
  box-shadow: 0 20px 40px rgba(103, 58, 183, 0.2);
}

.cta-button {
  background: linear-gradient(135deg, #673ab7, #9c27b0, #e91e63) !important;
  color: white !important;
  font-size: 1.25rem !important;
  letter-spacing: 0.5px !important;
  transition: all 0.3s ease !important;
  animation: ctaFloat 3s ease-in-out infinite;
  position: relative;
  overflow: hidden;
}

.cta-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.3),
    transparent
  );
  transition: left 0.5s;
}

.cta-button:hover::before {
  left: 100%;
}

.cta-button:hover {
  transform: translateY(-5px) scale(1.05);
  box-shadow: 0 15px 35px rgba(103, 58, 183, 0.4);
}

@keyframes ctaFloat {
  0%,
  100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-8px);
  }
}

.pulse-animation {
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(255, 152, 0, 0.7);
  }
  70% {
    transform: scale(1.05);
    box-shadow: 0 0 0 10px rgba(255, 152, 0, 0);
  }
  100% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(255, 152, 0, 0);
  }
}

.bg-gradient-to-br {
  background: linear-gradient(to bottom right, #e1bee7, #f8bbd9);
}

@media (max-width: 599px) {
  .text-h3 {
    font-size: 1.75rem !important;
    line-height: 1.2 !important;
  }
}
</style>
