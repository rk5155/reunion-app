<template>
  <div class="sagi-explanation pa-4">
    <v-card class="mx-auto" max-width="800">
      <v-card-title
        class="text-h5 font-weight-bold text-center bg-primary text-white"
        style="white-space: normal; word-break: break-word; padding: 24px"
      >
        同窓会開催に関する詐欺疑惑炎上について
      </v-card-title>

      <v-card-text class="pa-6">
        <div class="mb-6">
          <h2 class="text-h6 font-weight-bold mb-3 text-red">■ 結論</h2>
          <p class="mb-3 font-weight-bold">詐欺ではありません</p>
          <p class="mb-2">
            会場はすでに外部の代行業者を通じて正式に予約済み（問い合わせも可能）。
          </p>
          <p class="mb-2">
            イベントの受付・司会・写真撮影などもすべて外注済みで、運営準備が進行中。
          </p>
          <p class="mb-2">
            予約状況、費用は会場に問い合わせれば分かるはずです。
          </p>
          <p class="font-weight-bold text-primary">TEL: 05054868115</p>
        </div>

        <v-divider class="my-6"></v-divider>

        <div class="mb-6">
          <h2 class="text-h6 font-weight-bold mb-3 text-black">
            ■ 980円の手数料について
          </h2>
          <p class="mb-3">
            これは、当日キャンセルによる赤字リスクをカバーするための手数料です。
          </p>

          <div class="bg-grey-lighten-5 pa-3 rounded mb-3">
            <p class="mb-2">例えば参加者100人だと、手数料は合計で 98,000円。</p>
            <p class="mb-2">
              そこからクレジット決済サービス（Stripe）の手数料（約4%）が引かれ、実質の残額は約94,000円。
            </p>
            <p class="mb-2">
              そこから当日キャンセルが9人出れば、会場費や委託費が足りず赤字になります。
            </p>
            <p>当然開催が中止となれば、会場にもキャンセル料が発生</p>
          </div>

          <p class="mb-2">さらに今回は、</p>
          <ul class="pl-4 mb-3">
            <li>当日の司会</li>
            <li>受付スタッフ</li>
            <li>音響機材オペレート</li>
            <li>現地での運営スタッフ</li>
          </ul>
          <p class="mb-3">
            などすべて外部委託しており、これらにもキャンセル費用が発生します。
          </p>

          <p class="mb-3">
            これらのリスクを、幹事や主催者が1人で背負わずに済むよう、あらかじめ参加者全員で分担するという考え方で、この手数料を設定しました。
          </p>

          <p class="mb-3">
            会費に含める場合もあるが、今回はドタキャン等による損失回避のため、会費とは別で"事前支払い"として明確に分けて設定しています。
          </p>

          <p class="text-red-darken-2 font-weight-bold">
            今回の手数料980円は、あくまでイベントを安全・確実に開催するための実費に充てられるもので、利益を出すことを目的としていません。支出多くあり、これらをまかなっても手元に大きな余剰が残るわけではない。
          </p>
        </div>

        <v-divider class="my-6"></v-divider>

        <div class="mb-6">
          <h2 class="text-h6 font-weight-bold mb-3 text-black">
            ■ 会費について
          </h2>
          <p class="mb-2">以下がすべて含まれています：</p>
          <ul class="pl-4">
            <li>受付スタッフ</li>
            <li>当日の司会</li>
            <li>音響機材オペレート</li>
            <li>現地での運営スタッフ</li>
            <li>飲食</li>
          </ul>
        </div>

        <v-divider class="my-6"></v-divider>

        <div class="mb-6">
          <h2 class="text-h6 font-weight-bold mb-3 text-black">
            ■ 今回の炎上について
          </h2>
          <p class="mb-3">
            たしかに無名のWEBアプリから、企画者の記載もないのにいきなり手数料ってなったら怪しいなと思いました。
          </p>
          <p class="font-weight-bold">すみません。</p>
        </div>

        <v-divider class="my-6"></v-divider>

        <div class="mb-6">
          <h2 class="text-h6 font-weight-bold mb-3 text-black">
            ■今後の対応方針
          </h2>
          <ul class="pl-4">
            <li>開催の中止</li>
            <li>前払いなしでの開催</li>
            <li>手数料返金</li>
          </ul>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<style scoped>
.sagi-explanation {
  background-color: #f5f5f5;
  min-height: 100vh;
}
</style>