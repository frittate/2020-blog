<template>
  <div class="w-100 min-h-screen px-6 pb-6 pt-12 flex flex-col" :class="colorClass">
    <div class="bg-white text-black px-10 pt-8 pb-10 flex-grow flex flex-col">
      <div id="content" class="max-w-2xl mx-auto">
        <h1 class="text-4xl mb-4 uppercase">
          {{ $prismic.asText(document.title) }}
        </h1>
        <p class="text-gray-600 text-base mb-16">
          {{ formatDate (meta.date) }}
        </p>
        <p class="text-lg font-bold mb-10">
          {{ $prismic.asText(document.lead) }}
        </p>
        <slices-block :slices="slices" />
      </div>
    </div>
  </div>
</template>

<script>
import { dateFormatter } from '~/utils/textTools'
import SlicesBlock from '~/components/SlicesBlock'

export default {
  components: {
    SlicesBlock
  },
  async asyncData ({ $prismic, params, error }) {
    try {
      // Query to get post content
      const post = (await $prismic.api.getByUID('blog-entry', params.uid)).data
      // Returns data to be used in template
      return {
        document: post,
        slices: post.body,
        meta: {
          date: post.last_publication_date,
          language: post.lang,
          uid: post.uid
        }
        // formattedDate: Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(post.date)),
      }
    } catch (e) {
      // Returns error page
      error({ statusCode: 404, message: 'Page not found' })
    }
  },
  computed: {
    colorClass () {
      if (this.document.category.uid) {
        return [`bg-${this.document.category.uid}`]
      }
      return 'bg-home'
    }
  },
  methods: {
    formatDate (date) {
      return dateFormatter(date)
    }
  }
}
</script>
