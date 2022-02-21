<template>
  <div class="docs-comments">
    <div class="docs-comments__wrapper">
      <Docs @docs-loading="toggleloadingDocs" />
      <Comments @comments-loading="toggleloadingComments" />
    </div>
    <div  class=" docs-comments__loading" v-if="loadingDocs && loadingComments">
      <Icon name="spinner" class="loading"/>
    </div>
  </div>
</template>

<script>

import Docs from './docs/Docs.vue'
import Comments from './comments/Comments.vue'
export default {
  data () {
    return {
      loadingDocs: false,
      loadingComments: false
    }
  },
  components: {
    Docs, Comments
  },
  methods: {
    toggleloadingDocs () {
      this.loadingDocs = !this.loadingDocs
    },
    toggleloadingComments () {
      this.loadingComments = !this.loadingComments
    }
  }
}
</script>

<style lang="scss" src="./docs-comments.scss"></style>
