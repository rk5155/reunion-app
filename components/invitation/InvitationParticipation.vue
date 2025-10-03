<template>
  <v-card-text
    v-if="showAttendeeCount"
    class="py-10 bg-grey-lighten-4"
    data-aos="fade-up"
  >
    <h2 class="text-h5 font-weight-bold mb-4 text-black">
      CURRENT PARTICIPATION
    </h2>
    <p class="mb-2">現在の参加状況</p>
    <p class="text-h4 font-weight-bold text-cyan-lighten-2">
      {{ attendeeCount }} 人
    </p>
  </v-card-text>
</template>

<script lang="ts" setup>
interface Props {
  attendeeCount: number;
  showAttendeeCount: boolean;
}

defineProps<Props>();
</script>
