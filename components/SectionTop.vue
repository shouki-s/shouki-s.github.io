<template>
  <section
    class="bc-section d-flex flex-column justify-content-center align-items-center position-relative"
  >
    <div
      class="button-next-wrapper animate__animated animate__fadeIn animate__delay-2s"
    >
      <a href="#profile" class="button-next btn btn-secondary">
        <i class="bi bi-chevron-double-down" />
      </a>
    </div>
    <BusinessCard />
  </section>
</template>

<style lang="scss" scoped>
.bc-section {
  width: 100dvw;
  height: 100dvh;
}
.button-next-wrapper {
  position: absolute;
  left: auto;
  right: auto;
  bottom: 16px;
}
.button-next {
  border-radius: 50%;
  font-size: 48px;
  line-height: 1;
  aspect-ratio: 1;
  display: inline-flex;
  align-items: center;

  animation: fadeIn ease both;
  animation-timeline: scroll();
  animation-range: 0 50dvh;

  @keyframes fadeIn {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
}
</style>
