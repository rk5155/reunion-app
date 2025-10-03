<template>
  <v-card-text
    v-if="attendeesWithMessages.length > 0"
    class="py-10 bg-grey-lighten-3"
    data-aos="fade-up"
  >
    <div class="mx-auto" style="max-width: 800px">
      <h2 class="text-h5 font-weight-bold mb-4 text-black text-center">
        MESSAGES FROM ATTENDEES
      </h2>
      <p class="mb-6 text-black text-center">みんなからのメッセージ（一部）</p>

      <div
        class="overflow-x-auto pb-2"
        style="scrollbar-width: none; -ms-overflow-style: none"
      >
        <div class="d-flex ga-4" style="width: max-content; min-width: 100%">
          <div
            v-for="(attendee, index) in attendeesWithMessages"
            :key="index"
            class="flex-shrink-0"
            style="width: 280px"
          >
            <v-card
              class="pa-4 d-flex align-center justify-center elevation-1"
              style="height: 150px; border-left: 4px solid #000"
              hover
            >
              <div
                class="text-body-2 text-center overflow-y-auto pa-2"
                style="
                  height: 100%;
                  width: 100%;
                  scrollbar-width: thin;
                  scrollbar-color: #ccc transparent;
                "
              >
                <div class="d-flex align-center justify-center h-100">
                  <span class="text-black text-left">
                    {{ attendee.message }}
                  </span>
                </div>
              </div>
            </v-card>
          </div>
        </div>
      </div>
    </div>
  </v-card-text>
</template>

<script lang="ts" setup>
import type { Attendee } from '@/types/invitation';

interface Props {
  attendeesWithMessages: Attendee[];
}

defineProps<Props>();
</script>

<style scoped>
.overflow-x-auto::-webkit-scrollbar {
  display: none;
}

.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: transparent;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background-color: #ccc;
  border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background-color: #999;
}

@media (max-width: 600px) {
  .overflow-x-auto .flex-shrink-0 {
    width: 240px !important;
  }
}
</style>
