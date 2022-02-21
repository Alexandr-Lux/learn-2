<template>
  <div class="map">
    <button class="map__center" @click="flyToMapCenter">
      <i class="el-icon-full-screen"></i>
    </button>
    <div id="mapContainer" class="map__container"></div>
    <Hint class="map__hint" :config="hint" v-if="hint" />
  </div>
</template>

<script>
import Map from '@/logic/map'
import Widget from '@/logic/widget'
import Hint from '@/components/hint/Hint.vue'
import * as configs from '@/configs'

import { mapActions, mapMutations, mapState } from 'vuex'

export default {
  components: {
    Hint
  },
  data () {
    return {
      mapgl: null,
      hint: null,
      mapConfig: configs.maps.baseMap,
      accessToken: configs.maps.accessToken,
      sourcesOnMap: [],
      layersOnMap: []
    }
  },
  computed: {
    ...mapState({
      trafficLights: state => state.trafficLights.data,
      geotrafficLights: state => state.trafficLights.geojson,
      activeCardId: state => state.activeCardId
    })
  },
  methods: {
    ...mapActions(['getObjects', 'getSummary']),
    ...mapMutations(['SET_GEOJSON', 'SET_ACTIVECARD_ID']),

    flyToMapCenter () {
      this.mapgl.flyTo({
        center: configs.maps.baseMap.center,
        zoom: configs.maps.baseMap.zoom,
        speed: 2.5
      })
    }
  },
  watch: {
    activeCardId (id) {
      if (id) {
        const curCard = this.trafficLights.find(tl => tl.id === id)
        this.mapgl.flyTo({
          center: curCard.geom.coordinates.map(coord => coord - 0.0005),
          zoom: 17,
          speed: 2.5
        })
      }
      this.mapgl.setLayoutProperty(
        'tl',
        'icon-size',
        ['case', ['==', ['get', 'id'], id], 1.5, 0.8]
      )
      this.mapgl.setPaintProperty(
        'tl',
        'icon-color',
        [
          'case',
          ['==', ['get', 'id'], id],
          '#5398E0',
          [
            'match',
            ['get', 'state'],
            2,
            '#cc8f3d',
            3,
            '#79DB62',
            254,
            '#E35D5D',
            '#ccc'
          ]
        ])
    }
  },
  async mounted () {
    const map = new Map(this, configs.sources.tl, configs.layers.lights)
    const widget = new Widget(this)

    await map.initMap()
    await widget.initWidgets()
  }
}
</script>

<style lang="scss" src="./map.scss"></style>
