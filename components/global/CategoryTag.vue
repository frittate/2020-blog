<template>
  <nuxt-link :to="linkDestination" class="px-4 py-1 text-base border-2 hover:border-white transition-colors duration-500 ease-in-out" :class="colorClass">
    #{{ category }}
  </nuxt-link>
</template>

<script>
export default {
  props: {
    category: {
      type: String,
      default () {
        return 'uncategorized'
      }
    }
  },
  computed: {
    linkDestination () {
      return `/categories/${this.category}`
    },
    colorClass () {
      if (this.category.length) {
        return [`border-${this.category}`, 'bg-black', `hover:bg-${this.category}`, 'hover:text-black']
      }
      return 'border-home'
    }
  }
}
</script>
