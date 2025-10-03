<template>
  <div class="my-16" data-aos="fade-up">
    <p class="mb-3 text-grey-darken-3 text-caption">
      Where memories meet, and stories begin.
    </p>
    <h2 class="ttl_center5 text-h3 font-weight-bold text-black mb-3">
      REUNION INVITATIONS
    </h2>
    <p class="text-grey-darken-3 text-caption">
      Together again, to cherish the moments we share.
    </p>
  </div>
</template>

<script setup lang="ts">
// No props needed for this static content
</script>

<style scoped>
.ttl_center5 {
  font-weight: bold;
  width: fit-content;
  margin: auto;
  padding: 0.5em 1em;
  text-align: center;
  position: relative;
}

.ttl_center5::before,
.ttl_center5::after {
  content: '';
  background-color: black;
  width: 50%;
  height: 2px;
  position: absolute;
}

.ttl_center5::before {
  top: 0;
  left: 0;
}

.ttl_center5::after {
  bottom: 0;
  right: 0;
}
</style>
