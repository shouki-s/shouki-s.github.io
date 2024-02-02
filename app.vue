<template>
  <div class="bg-fadeout">
    <section
      class="vw-100 vh-100 d-flex flex-column justify-content-center align-items-center"
    >
      <BusinessCard class="business-card" />
    </section>
    <section class="container min-vh-100">
      <h2>坂本鐘期について</h2>
    </section>
  </div>
</template>

<style lang="scss" scoped>
@import "bootstrap/scss/bootstrap";

.bg-fadeout {
  animation: bgFadeOut ease both;
  // animation-timeline: view();
  // animation-range: exit 0% exit 100%;
  animation-timeline: scroll();
  animation-range: 0 100vh;

  @keyframes bgFadeOut {
    from {
      background-color: $dark;
    }
    to {
      background-color: $light;
    }
  }
}
.business-card {
  transform: scale(calc(400px / 726px));
}
</style>
