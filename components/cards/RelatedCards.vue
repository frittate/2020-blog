<template>
  <div>
    <p class="text-lg font-bold mb-6 pt-6">
      Related Articles
    </p>
    <div v-show="related" class="flex flex-col md:flex-row justify-between">
      <post-card v-for="entry in selection" :key="entry.uid" :entry="entry" tiny />
      <nuxt-link :to="linkDestination" class="flex items-center align-center flex-thirds p-4" :class="colorClass">
        <p class="text-lg">
          All entries from {{ $route.params.category }}
          <br> &rarr;
        </p>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-console */
import PostCard from './PostCard'
export default {
  name: 'RelatedCards',
  components: {
    PostCard
  },
  props: {
    related: {
      type: Array,
      default () {
        return []
      }
    },
    category: {
      type: String,
      default () {
        return 'home'
      }
    }
  },
  computed: {
    selection () {
      if (this.related) {
        const _arr = [...this.related]
        return [...Array(2)].map(() => _arr.splice(Math.floor(Math.random() * _arr.length), 1)[0])
      }
      return []
    },
    colorClass () {
      let textCol = 'white'
      if (['stories', 'home', 'thoughts'].includes(this.category)) {
        textCol = 'black'
      }
      return [`bg-${this.category}`, `text-${textCol}`]
    },
    linkDestination () {
      return `/${this.category}`
    }
  }
}
</script>
