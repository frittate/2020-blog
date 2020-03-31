<template>
  <div class="card border flex flex-col flex-1" :class="sizeClass">
    <p v-if="!tiny" class="py-2 text-xs flex justify-center items-center" :class="colorClass">
      #{{ entry.data.category.uid }}
    </p>
    <div v-if="image && !tiny" class="h-24 overflow-hidden">
      <img :src="image.url" alt="" srcset="">
    </div>
    <div class="content flex flex-col flex-grow" :class="paddingTiny">
      <h2 class="text-lg pl-0  mb-5">
        {{ entry.data.title[0].text }}
      </h2>
      <p v-if="!tiny" class="text-xs flex-grow mb-5">
        {{ lead }}
      </p>
      <p class="text-xs text-gray-500 mt-auto">
        {{ date }}
      </p>
    </div>
    <nuxt-link :to="link" class="py-2 text-xs flex justify-center items-center" :class="tinyClass">
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
    },
    tiny: {
      type: Boolean
    }
  },
  data () {
    return {
      category: 'travel'
    }
  },
  computed: {
    sizeClass () {
      const newClass = []
      if (this.entry.data.category.uid) {
        newClass.push(`border-${this.entry.data.category.uid}`)
      } else {
        newClass.push('border-home')
      }
      if (this.tiny) {
        newClass.push('flex-thirds mb-3 lg:mb-0')
      } else {
        newClass.push('min-h-card w-full lg:w-56')
      }
      return newClass
    },
    paddingTiny () {
      if (this.tiny) {
        return ['p-2']
      }
      return ['px-5', 'pt-5', 'pb-2']
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
    },
    tinyClass () {
      if (this.tiny) {
        return ['bg-black', 'text-white']
      }
      return ['bg-white', 'text-black']
    }
  }
}
</script>
