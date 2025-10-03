<template>
  <v-card-text class="py-5 bg-grey-lighten-2">
    <div class="max-width-800">
      <v-alert type="info" icon="mdi-clock-outline" class="mb-2">
        <div class="text-body-2 font-weight-bold text-left">
          1ヶ月前で予定が読めない方、および予定調整中の方を考慮し、期限を延長しました！<br />
          出欠締切日：{{ formattedDeadline }}
        </div>
      </v-alert>
      <v-alert type="info" icon="mdi-baby-face-outline" class="mb-2">
        <div class="text-body-2 font-weight-bold text-left">
          子連れOK！小学生以下参加費飲食無料！<br />
        </div>
      </v-alert>
    </div>
  </v-card-text>
</template>

<script lang="ts" setup>
import { getFormattedDate } from '@/utils/date';

interface Props {
  deadline: string;
}

const props = defineProps<Props>();

const formattedDeadline = computed(() => {
  return getFormattedDate(props.deadline);
});
</script>
