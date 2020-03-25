<template>
  <div v-if="entries.length" class="grid grid-cols-postCardGrid gap-10 justify-center">
    <post-card v-for="entry in entries" :key="entry.uid" :entry="entry" />
  </div>
  <div v-else>
    <p class="text-base text-white">
      Hm, seems like there is nothing here at the moment!
    </p>
  </div>
</template>

<script>
import PostCard from './PostCard'
export default {
  components: {
    PostCard
  },
  props: {
    entries: {
      type: Array,
      default () {
        return []
      }
    }
  }
}
</script>
