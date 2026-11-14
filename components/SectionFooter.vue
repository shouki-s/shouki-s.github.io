<script setup lang="ts">
// 公開した年から今年まで
const FIRST_YEAR = 2024
const thisYear = new Date().getFullYear()
const years =
  thisYear > FIRST_YEAR ? `${FIRST_YEAR}–${thisYear}` : `${FIRST_YEAR}`
</script>

<template>
  <footer
    class="text-secondary-emphasis bg-body-secondary d-flex justify-content-center align-items-center"
  >
    &copy; {{ years }} Shouki SAKAMOTO
  </footer>
</template>

<style lang="scss" scoped>
footer {
  position: relative;
  margin-top: 50dvh;
  height: 8rem;
  font-size: small;
}
footer::before {
  font-size: 4em;
  display: block;
  content: '🐑';
  line-height: 1;
  position: absolute;
  top: 0;
  right: 4px;
  transform: translateY(-100%);
}
</style>
