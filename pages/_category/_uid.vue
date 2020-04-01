<template>
  <div class="w-100 min-h-screen px-0 lg:px-6 pb-6 pt-12 flex flex-col" :class="colorClass">
    <div class="bg-white text-black lg:px-10 pt-8 pb-10 flex-grow flex flex-col">
      <article id="content" class="w-full overflow-x-hidden lg:max-w-2xl mx-auto">
        <nuxt-link :to="backLink" class="text-xs text-black px-2">
          &larr; back to {{ document.category.uid }}
        </nuxt-link>
        <header>
          <h1 class="text-4xl mb-4 uppercase px-2">
            {{ $prismic.asText(document.title) }}
          </h1>
          <p class="text-gray-600 text-base mb-8 px-2">
            <time :datetime="meta.date">
              {{ formatDate (meta.date) }}
            </time>
          </p>
          <div v-if="Object.keys(document.article_image.card).length" class="mb-16">
            <img :src="document.article_image.url" alt="">
          </div>
          <p class="text-lg font-bold mb-10 px-2">
            {{ $prismic.asText(document.lead) }}
          </p>
        </header>
        <slices-block :slices="slices" />
        <aside v-if="document.commentary.length" class="pl-6 mt-4 mb-4 py-2 border-l border-gray-600">
          <button class="text-gray-600 text-sm mb-3" @click.prevent="showComment">
            {{ comment ? '- hide commentary' : '+ show commentary' }}
          </button>
          <div v-show="comment" class="text-gray-600 text-sm pt-4">
            {{ $prismic.asText(document.commentary) }}
          </div>
        </aside>
        <aside>
          <related-cards v-if="related.length >= 2" :id="$route.params.uid" :category="document.category.uid" :related="related" />
        </aside>
        <button class="text-base text-black mt-16 px-2" @click.prevent="scrollToTop">
          &uarr; scroll to top
        </button>
      </article>
    </div>
  </div>
</template>

<script>
import { dateFormatter } from '~/utils/textTools'
import SlicesBlock from '~/components/SlicesBlock'
import RelatedCards from '~/components/cards/RelatedCards'

export default {
  name: 'DetailPost',
  components: {
    SlicesBlock,
    RelatedCards
  },
  async asyncData ({ $prismic, params, error }) {
    try {
      // Query to get post content
      const post = (await $prismic.api.getByUID('blog-entry', params.uid))

      const categoryPosts = await $prismic.api.query(
        $prismic.predicates.at('document.tags', [`${params.category}`])
      )
      // Returns data to be used in template
      return {
        document: post.data,
        slices: post.data.body,
        meta: {
          date: post.first_publication_date,
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
  data () {
    return {
      comment: false
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
    },
    showComment () {
      this.comment = !this.comment
    }
  },
  head () {
    return {
      title: `${this.document.title[0].text} [${this.$route.params.category}] ADV | Sebastian Martin | Blog`
    }
  }
}
</script>
