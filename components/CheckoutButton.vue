<template>
  <button @click="checkout" :disabled="loading">
    {{ loading ? '処理中...' : 'Checkout' }}
  </button>
</template>

<script setup lang="ts">
const props = defineProps<{ productId: string }>();
const loading = ref(false);

type CheckoutResponse = {
  url: string | null;
  error?: string;
};

const checkout = async () => {
  loading.value = true;

  const res: CheckoutResponse = await $fetch('/api/checkout', {
    method: 'POST',
    body: {
      productId: props.productId,
      origin: window.location.origin,
    },
  });

  if (res.url) {
    window.location.href = res.url;
  } else {
    console.error('Checkout failed:', res.error);
    alert('エラーが発生しました: ' + res.error);
  }

  loading.value = false;
};
</script>
