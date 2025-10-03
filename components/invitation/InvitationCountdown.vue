<template>
  <v-card-text class="py-10 bg-grey-darken-4" data-aos="fade-up">
    <div class="max-width-800">
      <h2 class="text-h5 font-weight-bold mb-4">COUNTDOWN</h2>
      <div class="text-h4 font-weight-bold mb-4">to {{ date }}</div>
      <div
        class="text-h4 font-weight-bold text-danger d-flex justify-space-between"
      >
        <div class="w-25">
          <div>{{ countdown.days }}</div>
          <div class="countdown-label text-cyan-lighten-4 font-weight-bold">
            Days
          </div>
        </div>
        <div class="w-25">
          <div>{{ countdown.hours }}</div>
          <div class="countdown-label text-cyan-lighten-4 font-weight-bold">
            Hours
          </div>
        </div>
        <div class="w-25">
          <div>{{ countdown.minutes }}</div>
          <div class="countdown-label text-cyan-lighten-4 font-weight-bold">
            Minutes
          </div>
        </div>
        <div class="w-25">
          <div>{{ countdown.seconds }}</div>
          <div class="countdown-label text-cyan-lighten-4 font-weight-bold">
            Seconds
          </div>
        </div>
      </div>
    </div>
  </v-card-text>
</template>

<script lang="ts" setup>
interface Countdown {
  days: string | number;
  hours: string | number;
  minutes: string | number;
  seconds: string | number;
}

interface Props {
  date: string;
  countdown: Countdown;
}

defineProps<Props>();
</script>

<style scoped>
.max-width-800 {
  max-width: 800px;
  margin: 0 auto;
}

.countdown-label {
  font-size: 0.8rem;
}

h2 {
  text-align: center;
  color: #fff;
}

.text-h4 {
  text-align: center;
  color: #fff;
}

@media (max-width: 600px) {
  .text-h4 {
    font-size: 1.5rem !important;
  }

  .countdown-label {
    font-size: 0.7rem;
  }
}
</style>
