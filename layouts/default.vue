<template>
  <div class="relative">
    <div id="hack" class="hidden text-stories bg-stories border-stories text-home bg-home border-home text-travel bg-travel border-home text-web bg-web border-web text-kitchen bg-kitchen border-kitchen text-thoughts bg-thoughts border-thoughts text-creative bg-creative border-creative">
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

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}
</style>
