<template>
  <div class="card w-56 border flex flex-col min-h-card mr-10" :class="colorClassBorder">
    <p class="py-2 text-xs flex justify-center items-center" :class="colorClass">
      #{{ entry.data.category.uid }}
    </p>
    <div class="content flex flex-col px-5 pt-5 pb-2 flex-grow">
      <h2 class="text-base mb-5">
        {{ entry.data.title[0].text }}
      </h2>
      <p class="text-xs flex-grow">
        {{ lead }}
      </p>
      <p class="text-xs text-gray-500">
        {{ date }}
      </p>
    </div>
    <nuxt-link :to="link" class="py-2 text-xs flex justify-center items-center bg-white text-black">
      Read on
    </nuxt-link>
  </div>
</template>

<script>
import { constrainChars, dateFormatter } from '~/utils/textTools'

export default {
  props: {
    entry: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      category: 'travel'
    }
  },
  computed: {
    colorClassBorder () {
      if (this.category) {
        return `border-${this.category}`
      }
      return 'border-home'
    },
    colorClass () {
      const tag = this.entry.data.category.uid
      let textCol = 'white'
      if (['stories', 'uncategorized', 'thoughts'].includes(tag)) {
        textCol = 'black'
      }
      return [`bg-${tag}`, `text-${textCol}`]
    },
    lead () {
      return constrainChars(this.entry.data.lead[0].text, 60)
    },
    date () {
      return dateFormatter(this.entry.last_publication_date)
    },
    link () {
      return `/${this.entry.data.category.uid}/${this.entry.uid}`
    }
  }
}
</script>
