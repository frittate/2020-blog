<template>
  <div class="post-part single container">
    <blockquote class="block-quotation">
      {{ $prismic.asText(slice.primary.quote) }}
    </blockquote>
  </div>
</template>

<script>
export default {
  name: 'QuoteSlice',
  props: {
    slice: {
      type: Object,
      default () {
        return {}
      }
    }
  }
}
</script>
