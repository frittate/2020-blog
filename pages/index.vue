<template>
  <div class="w-100 min-h-screen bg-home px-6 pb-6 pt-12 flex flex-col">
    <div class="bg-black px-10 pt-8 pb-10 flex-grow flex flex-col">
      <h1 class="text-4xl pb-10 uppercase">
        Home
      </h1>
      <div class="flex flex-col lg:grid gap-0 grid-cols-1 lg:grid-cols-2 grid-rows-1 lg:grid-rows-layout flex-grow border border-gray-600">
        <div class="lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-3 py-16 lg:py-5 pl-5 pr-2 border-b lg:border-r border-gray-600 relative">
          <div class="max-w-sm">
            <h2 class="text-3xl mb-4">
              {{ firstFeatured.data.title[0].text }}
            </h2>
            <p class="text-base mb-4">
              {{ constrainCharacters(firstFeatured.data.lead[0].text, 120) }}
            </p>
            <p class="text-xs text-gray-500">
              {{ formatDate(firstFeatured.last_publication_date) }}
            </p>
          </div>
          <div class="absolute top-0 right-0 pr-2 pt-5">
            <category-tag :category="firstFeatured.data.category.uid" />
          </div>
          <div class="absolute bottom-0 right-0 pr-2 pb-5">
            <read-on-button :slug="firstFeatured.uid" :category="firstFeatured.data.category.uid" />
          </div>
          <div v-if="Object.keys(firstFeatured.data.article_image.card).length" class="absolute bottom-0 left-0 pl-5 pb-5 overflow-hidden">
            <img
              :src="firstFeatured.data.article_image.thumb.url"
              :width="firstFeatured.data.article_image.thumb.dimensions.width"
              :height="firstFeatured.data.article_image.thumb.dimensions.height"
              :alt="firstFeatured.data.article_image.thumb.alt"
            >
          </div>
        </div>
        <div class="lg:col-start-2 lg:col-end-3 lg:row-start-1 lg:row-end-2 py-16 lg:py-5 pl-5 pr-2 border-b border-gray-600 relative">
          <div class="md:max-w-lg lg:max-w-2xl">
            <h2 class="text-3xl mb-4">
              {{ secondFeatured.data.title[0].text }}
            </h2>
            <p class="text-base mb-4">
              {{ constrainCharacters(secondFeatured.data.lead[0].text, 60) }}
            </p>
            <p class="text-xs text-gray-500">
              {{ formatDate(secondFeatured.last_publication_date) }}
            </p>
          </div>
          <div class="absolute top-0 right-0 pr-2 pt-5">
            <category-tag :category="secondFeatured.data.category.uid" />
          </div>
          <div class="absolute bottom-0 right-0 pr-2 pb-5">
            <read-on-button :slug="secondFeatured.uid" :category="firstFeatured.data.category.uid" />
          </div>
        </div>
        <div class="lg:col-start-2 lg:col-end-3 lg:row-start-2 lg:row-end-3 py-16 lg:py-5 pl-5 pr-2 border-b border-gray-600 relative">
          <div class="max-w-lg">
            <h2 class="text-3xl mb-4">
              {{ thirdFeatured.data.title[0].text }}
            </h2>
            <p class="text-base mb-4">
              {{ constrainCharacters(thirdFeatured.data.lead[0].text, 60) }}
            </p>
            <p class="text-xs text-gray-500">
              {{ formatDate(thirdFeatured.last_publication_date) }}
            </p>
          </div>
          <div class="absolute top-0 right-0 pr-2 pt-5">
            <category-tag :category="'travel'" />
          </div>
          <div class="absolute bottom-0 right-0 pr-2 pb-5">
            <read-on-button :slug="thirdFeatured.uid" :category="firstFeatured.data.category.uid" />
          </div>
        </div>
        <div class="col-start-1 col-end-3 row-start-3 p-5">
          <post-card-grid :entries="postsWithoutFeatured" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-console */
// import Logo from '~/components/Logo.vue'
import { constrainChars, dateFormatter } from '~/utils/textTools'
import CategoryTag from '~/components/global/CategoryTag'
import ReadOnButton from '~/components/global/ReadOnButton'
import PostCardGrid from '~/components/PostCardGrid'

export default {
  components: {
    // Logo
    CategoryTag,
    ReadOnButton,
    PostCardGrid
  },
  async asyncData ({ $prismic, error }) {
    try {
      // Query to get the home page content
      const blogPosts = await $prismic.api.query(
        $prismic.predicates.at('document.type', 'blog-entry'),
        { orderings: '[my.post.date desc]' }
      )
      console.log({ blogPosts })
      return {
        posts: blogPosts.results
        // Page content
        /* banner: homepage.homepage_banner[0], */
        // Set slices as variable
        /* slices: homepage.page_content */
      }
    } catch (e) {
      error({ statusCode: 404, message: 'Page not found' })
    }
  },
  computed: {
    firstFeatured () {
      const entry = this.posts.filter(el => el.data.isfeatured === '1')
      return entry[0]
    },
    secondFeatured () {
      const entry = this.posts.filter(el => el.data.isfeatured === '2')
      return entry[0]
    },
    thirdFeatured () {
      const entry = this.posts.filter(el => el.data.isfeatured === '3')
      if (entry.length) { return entry[0] }
      return this.posts[0]
    },
    postsWithoutFeatured () {
      const entry = this.posts.filter(el => !el.data.isfeatured)
      if (entry.length) { return entry }
      return this.posts
    }
  },
  methods: {
    constrainCharacters (text, length) {
      if (Object.keys(this.firstFeatured.data.article_image.card).length === 0) {
        length *= 2
      }
      return constrainChars(text, length)
    },
    formatDate (date) {
      return dateFormatter(date)
    }
  },
  head () {
    return {
      title: 'ADV [home] | Sebastian Martin | Blog'
    }
  }
}
</script>
