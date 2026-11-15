<script setup lang="ts">
import type { Asset, UnresolvedLink } from 'contentful'
import type { ProductEntry } from '~/@types/contentful'

// ローディングを見せたいので画面に入ってから読み込む
const {
  data: products,
  loading,
  error,
} = useLoadOnVisible<ProductEntry[]>(useTemplateRef('root'), fetchProducts, [])

// Contentful Images API で表示サイズに合わせて縮小・WebP化する
function imageUrl(
  image: Asset<undefined, string> | UnresolvedLink<'Asset'> | undefined,
): string | undefined {
  if (!image || !('fields' in image) || !image.fields.file?.url) {
    return undefined
  }
  return `https:${image.fields.file.url}?w=800&fm=webp`
}
</script>

<template>
  <div ref="root">
    <LoadError v-if="error" />
    <div v-else-if="loading" class="row g-3 mb-3">
      <div class="col-md-4">
        <div class="ratio ratio-16x9 placeholder rounded" />
      </div>
      <div class="col-md-8">
        <h3><span class="placeholder col-4" /></h3>
        <p>
          <span class="placeholder col-9" /><br />
          <span class="placeholder col-7" />
        </p>
      </div>
    </div>
    <div v-for="{ fields, sys } in products" :key="sys.id" class="row g-3 mb-3">
      <div v-if="imageUrl(fields.image)" class="col-md-4">
        <component
          :is="fields.url ? 'a' : 'div'"
          :href="fields.url"
          target="_blank"
          rel="noopener"
          class="d-block ratio ratio-16x9"
        >
          <img
            :src="imageUrl(fields.image)"
            :alt="fields.name"
            class="product-image rounded border"
            loading="lazy"
          />
        </component>
      </div>
      <div :class="imageUrl(fields.image) ? 'col-md-8' : 'col-12'">
        <!-- 画像と横並びのときは上端を揃える -->
        <h3 :class="{ 'mt-md-0': imageUrl(fields.image) }">
          <a
            v-if="fields.url"
            :href="fields.url"
            target="_blank"
            rel="noopener"
          >
            {{ fields.name }}
          </a>
          <template v-else>{{ fields.name }}</template>
        </h3>
        <!-- eslint-disable-next-line vue/no-v-html -->
        <div v-if="fields.description" v-html="mdToHtml(fields.description)" />
        <p
          v-if="resolvedEntries(fields.skills).length"
          class="d-flex flex-wrap gap-2"
        >
          <SkillBadge
            v-for="skill in resolvedEntries(fields.skills)"
            :key="skill.sys.id"
            :skill="skill"
          />
        </p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.product-image {
  object-fit: cover;
}
</style>
