<template>
  <div class="">
    <prismic-rich-text class="textslice" :field="renderText" />
  </div>
</template>

<script>
export default {
  name: 'TextSlice',
  props: {
    slice: {
      type: Object,
      default () {
        return ''
      }
    }
  },
  computed: {
    renderText () {
      return this.slice.items[0].primary
    }
  }
}
</script>
