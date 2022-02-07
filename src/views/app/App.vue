<template>
  <div class="app">
    <nav class="app__navbar navbar">
      <a class="navbar__link" href="https://www.ritm3.ru" target="_blank">
        <img style="width: 21px" class="navbar__link-img" src="../../assets/app/logo.png" alt="logo">
      </a>
      <el-popover class="navbar__popover profile"
        placement="bottom"
        trigger="click">
        <button class="profile__content" slot="reference">
          <h3 class="profile__title caption">Текущий профиль</h3>
          <span class="profile__name">Profile Name</span>
          <i class="el-icon-arrow-down"></i>
        </button>
        <Dropdown />
      </el-popover>
      <el-popover class="navbar__popover objects"
        placement="bottom"
        trigger="click">
        <button class="objects__dropdown" slot="reference">
          <Icon name="trafficLight" />
          <span>Светофорные объекты</span>
          <i class="el-icon-caret-bottom"></i>
        </button>
        <Dropdown />
      </el-popover>
      <a href="#" class="navbar__link notif">
        <Icon name="notifications" />
      </a>
      <a href="#" class="navbar__link">
        <Icon name="community" />
      </a>
      <a href="#" class="navbar__link">
        <Icon name="box" />
      </a>
      <a href="#" class="navbar__link">
        <Icon name="list" />
      </a>
      <el-popover class="navbar__popover profile"
        placement="bottom"
        trigger="click">
        <button class="profile__btn" slot="reference" style="width: 70px">
          <div class="profile__avatar" style="width: 21px">
            <Icon name="noPhotoAvatar" />
          </div>
          <i class="el-icon-caret-bottom"></i>
        </button>
        <Dropdown type="exit" />
      </el-popover>
    </nav>
    <div class="app__map-wrapper">
      <button class="app__mapcenter" @click="flyToMapCenter">
        <i class="el-icon-full-screen"></i>
      </button>
      <div id="mapContainer" class="app__map"></div>
      <div class="app__objects-list">
        <Objects-list :loading="loading" />
      </div>
     <div class="app__widget-wrapper" v-if="widgetInfo">
        <div class="app__widget">
          <Widget :source="{
            ...widgetInfo.objects,
            type: 'trafficLight',
            name: 'Светофоры'
          }" />
        </div>
        <div class="app__widget">
          <Widget :source="{
            ...widgetInfo.detectors,
            type: 'detector',
            name: 'Детекторы'
          }" />
        </div>
     </div>
     <Card class="app__card" v-if="activeCardId"/>
    </div>
  </div>
</template>

<script>
import mapboxgl from 'mapbox-gl'
import * as configs from '../../configs'
import jsonToGeojson from '../../helpers/jsonToGeojson'
import createImageFromSvg from '../../helpers/createImageFromSvg'
import Card from '../../components/card/Card.vue'
import Widget from '../../components/widget/Widget.vue'
import Dropdown from '../../components/dropdown/Dropdown.vue'
import ObjectsList from '../../components/objects-list/Objects-list.vue'
import { mapActions, mapMutations, mapState } from 'vuex'

export default {
  components: {
    Dropdown,
    ObjectsList,
    Widget,
    Card
  },
  data () {
    return {
      mapgl: null,
      accessToken: 'pk.eyJ1IjoiYWxla3NhbmRybHVrcyIsImEiOiJja3l3dnI4NHIwYzlrMm9zN2htZnF1b3NiIn0.9n7DQxDRx7rZKdh_KlMX2w',
      sourcesOnMap: [],
      layersOnMap: [],
      loading: false
    }
  },
  computed: {
    ...mapState({
      trafficLights: state => state.trafficLights.data,
      geotrafficLights: state => state.trafficLights.geojson,
      widgetInfo: state => state.summary,
      activeCardId: state => state.activeCardId
    })
  },
  methods: {
    ...mapActions(['getObjects', 'getSummary']),
    ...mapMutations(['SET_ACTIVECARD_ID', 'SET_GEOJSON']),

    async addLayerToMap (layerConfig, sourceConfig) {
      if (sourceConfig) {
        await this[sourceConfig.fetchFn]()
        this.SET_GEOJSON({ data: jsonToGeojson(this[sourceConfig.id], sourceConfig.type), id: sourceConfig.id })
      }

      if (sourceConfig) {
        if (!this.sourcesOnMap.some(src => src.id === sourceConfig.id)) {
          this.sourcesOnMap.push({ id: sourceConfig.id, activeLayerIds: [layerConfig.id] })
          this.mapgl.addSource(sourceConfig.id, {
            type: 'geojson',
            data: this[`geo${sourceConfig.id}`]
          })
        } else {
          this.sourcesOnMap.find(src => src.id === sourceConfig.id).activeLayerIds.push(layerConfig.id)
        }
      }

      if (!this.layersOnMap.some(lyr => lyr.id === layerConfig.id)) {
        this.layersOnMap.push({ isActive: true, ...layerConfig })
      }

      this.mapgl.addLayer(layerConfig)

      this.mapgl.on('click', layerConfig.id, (e) => {
        this.SET_ACTIVECARD_ID(e.features[0].properties.id)
      })

      this.mapgl.on('mouseenter', layerConfig.id, () => {
        this.mapgl.getCanvas().style.cursor = 'pointer'
      })

      this.mapgl.on('mouseleave', layerConfig.id, () => {
        this.mapgl.getCanvas().style.cursor = ''
      })
    },
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
    }
  },
  mounted () {
    this.loading = true
    console.log(true)
    mapboxgl.accessToken = this.accessToken
    this.mapgl = new mapboxgl.Map(configs.maps.baseMap)
    this.mapgl.on('load', async () => {
      await createImageFromSvg(this)
      await this.addLayerToMap(configs.layers.lights, configs.sources.tl)
      this.loading = false
      await this.getSummary()
      this.mapgl.setPaintProperty('tl', 'icon-color', ['match', ['get', 'state'], 2, '#cc8f3d', 3, '#79DB62', 254, '#E35D5D', '#ccc'])
    })
  }
}
</script>

<style lang="scss" src="./app.scss"></style>
