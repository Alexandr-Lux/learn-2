<template>
  <div class="dropdown">
    <div class="dropdown__exit" v-if="type === 'exit'">
      <button @click="exit">EXIT</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    type: String
  },
  methods: {
    exit () {
      localStorage.removeItem('token')
      this.$router.replace({ name: 'Login' })
    }
  }
}
</script>

<style lang="scss" src="./dropdown.scss"></style>
