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
          <h3 class="profile__title">Текущий профиль</h3>
          <span class="profile__name">Profile Name</span>
          <i class="el-icon-arrow-down"></i>
        </button>
        <Dropdown />
      </el-popover>
      <el-popover class="navbar__popover objects"
        placement="bottom"
        trigger="click">
        <button class="objects__dropdown" slot="reference">
          <Icon name="trafficLight" style="color: #5398E0" />
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
        <Dropdown />
      </el-popover>
    </nav>
    <div class="app__map-wrapper">
      <div id="mapContainer" class="app__map"></div>
      <div class="app__objects-list">
        <Objects-list />
      </div>
     <div class="app__widget-wrapper">
        <div class="app__widget">
          <Widget />
        </div>
        <div class="app__widget">
          <Widget />
        </div>
     </div>
     <Card class="app__card" v-if="actionCardId"/>
    </div>
  </div>
</template>

<script>
import mapboxgl from 'mapbox-gl'
import maps from '../../configs/maps'
import jsonToGeojson from '../../helpers/jsonToGeojson'
import Card from '../../components/card/Card.vue'
import Widget from '../../components/widget/Widget.vue'
import Dropdown from '../../components/dropdown/Dropdown.vue'
import ObjectsList from '../../components/objects-list/Objects-list.vue'
import { mapActions } from 'vuex'

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
      user: null,
      summary: null,
      objects: null,
      actionCardId: null
    }
  },
  methods: {
    ...mapActions(['getObjects']),
    async addLayerToMap (layerConfig, sourceConfig) {
      if (sourceConfig && sourceConfig.url) {
        await this.fetchDataset({ url: sourceConfig.url, id: sourceConfig.id })
        this.SET_GEOJSON({ data: jsonToGeojson(this[sourceConfig.id], sourceConfig.type, sourceConfig.id), id: sourceConfig.id })
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
        this.SET_ACTIVEMODAL({ id: e.features[0].properties.id, type: sourceConfig.id })
      })

      this.mapgl.on('mouseenter', layerConfig.id, () => {
        this.mapgl.getCanvas().style.cursor = 'pointer'
      })

      this.mapgl.on('mouseleave', layerConfig.id, () => {
        this.mapgl.getCanvas().style.cursor = ''
      })
    }
  },
  mounted () {
    mapboxgl.accessToken = this.accessToken
    this.mapgl = new mapboxgl.Map(maps.baseMap)
    this.mapgl.on('load', async () => {
      await this.mapgl.getStyle().layers.filter(lyr => lyr.type === 'symbol')
        .forEach(sl => {
          if (sl.layout['text-field'][0] === 'coalesce') {
            this.mapgl.setLayoutProperty(sl.id, 'text-field', ['coalesce', ['get', 'name_ru'], ['get', 'name']])
          }
        })
      await this.getObjects()
      // this.user = await api.user.getUser().then(res => res.data)
      // this.summary = await api.objects.getSummaryInfo().then(res => res.data)
      // this.objects = await api.objects.getObjects().then(res => res.data)

      // this.mapgl.loadImage(
      //   '../assets/tl.svg',
      //   (error, image) => {
      //     if (error) throw error
      //     this.mapgl.addImage('tl', image)
      //     this.mapgl.addSource('tl', {
      //       type: 'symbol',
      //       data: {
      //         type: 'Feature',
      //         geometry: {
      //           type: 'Point',
      //           coordinates: [39.7405, 54.625]
      //         },
      //         properties: {}
      //       }
      //     })
      //     this.mapgl.addLayer({
      //       id: 'tl',
      //       source: 'tl',
      //       type: 'symbol',
      //       layout: {
      //         'icon-image': 'tl'
      //       }
      //     })
      //   }
      // )
    })
  }
}
</script>

<style lang="scss" src="./app.scss"></style>
