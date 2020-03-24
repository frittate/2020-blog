<template>
  <nuxt-link :to="link" class="px-4 py-1 text-base text-black bg-white border border-gray-600 hover:bg-black hover:text-white transition-colors duration-500 ease-in-out">
    Read on
  </nuxt-link>
</template>

<script>
export default {
  props: {
    slug: {
      type: String,
      default () {
        return ''
      }
    },
    category: {
      type: String,
      default () {
        return ''
      }
    }
  },
  computed: {
    link () {
      return `/${this.category}/${this.slug}`
    }
  }
}
</script>
