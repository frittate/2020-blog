<template>
  <div class="w-100 min-h-screen bg-home px-0 lg:px-6 pb-6 pt-12 flex flex-col">
    <div class="bg-white text-black px-2 lg:px-10 pt-8 pb-10 flex-grow flex flex-col">
      <div id="content" class="max-w-2xl mx-auto">
        <h1 class="text-4xl pb-10 uppercase">
          {{ $prismic.asText(doc.title) }}
        </h1>
        <div class="mb-16">
          <img :src="doc.about_image.url" alt="">
        </div>
        <prismic-rich-text class="textslice" :field="doc.content" />
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-console */
// import Logo from '~/components/Logo.vue'
import { dateFormatter } from '~/utils/textTools'
/* import CategoryTag from '~/components/global/CategoryTag'
import ReadOnButton from '~/components/global/ReadOnButton'
import PostCardGrid from '~/components/PostCardGrid' */

export default {
  name: 'About',
  async asyncData ({ $prismic, error }) {
    try {
      const doc = (await $prismic.api.getSingle('about')).data
      return {
        doc
      }
    } catch (e) {
      error({ statusCode: 404, message: 'Page not found' })
    }
  },
  methods: {
    formatDate (date) {
      return dateFormatter(date)
    }
  },
  head () {
    return {
      title: 'ADV [about] | Sebastian Martin | Blog'
    }
  }
}
</script>
