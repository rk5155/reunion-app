<script setup lang="ts">
const props = defineProps<{ productId: string }>();
const loading = ref(false);

const checkout = async () => {
  loading.value = true;

  const res = await $fetch('/api/checkout', {
    method: 'POST',
    body: {
      productId: props.productId,
      origin: window.location.origin,
    },
  });

  if ('url' in res) {
    window.location.href = res.url;
  } else {
    console.error('Checkout failed', res);
  }

  loading.value = false;
};
</script>

<template>
  <button @click="checkout" :disabled="loading">
    {{ loading ? '処理中...' : 'Checkout' }}
  </button>
</template>
