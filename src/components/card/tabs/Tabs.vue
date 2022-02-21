<template>
  <div class="tabs">
    <button
      :class="['tabs__btn', 'title-3', {active: activeTab === name}]"
      @click="$emit('toggleTab', name)"
      v-for="(val, name, i) in tabs"
      :key="i">
      {{val}}
    </button>
  </div>
</template>

<script>
export default {
  props: {
    tabs: Object,
    activeTab: String
  }
}
</script>

<style lang="scss"  src="./tabs.scss"></style>
