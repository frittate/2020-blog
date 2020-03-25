<template>
  <div class="card w-56 border flex flex-col min-h-card" :class="colorClassBorder">
    <p class="py-2 text-xs flex justify-center items-center" :class="colorClass">
      #{{ entry.data.category.uid }}
    </p>
    <div v-if="image" class="h-24 overflow-hidden">
      <img :src="image.url" alt="" srcset="">
    </div>
    <div class="content flex flex-col px-5 pt-5 pb-2 flex-grow">
      <h2 class="text-base mb-5">
        {{ entry.data.title[0].text }}
      </h2>
      <p class="text-xs flex-grow mb-5">
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
      if (this.entry.data.category.uid) {
        return `border-${this.entry.data.category.uid}`
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
    },
    image () {
      if (Object.keys(this.entry.data.article_image.card).length !== 0) {
        return {
          url: this.entry.data.article_image.card.url,
          width: this.entry.data.article_image.card.dimensions.width,
          height: this.entry.data.article_image.card.dimensions.height
        }
      }
      return false
    }
  }
}
</script>
