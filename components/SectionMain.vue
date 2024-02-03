<template>
  <main class="text-section">
    <NavBar />
    <div class="container my-5">
      <h2 id="profile">プロフィール</h2>
      <p>
        <ruby>坂本<rp>（</rp><rt>さかもと</rt><rp>）</rp></ruby>&nbsp;
        <ruby>鐘期<rp>（</rp><rt>しょうき</rt><rp>）</rp></ruby>。
        1984年生まれ、{{ age }}歳。
      </p>
      <h2>スキル</h2>
      <h2>連絡先</h2>
    </div>
  </main>
</template>

<script setup lang="ts">
import moment from 'moment'
import { ref } from 'vue'

const diff = moment().diff(moment('1984-297T00:00:00+09:00'))
const age = ref(moment.duration(diff).years())
</script>

<style lang="scss" scoped>
h2 {
  padding-top: 3em;
}
.text-section {
  min-height: 100dvh;
}
</style>
