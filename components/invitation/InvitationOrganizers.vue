<template>
  <v-card-text
    v-if="organizers && organizers.length > 0"
    class="py-10 bg-grey-lighten-5"
    data-aos="fade-up"
  >
    <h2 class="text-h5 font-weight-bold mb-4 text-black">ORGANIZERS</h2>
    <p class="mb-6 text-black">代表幹事</p>

    <div class="organizers-container max-width-800">
      <div
        v-for="(organizer, index) in organizers"
        :key="index"
        class="organizer-card mb-4 pa-4 bg-white rounded elevation-2"
      >
        <div>
          <div class="organizer-image-container mb-3">
            <v-avatar v-if="organizer.imageUrl" size="150" class="elevation-3">
              <v-img :src="organizer.imageUrl" :alt="organizer.name" cover />
            </v-avatar>
            <v-avatar
              v-else
              size="80"
              color="grey-lighten-2"
              class="elevation-3"
            >
              <v-icon size="40" color="grey-darken-1">mdi-account</v-icon>
            </v-avatar>
          </div>

          <div class="organizer-info flex-grow-1 text-center">
            <h3 class="text-h6 font-weight-bold text-black mb-1">
              {{ organizer.name }}
            </h3>
          </div>
        </div>
      </div>
    </div>
  </v-card-text>
</template>

<script lang="ts" setup>
interface Organizer {
  name: string;
  imageUrl?: string;
}

interface Props {
  organizers?: Organizer[];
}

defineProps<Props>();
</script>

<style scoped>
.organizers-container {
  max-width: 800px;
  margin: 0 auto;
}

.organizer-card {
  transition: transform 0.2s;
}

.organizer-card:hover {
  transform: translateY(-2px);
}

.organizer-image-container {
  display: flex;
  justify-content: center;
}

.organizer-info {
  text-align: center;
}
</style>
