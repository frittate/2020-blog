<template>
  <div class="w-100 min-h-screen px-0 lg:px-6 pb-6 pt-12 flex flex-col" :class="colorClass">
    <div class="bg-white text-black lg:px-10 pt-8 pb-10 flex-grow flex flex-col">
      <div id="content" class="w-full overflow-x-hidden lg:max-w-2xl mx-auto">
        <nuxt-link :to="backLink" class="text-xs text-black px-2">
          &larr; back to {{ document.category.uid }}
        </nuxt-link>
        <h1 class="text-4xl mb-4 uppercase px-2">
          {{ $prismic.asText(document.title) }}
        </h1>
        <p class="text-gray-600 text-base mb-8 px-2">
          {{ formatDate (meta.date) }}
        </p>
        <div v-if="Object.keys(document.article_image.card).length" class="mb-16">
          <img :src="document.article_image.url" alt="">
        </div>
        <p class="text-lg font-bold mb-10 px-2">
          {{ $prismic.asText(document.lead) }}
        </p>
        <slices-block :slices="slices" />
        <related-cards v-if="related.length >= 2" :related="related" :category="document.category.uid" />
        <button class="text-base text-black mt-16 px-2" @click.prevent="scrollToTop">
          &uarr; scroll to top
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { dateFormatter } from '~/utils/textTools'
import SlicesBlock from '~/components/SlicesBlock'
import RelatedCards from '~/components/cards/RelatedCards'

export default {
  components: {
    SlicesBlock,
    RelatedCards
  },
  async asyncData ({ $prismic, params, error }) {
    try {
      // Query to get post content
      const post = (await $prismic.api.getByUID('blog-entry', params.uid)).data

      const categoryPosts = await $prismic.api.query(
        $prismic.predicates.at('document.tags', [`${params.category}`])
      )
      // Returns data to be used in template
      return {
        document: post,
        slices: post.body,
        meta: {
          date: post.last_publication_date,
          language: post.lang,
          uid: post.uid
        },
        related: categoryPosts.results
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
    },
    backLink () {
      return `/${this.$route.params.category}`
    }
  },
  methods: {
    formatDate (date) {
      return dateFormatter(date)
    },
    scrollToTop () {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  },
  head () {
    return {
      title: `ADV [${this.document.title[0].text} -- ${this.$route.params.category}] | Sebastian Martin`
    }
  }
}
</script>
