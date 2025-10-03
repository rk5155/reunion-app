<template>
  <v-card-text class="bg-black py-10" data-aos="fade-up">
    <v-img
      src="/images/invitation-2.jpg"
      class="event-image rounded-0"
      contain
    />
    <div class="pt-10">
      <h2 class="text-center text-h6 font-weight-bold mb-4">
        {{ invitation.title }}
      </h2>
      <p class="text-pre-line">{{ invitation.description }}</p>
    </div>
  </v-card-text>
</template>

<script lang="ts" setup>
interface Props {
  invitation: {
    title: string;
    description: string;
  };
}

defineProps<Props>();
</script>

<style scoped>
.event-image {
  width: 100%;
  height: auto;
  border-radius: 10px 10px 0 0;
}

h2 {
  margin-bottom: 20px;
  color: #fff;
}
</style>
