<template>
  <div class="relative max-width-hd mx-auto">
    <div id="hack" class="hidden text-stories bg-stories hover:bg-stories border-stories text-home bg-home border-home hover:bg-home text-travel bg-travel border-travel hover:bg-travel text-web bg-web border-web hover:bg-web text-kitchen bg-kitchen border-kitchen hover:bg-kitchen text-thoughts bg-thoughts border-thoughts hover:bg-thoughts text-creative bg-creative border-creative hover:bg-creative">
      .
    </div>
    <navigation />
    <nuxt />
  </div>
</template>

<script>
import Navigation from '~/components/nav/Navigation'

export default {
  components: {
    Navigation
  }
}
</script>

<style>
html {
  font-family: 'IBM Plex Mono', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

body {
  background: #000;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

.page-enter-active, .page-leave-active {
  transition: all .25s ease-out;
}
.page-enter, .page-leave-active {
  opacity: 0;
  transform-origin: 50% 50%;
}
</style>
