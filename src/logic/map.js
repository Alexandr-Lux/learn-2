import mapboxgl from 'mapbox-gl'
import { createImageFromSvg } from '@/helpers/icons'
import { jsonToGeojson } from '@/helpers/data'
import { layerHandlers } from '@/helpers/handlers'

export default class Map {
  constructor (component, sourceConfig, layerConfig) {
    this.component = component
    this.sourceConfig = sourceConfig
    this.layerConfig = layerConfig
  }

  async initMap () {
    this.component.$emit('toggleLoading')
    this.createMap(this.component)
    this.component.mapgl.on('load', async () => {
      await createImageFromSvg(this.component)
      await this.addLayerToMap(this.component, this.sourceConfig, this.layerConfig)
      this.component.$emit('toggleLoading')
    })
  }

  createMap () {
    mapboxgl.accessToken = this.component.accessToken
    this.component.mapgl = new mapboxgl.Map(this.component.mapConfig)
  }

  async addSourceToMap () {
    await this.component.getObjects()

    this.component.SET_GEOJSON({
      data: jsonToGeojson(this.component[this.sourceConfig.id]),
      id: this.sourceConfig.id
    })

    if (!this.component.sourcesOnMap.some(src => src.id === this.sourceConfig.id)) {
      this.component.sourcesOnMap.push({
        id: this.sourceConfig.id,
        activeLayerIds: [this.layerConfig.id]
      })
      this.component.mapgl.addSource(this.sourceConfig.id, {
        type: 'geojson',
        data: this.component[`geo${this.sourceConfig.id}`]
      })
    } else {
      this.component
        .sourcesOnMap
        .find(src => src.id === this.sourceConfig.id)
        .activeLayerIds
        .push(this.layerConfig.id)
    }
  }

  async addLayerToMap () {
    await this.addSourceToMap(this.component, this.sourceConfig, this.layerConfig)

    if (!this.component.layersOnMap.some(lyr => lyr.id === this.layerConfig.id)) {
      this.component.layersOnMap.push({ isActive: true, ...this.layerConfig })
    }

    this.component.mapgl.addLayer(this.layerConfig)

    layerHandlers(this.component, 'click', this.layerConfig)
    layerHandlers(this.component, 'mouseHandlers', this.layerConfig)
  }
}
