<template>
  <footer
    class="text-secondary-emphasis bg-body-secondary d-flex justify-content-center align-items-center"
  >
    &copy; 2024 Shouki SAKAMOTO
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
