<template>
  <div
    class="confirmation d-flex justify-center align-center fill-height text-center px-6 bg-grey-lighten-4"
  >
    <v-card class="py-12 px-4 elevation-10 w-100">
      <template v-if="isAttendance">
        <v-icon color="cyan-darken-1" size="100" class="mb-6"
          >mdi-check-circle</v-icon
        >
        <h2 class="text-h5 font-weight-bold mb-6">
          出欠のご回答<br />ありがとうございました!
        </h2>
        <p class="text-body-1 mb-6">
          同窓会当日にお会いできるのを<br />楽しみにしております。
        </p>
        <!-- <p class="text-success font-weight-bold text-h6 mb-6">
          メールを送信しましたので<br />ご確認ください。
        </p> -->

        <!-- <v-btn
          color="cyan-darken-1"
          @click="handleBackToDetail"
          class="mt-4 font-weight-bold"
          size="large"
          rounded="xl"
        >
          招待状に戻る
        </v-btn> -->
      </template>
      <template v-else>
        <v-icon color="red-darken-1" size="100" class="mb-6">
          mdi-cancel
        </v-icon>
        <h2 class="text-h5 font-weight-bold mb-6">
          出欠のご回答<br />ありがとうございました。
        </h2>
        <p class="text-body-1 mb-6">
          今回はご参加いただけないとのこと、<br />
          残念ですがまたの機会を楽しみにしております。
        </p>
      </template>
    </v-card>
  </div>
</template>

<script lang="ts" setup>
const isAttendance =
  history.state?.isAttendance === 'true' ||
  history.state?.isAttendance === true;
const email = history.state?.email as string;
const title = history.state?.title as string;

const { sendEmail } = useSendEmail();

const sendConfirmationEmail = async (
  email: string,
  title: string,
  text: string
) => {
  await sendEmail(email, `【受付完了】${title}の受付が完了しました。`, text);
};

onMounted(() => {
  if (isAttendance && email && title) {
    sendConfirmationEmail(
      email,
      title,
      `🎉 ご参加ありがとうございます！\n\n${title}への出席が登録されました ✅\n\n当日お会いできるのを楽しみにしております 😊`
    );
  }
});
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400..900&family=Kiwi+Maru&family=Zen+Antique&display=swap');

.confirmation,
.text-h2,
.text-h3,
.text-h4,
.text-h5,
.text-h6 {
  font-family: 'Cinzel', serif !important;
}
</style>
