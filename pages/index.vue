<template>
  <div class="w-100 min-h-screen bg-home px-0 lg:px-6 pb-6 pt-12 flex flex-col">
    <div class="bg-black px-2 lg:px-10 pt-8 pb-10 flex-grow flex flex-col">
      <h1 class="text-4xl pb-10 uppercase">
        Home
      </h1>
      <div class="flex flex-col lg:grid gap-0 grid-cols-1 lg:grid-cols-2 grid-rows-1 lg:grid-rows-layout flex-grow border border-gray-600">
        <div class="lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-3 py-16 lg:py-5 pl-5 pr-2 border-b lg:border-r border-gray-600 relative">
          <!-- <div class="absolute lg:hidden block top-0 left-0 w-full h-full opacity-50 overflow-hidden z-0">
            <img
              v-show="Object.keys(firstFeatured.data.article_image.card).length !== 0"
              class="transform scale-150"
              :src="firstFeatured.data.article_image.url"
              :width="firstFeatured.data.article_image.dimensions.width"
              :height="firstFeatured.data.article_image.dimensions.height"
              :alt="firstFeatured.data.article_image.alt"
            >
          </div> -->
          <div class="max-w-sm relative z-1">
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
          <div class="absolute top-0 right-0 pr-2 pt-5 z-1">
            <category-tag :category="firstFeatured.data.category.uid" />
          </div>
          <div class="absolute bottom-0 right-0 pr-2 pb-5 z-1">
            <read-on-button :slug="firstFeatured.uid" :category="firstFeatured.data.category.uid" />
          </div>
          <!-- <div class="absolute hidden lg:block lg:bottom-0 left-0 lg:pl-5 lg:pb-5 overflow-hidden">
            <img
              v-show="Object.keys(firstFeatured.data.article_image.card).length !== 0"
              :src="firstFeatured.data.article_image.thumb.url"
              :width="firstFeatured.data.article_image.thumb.dimensions.width"
              :height="firstFeatured.data.article_image.thumb.dimensions.height"
              :alt="firstFeatured.data.article_image.thumb.alt"
            >
          </div> -->
        </div>
        <div class="lg:col-start-2 lg:col-end-3 lg:row-start-1 lg:row-end-2 py-16 lg:py-5 pl-5 pr-2 border-b border-gray-600 relative">
          <div class="md:max-w-lg lg:max-w-2xl z-1">
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
          <div class="absolute top-0 right-0 pr-2 pt-5 z-1">
            <category-tag :category="secondFeatured.data.category.uid" />
          </div>
          <div class="absolute bottom-0 right-0 pr-2 pb-5 z-1">
            <read-on-button :slug="secondFeatured.uid" :category="secondFeatured.data.category.uid" />
          </div>
        </div>
        <div class="lg:col-start-2 lg:col-end-3 lg:row-start-2 lg:row-end-3 py-16 lg:py-5 pl-5 pr-2 border-b border-gray-600 relative">
          <div class="md:max-w-lg lg:max-w-2xl z-1">
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
          <div class="absolute top-0 right-0 pr-2 pt-5 z-1">
            <category-tag :category="thirdFeatured.data.category.uid" />
          </div>
          <div class="absolute bottom-0 right-0 pr-2 pb-5 z-1">
            <read-on-button :slug="thirdFeatured.uid" :category="thirdFeatured.data.category.uid" />
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
import PostCardGrid from '~/components/cards/PostCardGrid'

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
      return this.featuredPosts[0]
    },
    secondFeatured () {
      return this.featuredPosts[1]
    },
    thirdFeatured () {
      return this.featuredPosts[2]
    },
    featuredPosts () {
      const featured = this.posts.filter(el => el.data.featured)
      if (featured.length) {
        return featured.map(a => [Math.random(), a]).sort((a, b) => a[0] - b[0]).map(a => a[1])
      }
      return this.posts
    },
    postsWithoutFeatured () {
      const entry = this.posts.filter(el => !el.data.featured)
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
