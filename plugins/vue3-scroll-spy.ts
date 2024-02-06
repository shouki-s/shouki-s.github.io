import { registerScrollSpy } from 'vue3-scroll-spy'

export default defineNuxtPlugin((nuxtApp) => {
  registerScrollSpy(nuxtApp.vueApp)
})
