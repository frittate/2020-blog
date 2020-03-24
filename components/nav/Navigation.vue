<template>
  <nav class="absolute w-100 top-0 left-0 pl-6 h-12 flex items-center">
    <menu-item v-for="route in routes" :key="route.id" :route="route" />
  </nav>
</template>

<script>
import MenuItem from './MenuItem'
export default {
  components: {
    MenuItem
  },
  data () {
    return {
      routes: [
        {
          id: 0,
          url: '/',
          name: 'Home'
        },
        {
          id: 1,
          url: 'web',
          name: 'Web Development'
        },
        {
          id: 2,
          url: 'stories',
          name: 'Stories'
        },
        {
          id: 3,
          url: 'thoughts',
          name: 'Thoughts'
        },
        {
          id: 4,
          url: 'travel',
          name: 'Travel'
        },
        {
          id: 5,
          url: 'creative',
          name: 'Creative'
        },
        {
          id: 6,
          url: 'kitchen',
          name: 'Kitchen'
        }
      ]
    }
  }
}
</script>
