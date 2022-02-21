<template>
  <div class="tabs">
    <ul class="tabs__list">
      <li class="tabs__item" v-for="(val, name, i) in tabs" :key="i">
        <button
          :class="['tabs__btn', 'title-3', {active: activeTab === name}]"
          @click="toggleActiveTab(name)">
          {{val}}
        </button>
      </li>
    </ul>
    <Journal v-if="activeTab === 'journal'" class="tabs__content" />
    <DocsComments v-if="activeTab === 'docs'" class="tabs__content" />
  </div>
</template>

<script>
import * as configs from '@/configs'
import Journal from './journal/Journal.vue'
import DocsComments from './docs-comments/Docs-Comments.vue'
export default {
  components: {
    Journal, DocsComments
  },
  data () {
    return {
      tabs: configs.cardConfig.tabs,
      activeTab: ''
    }
  },
  methods: {
    toggleActiveTab (tabName) {
      this.activeTab = tabName
    }
  },
  mounted () {
    this.toggleActiveTab('journal')
  }
}
</script>

<style lang="scss"  src="./tabs.scss"></style>
