<template>
  <div>
    <section
      class="bc-section d-flex flex-column justify-content-center align-items-center position-relative"
    >
      <a href="#profile" class="button-next btn btn-secondary">
        <i class="bi bi-chevron-double-down" />
      </a>
      <BusinessCard />
    </section>
    <section class="text-section">
      <NavBar />
      <div class="container my-5">
        <h2 id="profile">プロフィール</h2>
        <h2>スキル</h2>
        <h2>連絡先</h2>
      </div>
    </section>
    <footer class="bg-body-secondary" style="height: 10em">
      &copy; Shouki SAKAMOTO.
    </footer>
  </div>
</template>

<style lang="scss" scoped>
h2 {
  padding-top: 3em;
}
.bc-section {
  width: 100dvw;
  height: 100dvh;
}
.button-next {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 12px;
  border-radius: 50%;
  font-size: 48px;
  line-height: 1;
  aspect-ratio: 1;
  display: inline-flex;
  align-items: center;
}
.text-section {
  min-height: 100dvh;
}
</style>
