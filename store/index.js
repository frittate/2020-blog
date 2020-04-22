/* eslint-disable no-console */
export const state = () => ({
  articles: []
})

export const mutations = {
  SET_ARTICLES: (state, payload) => {
    state.articles = payload
  }
}

export const actions = {
  nuxtServerInit: (vCtx, nCtx) => {
    if (vCtx.state.articles.length === 0) {
      return nCtx.$prismic.api.query(
        nCtx.$prismic.predicates.at('document.type', 'blog-entry'),
        { orderings: '[my.post.date desc]', pageSize: 100 }
      ).then((res) => {
        vCtx.commit('SET_ARTICLES', res.results)
        // console.log(vCtx.state.articles)
      })
    }
    return false
  }
}
