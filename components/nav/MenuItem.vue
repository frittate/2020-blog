<template>
  <nuxt-link
    :to="link"
    class="text-3xl lg:text-lg font-bold text-black opacity-50 lg:mr-6 lg:last:ml-auto"
    :class="linkColor"
  >
    {{ route.name }}
  </nuxt-link>
</template>

<script>
export default {
  name: 'MenuItem',
  props: {
    route: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  computed: {
    currentCat () {
      return this.$route.params.category
    },
    linkColor () {
      const text = []
      if (['home', 'stories', 'thoughts'].includes(this.currentCat) || this.currentCat === undefined) {
        text.push('lg:text-black')
      } else {
        text.push('lg:text-white')
      }
      if (this.$route.path === '/' || this.currentCat === this.route.url) {
        text.push('opacity-100')
      }
      return text
    },
    link () {
      if (this.route.url !== '/') {
        return `/${this.route.url}/`
      }
      return '/'
    }
  }
}
</script>
