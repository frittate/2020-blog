<template>
  <div>
    <template v-if="size === 'image-full-width'">
      <div class="blog-header single" :style="{ 'background-image': 'url(' + img.url + ')'}">
        <template v-if="$prismic.asText(caption) != ''">
          <div class="wrapper">
            <h1>{{ $prismic.asText(caption) }}</h1>
          </div>
        </template>
      </div>
    </template>
    <template v-else>
      <div class="post-part single container">
        <p class="block-img" :class="size">
          <prismic-image :field="img" />
        </p>
        <template v-if="$prismic.asText(caption) != ''">
          <p>
            <span class="image-label">{{ $prismic.asText(caption) }}</span>
          </p>
        </template>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: 'ImageCaptionSlice',
  props: {
    slice: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      img: '',
      caption: '',
      size: ''
    }
  },
  created () {
    this.img = this.slice.primary.image
    this.caption = this.slice.primary.caption
    this.size = this.slice.slice_label
  }
}
</script>
