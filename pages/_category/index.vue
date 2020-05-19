<template>
  <div class="w-100 min-h-screen px-0 lg:px-6 pb-6 pt-12 flex flex-col" :class="colorClass">
    <div class="bg-black px-2 lg:px-10 pt-8 pb-10 flex-grow flex flex-col">
      <h1 class="text-4xl pb-10 uppercase">
        {{ this.$route.params.category }}
      </h1>
      <div class="grid gap-0 grid-flow-row grid-cols-1 grid-rows-1 flex-grow border border-gray-600">
        <div class="col-start-1 col-end-3 row-start-3 p-5">
          <post-card-grid :entries="posts" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-console */
import PostCardGrid from '~/components/cards/PostCardGrid'
export default {
  components: {
    PostCardGrid
  },
  async asyncData ({ $prismic, error, params }) {
    try {
      const blogPosts = await $prismic.api.query(
        $prismic.predicates.at('document.tags', [`${params.category}`]),
        { orderings: '[document.last_publication_date desc]' }
      )
      return {
        posts: blogPosts.results
      }
    } catch (e) {
      error({ statusCode: 404, message: 'Page not found' })
    }
  },
  computed: {
    colorClass () {
      if (this.$route.params.category) {
        return [`bg-${this.$route.params.category}`]
      }
      return 'bg-home'
    }
  },
  head () {
    return {
      title: `[${this.$route.params.category}] ADV | Sebastian Martin | Blog`
    }
  }
}
</script>
