<template>
  <div class="card" v-if="cardContent">
    <button class="card__close" @click="SET_ACTIVECARD_ID(null)">
      <i class="el-icon-close"></i>
    </button>
    <div class="card__wrapper">
      <Infobar class="card__infobar" :content="cardContent"/>
      <Tabs :tabs="tabs" class="card__tabs" @toggleTab="toggleActiveTab" :activeTab="activeTab"/>
      <Journal v-if="activeTab === 'journal'" class="card__content" />
      <DocsComments v-if="activeTab === 'docs'" class="card__content" />
    </div>
  </div>
</template>

<script>
import * as api from '@/api'
import * as configs from '@/configs'
import Journal from './journal/Journal.vue'
import Tabs from './tabs/Tabs.vue'
import DocsComments from './docs-comments/Docs-Comments.vue'
import Infobar from './infobar/Infobar.vue'
import { mapMutations, mapState } from 'vuex'

export default {
  components: {
    Journal, DocsComments, Infobar, Tabs
  },
  data () {
    return {
      activeTab: '',
      tabs: configs.cardConfig.tabs,
      toggleObj: 'tl',
      cardContent: null
    }
  },
  computed: {
    ...mapState({
      trafficLights: state => state.trafficLights.data,
      activeCardId: state => state.activeCardId
    })
  },
  methods: {
    ...mapMutations(['SET_ACTIVECARD_ID']),
    async fillCardInfobar () {
      const res = await api.objects.fetchObjInfo(this.activeCardId)
      const data = res.data.object[0]
      this.cardContent = {
        ...data,
        info: {
          color: configs.cardConfig.color[data.state],
          mode: configs.cardConfig.mode[data.mode],
          state: configs.cardConfig.state[data.state],
          source: configs.cardConfig.source[data.source],
          DKType: 'Протокол «Мегаполис» | TCP/IP'
        }
      }
    },
    toggleActiveTab (tabName) {
      this.activeTab = tabName
    }
  },
  watch: {
    async activeCardId () {
      await this.fillCardInfobar()
    }
  },
  async mounted () {
    await this.fillCardInfobar()
    this.toggleActiveTab('journal')
  }
}
</script>

<style lang="scss" src="./card.scss"></style>
