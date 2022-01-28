<template>
  <div class="app">
    <nav class="app__navbar navbar">
      <a class="navbar__link" href="https://www.ritm3.ru" target="_blank">
        <img style="width: 21px" class="navbar__link-img" src="../assets/logo.svg" alt="logo">
      </a>
      <el-popover class="navbar__popover"
        placement="bottom"
        trigger="click">
        <button class="navbar__settings-btn" slot="reference">Click to activate</button>
        <Settings />
      </el-popover>
    </nav>
    <div class="app__map-wrapper">
      <div id="mapContainer" class="app__map"></div>
    </div>
  </div>
</template>

<script>
import mapboxgl from 'mapbox-gl'
import maps from '../configs/maps'
// import Card from '../components/Card.vue'
// import Widget from '../components/Widget.vue'
import Settings from '../components/Settings.vue'

export default {
  components: {
    Settings
  },
  data () {
    return {
      mapgl: null,
      accessToken: 'pk.eyJ1IjoiYWxla3NhbmRybHVrcyIsImEiOiJja3l3dnI4NHIwYzlrMm9zN2htZnF1b3NiIn0.9n7DQxDRx7rZKdh_KlMX2w'
    }
  },
  mounted () {
    mapboxgl.accessToken = this.accessToken
    this.mapgl = new mapboxgl.Map(maps.baseMap)
    this.mapgl.on('load', () => {
      this.mapgl.getStyle().layers.filter(lyr => lyr.type === 'symbol')
        .forEach(sl => {
          if (sl.layout['text-field'][0] === 'coalesce') {
            this.mapgl.setLayoutProperty(sl.id, 'text-field', ['coalesce', ['get', 'name_ru'], ['get', 'name']])
          }
        })
    })
  }
}
</script>

<style lang="scss">
  .app {
    display: flex;
    flex-direction: column;
    height: 100vh;
    &__map-wrapper {
      flex: 1;
    }
    &__map {
      height: 100%;
    }
  }
  .navbar {
  background-color: #14181F;
  width: 100%;
  height: 48px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
  &__link {

  }
}
</style>
