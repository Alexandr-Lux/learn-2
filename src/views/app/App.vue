<template>
  <div class="app">
    <Navbar class="app__navbar"/>
    <Map class="app__map" @toggleLoading="loading = !loading" />
    <Objects-list class="app__objects-list" :loading="loading" />
    <div class="app__widget-wrapper">
      <Widget class="app__widget"
        v-if="widgetInfo"
        :source="{
          ...widgetInfo.objects,
          type: 'trafficLight',
          name: 'Светофоры'
        }" />
      <Widget class="app__widget"
        v-if="widgetInfo"
        :source="{
          ...widgetInfo.detectors,
          type: 'detector',
          name: 'Детекторы'
        }" />
    </div>
    <Card class="app__card" v-if="activeCardId"/>
  </div>
</template>

<script>
import Card from '@/components/card/Card.vue'
import Widget from '@/components/widget/Widget.vue'
import ObjectsList from '@/components/objects-list/Objects-list.vue'
import Map from '@/components/map/Map.vue'
import Navbar from '@/components/navbar/Navbar.vue'
import { mapState } from 'vuex'

export default {
  components: {
    Map, Navbar, Card, Widget, ObjectsList
  },
  data () {
    return {
      loading: false
    }
  },
  computed: {
    ...mapState({
      widgetInfo: state => state.summary,
      activeCardId: state => state.activeCardId
    })
  },
  mounted () {
    document.body.classList.add('dark-theme')
  }
}
</script>

<style lang="scss" src="./app.scss"></style>
