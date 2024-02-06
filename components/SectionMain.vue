<template>
  <div class="text-section">
    <NavBar />
    <main v-scroll-spy class="container my-5">
      <section>
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
      </section>

      <section>
        <h2 id="career">来歴</h2>
        <ul>
          <li>インターネット黎明期にコンピューターオタクとして育つ。</li>
          <li>
            大学は情報科学以外の知識も幅広く学びたかったため哲学を専攻。知識科学や論理学などの派生元としての近現代哲学がメイン。
          </li>
          <li>大学院では情報科学に戻り、ルールベースの人工知能を研究。</li>
          <li>
            卒業後、メーカー系システムインテグレーターに就職。14年間勤務。
          </li>
          <li>
            プロジェクトマネージャーよりエンジニアとして多彩な仕事・システム・プログラミング言語に触れたかったため、2023年に独立。
          </li>
          <li>フリーのシステムエンジニア／プログラマーになり今に至る。</li>
        </ul>
      </section>

      <section>
        <h2 id="work-experience">経験</h2>
        <WorkExperience />
      </section>

      <section>
        <h2 id="skills">スキル</h2>
        <p>
          技術オタクなので新しい言語やFWを触るのは大好きです。<br />
          何でもやりますが、最近はWebアプリケーション開発を中心に活動しています。
        </p>
        <div class="row row-cols-1 row-cols-lg-2">
          <div>
            <h3>プログラミング言語</h3>
            <LazySkillList genre="language" :max-months="maxMonths" />
          </div>
          <div>
            <h3>フレームワーク</h3>
            <LazySkillList genre="framework" :max-months="maxMonths" />
          </div>
          <div>
            <h3>OS/クラウド</h3>
            <LazySkillList genre="os" :max-months="maxMonths" />
          </div>
          <div>
            <h3>開発ツール</h3>
            <LazySkillList genre="tool" :max-months="maxMonths" />
          </div>
          <div>
            <h3>開発プロセス</h3>
            <LazySkillList genre="process" :max-months="maxMonths" />
          </div>
        </div>
      </section>

      <section>
        <h2 id="qualification">資格</h2>
        <ul>
          <li>応用情報技術者試験</li>
          <li>データベーススペシャリスト試験</li>
          <li>AWS Developer Associate</li>
          <li>AWS Solution Architect Associate （失効済み）</li>
        </ul>
      </section>

      <section>
        <h2 id="hobby">趣味</h2>
        <ul>
          <li>ゲーム（特にボードゲームやテーブルトークRPG）</li>
          <li>もの作り、D.I.Y.</li>
          <li>枯山水巡り</li>
          <li>そしてプログラミング</li>
        </ul>
      </section>

      <section>
        <h2 id="about-site">このサイトについて</h2>
        <ul>
          <li>Vue.js(v3) + Nuxt.js(v3)</li>
          <li>Contentful APIでデータを取得したり</li>
          <li>ちょっと楽しくなって、animationとかtransitionとか使ったり</li>
        </ul>
      </section>
    </main>
    <SectionFooter />
  </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'

const age = ref(dayjs().diff(dayjs('1984-10-23T00:00:00+09:00'), 'year'))
const maxMonths = ref(100)

onMounted(async () => {
  maxMonths.value = await getMaxMonthsOfSkillsExp()
})
</script>

<style lang="scss" scoped>
.text-section {
  min-height: 100dvh;
}
</style>
