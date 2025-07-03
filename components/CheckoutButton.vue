<template>
  <button @click="checkout" :disabled="loading">
    {{ loading ? '処理中...' : 'Checkout' }}
  </button>
</template>

<script setup lang="ts">
import { useCheckout } from '@/composables/useCheckout';

const props = defineProps<{ productId: string }>();
const loading = ref(false);

type CheckoutResponse = {
  url: string | null;
  error?: string;
};

const checkout = async () => {
  loading.value = true;

  const fixedAmount = 100;
  const res = await useCheckout(fixedAmount, '代行手数料');

  if (res.url) {
    window.location.href = res.url;
  } else {
    console.error('Checkout failed:', res.error);
    alert('エラーが発生しました: ' + res.error);
  }

  loading.value = false;
};
</script>
