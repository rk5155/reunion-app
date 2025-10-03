<template>
  <v-card-text class="py-10 text-left max-width-800" data-aos="fade-up">
    <h2 class="text-h5 font-weight-bold mb-4 text-center text-black">
      INFORMATION
    </h2>
    <v-table>
      <tbody>
        <tr>
          <td class="w-25">開催日</td>
          <td>{{ getFormattedDate(invitation.date) }}</td>
        </tr>
        <tr>
          <td class="w-25">受付開始</td>
          <td>{{ invitation.receptionStartTime }}〜</td>
        </tr>
        <tr>
          <td class="w-25">時間</td>
          <td>{{ invitation.startTime }} - {{ invitation.endTime }}</td>
        </tr>
        <tr>
          <td class="w-25">会場名</td>
          <td>{{ invitation.venueName }}</td>
        </tr>
        <tr>
          <td class="w-25">会費</td>
          <td class="py-4">
            {{ invitation.fee }}円<br />
            ※当日受付にてお支払いください。
          </td>
        </tr>

        <tr>
          <td class="w-25">会場地図</td>
          <td class="py-4">
            <div class="map-container">
              <iframe
                :src="invitation.mapEmbedUrl"
                width="100%"
                height="300"
                style="border: 0"
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
                class="rounded"
              ></iframe>
            </div>
          </td>
        </tr>

        <tr>
          <td class="w-25">会場住所</td>
          <td class="py-4">{{ invitation.venueAddress }}</td>
        </tr>
        <tr>
          <td class="w-25">アクセス</td>
          <td class="py-4">{{ invitation.nearestStation }}</td>
        </tr>
        <tr>
          <td class="w-25">会場URL</td>
          <td class="py-4">
            <a
              :href="invitation.venueUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="text-primary font-weight-bold"
            >
              {{ invitation.venueUrl }}
            </a>
          </td>
        </tr>
        <tr>
          <td class="w-25">備考</td>
          <td class="py-4 text-pre-line">{{ invitation.remarks }}</td>
        </tr>
      </tbody>
    </v-table>
  </v-card-text>
</template>

<script setup lang="ts">
import { getFormattedDate } from '@/utils/date';
import type { Invitation } from '@/types/invitation';

defineProps<{
  invitation: Invitation;
}>();
</script>

<style scoped>
.map-container {
  overflow: hidden;
  padding-top: 56.25%; /* 16:9 */
  position: relative;
  height: 0;
}

.map-container iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
