<template>
  <div class="relative">
    <div id="hack" class="hidden text-stories bg-stories text-home bg-home text-travel bg-travel text-web bg-web text-kitchen bg-kitchen text-thoughts bg-thoughts text-creative bg-creative">
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
