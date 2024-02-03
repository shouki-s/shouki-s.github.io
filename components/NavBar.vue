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
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="#">Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Link</a>
          </li>
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Dropdown
            </a>
            <ul class="dropdown-menu">
              <li><a class="dropdown-item" href="#">Action</a></li>
              <li><a class="dropdown-item" href="#">Another action</a></li>
              <li><hr class="dropdown-divider" /></li>
              <li><a class="dropdown-item" href="#">Something else here</a></li>
            </ul>
          </li>
          <li class="nav-item">
            <a class="nav-link disabled" aria-disabled="true">Disabled</a>
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
  animation-range: 90vh 100vh;

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
