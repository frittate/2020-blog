<template>
  <section>
    <!-- Slice section template -->
    <section v-for="(slice, index) in slices" :key="'slice-' + index">
      <!-- Text slice template -->
      <template v-if="slice.slice_type === 'text'">
        <!-- Here :slice="slice" passes the data to the component -->
        <text-slice :slice="slice" />
      </template>
      <!-- Quote slice template -->
      <!--  <template v-else-if="slice.slice_type === 'quote'">
        <quote-slice :slice="slice" />
      </template> -->
      <!-- Image with caption slice template -->
      <!--  <template v-else-if="slice.slice_type === 'image_with_caption'">
        <image-caption-slice :slice="slice" />
      </template> -->
    </section>
  </section>
</template>

<script>
// Imports for all slices
// const QuoteSlice = () => import('~/components/slices/QuoteSlice.vue')
const TextSlice = () => import('~/components/slices/TextSlice.vue')
// const ImageCaptionSlice = () => import('~/components/slices/ImageCaptionSlice.vue')

export default {
  name: 'SlicesBlock',
  components: {
    // QuoteSlice,
    TextSlice
    // ImageCaptionSlice
  },
  props: {
    slices: {
      type: Array,
      default () {
        return []
      }
    }
  }
}
</script>
