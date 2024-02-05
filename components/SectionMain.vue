<template>
  <main class="text-section">
    <NavBar />
    <div class="container my-5">
      <h2 id="profile">プロフィール</h2>
      <p>
        <ruby>坂本<rp>（</rp><rt>さかもと</rt><rp>）</rp></ruby>&nbsp;
        <ruby>鐘期<rp>（</rp><rt>しょうき</rt><rp>）</rp></ruby>。
        1984年生まれ、{{ age }}歳。<br />
        フリーランス［システムエンジニア／プログラマー］。
      </p>
      <p class="links d-flex gap-1">
        <a
          class="btn btn-light p-1"
          href="https://www.linkedin.com/in/shoukisakamoto/"
          role="button"
          title="LinkedIn"
          aria-label="LinkedIn"
        >
          <img
            src="assets/images/icons/linkedin.png"
            width="32"
            height="32"
            alt="LinkedIn"
          />
        </a>
        <a
          class="btn btn-light rounded-circle p-1"
          href="https://github.com/shouki-s"
          role="button"
          title="Github"
          aria-label="Github"
        >
          <img
            src="assets/images/icons/github.png"
            width="32"
            height="32"
            alt="GitHub"
          />
        </a>
        <a
          class="btn btn-light rounded-circle p-1"
          href="https://qiita.com/shouki-s"
          role="button"
          title="Qiita"
          aria-label="Qiita"
        >
          <img
            src="assets/images/icons/qiita.png"
            width="32"
            height="32"
            alt="Qiita"
          />
        </a>
      </p>
      <h2>来歴</h2>
      <ul>
        <li>インターネット黎明期にコンピューターオタクとして育つ。</li>
        <li>
          大学は情報科学以外の知識も幅広く学びたかったため哲学を専攻。知識科学や論理学などの派生元としての近現代哲学がメイン。
        </li>
        <li>大学院では情報科学に戻り、ルールベースの人工知能を研究。</li>
        <li>卒業後、メーカー系システムインテグレーターに就職。14年間勤務。</li>
        <li>
          プロジェクトマネージャーよりエンジニアとして多彩な仕事・システム・プログラミング言語に触れたかったため、2023年に独立。
        </li>
        <li>フリーのシステムエンジニア／プログラマーになり今に至る。</li>
      </ul>
      <h2>スキル</h2>
      <ul>
        <li v-for="skill in skills" :key="skill.sys.id">
          {{ skill.fields.name }}
        </li>
      </ul>
      <h2>資格</h2>
      <ul>
        <li>応用情報技術者試験</li>
        <li>データベーススペシャリスト試験</li>
        <li>AWS Developer Associate</li>
        <li>AWS Solution Architect Associate （失効済み）</li>
      </ul>
      <h2>連絡先</h2>
    </div>
  </main>
</template>

<script setup lang="ts">
import * as contentful from 'contentful'
import { type Entry } from 'contentful'
import type { SkillSkeleton } from '~/@types/contentful'
import moment from 'moment'

const runtimeConfig = useRuntimeConfig().public
const contentfulClient = contentful.createClient({
  space: runtimeConfig.contentfulSpaceId,
  environment: runtimeConfig.contentfulEnvironment,
  accessToken: runtimeConfig.contentfulApikey,
})

const diff = moment().diff(moment('1984-297T00:00:00+09:00'))
const age = ref(moment.duration(diff).years())
const skills = ref([] as Entry<SkillSkeleton, undefined, string>[])

onMounted(() => {
  loadSkills()
})

async function loadSkills(): Promise<void> {
  const { items } = await contentfulClient.getEntries<SkillSkeleton>({
    content_type: 'skill',
    order: ['-fields.rate'],
  })
  skills.value = items
}
</script>

<style lang="scss" scoped>
h2 {
  padding-top: 3em;
}
.text-section {
  min-height: 100dvh;
}
</style>
