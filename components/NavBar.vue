<template>
  <nav
    class="navbar navbar-expand-lg bg-primary sticky-top"
    data-bs-theme="dark"
  >
    <div class="container">
      <a class="navbar-brand" href="#">
        <img
          src="assets/images/avatar.jpeg"
          class="border border-secondary rounded-circle"
          width="30"
          height="30"
        />
        坂本 鐘期
      </a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div id="navbarSupportedContent" class="collapse navbar-collapse">
        <ul
          v-scroll-spy-active="{ selector: 'a.nav-link', class: 'active' }"
          class="navbar-nav me-auto mb-2 mb-lg-0"
        >
          <li class="nav-item">
            <a class="nav-link" aria-current="page" href="#profile">
              プロフィール
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" aria-current="page" href="#career">来歴</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" aria-current="page" href="#work-experience">
              経験
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" aria-current="page" href="#skills">スキル</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" aria-current="page" href="#qualification">
              資格
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" aria-current="page" href="#hobby">趣味</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" aria-current="page" href="#about-site">
              このサイトについて
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<style lang="scss" scoped>
@import '~/assets/stylesheets/variables.scss';

.navbar {
  animation: fadeIn ease both;
  animation-timeline: scroll();
  animation-range: 90dvh 100dvh;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
}
.navbar-brand {
  display: inline-flex;
  vertical-align: baseline;
  gap: 0.4em;
  font-family: serif;
  font-weight: bolder;
}
</style>
