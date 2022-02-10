import mapboxgl from 'mapbox-gl'
import createImageFromSvg from '@/helpers/createImageFromSvg'
import jsonToGeojson from '@/helpers/jsonToGeojson'
import layerHandlers from '@/helpers/layerHandlers'

export const createMap = (component) => {
  mapboxgl.accessToken = component.accessToken
  component.mapgl = new mapboxgl.Map(component.mapConfig)
}

export const addSourceToMap = async (component, sourceConfig, layerConfig) => {
  await component.getObjects()

  component.SET_GEOJSON({
    data: jsonToGeojson(component[sourceConfig.id]),
    id: sourceConfig.id
  })

  if (!component.sourcesOnMap.some(src => src.id === sourceConfig.id)) {
    component.sourcesOnMap.push({
      id: sourceConfig.id,
      activeLayerIds: [layerConfig.id]
    })
    component.mapgl.addSource(sourceConfig.id, {
      type: 'geojson',
      data: component[`geo${sourceConfig.id}`]
    })
  } else {
    component
      .sourcesOnMap
      .find(src => src.id === sourceConfig.id)
      .activeLayerIds
      .push(layerConfig.id)
  }
}

export const addLayerToMap = async (component, sourceConfig, layerConfig) => {
  await addSourceToMap(component, sourceConfig, layerConfig)

  if (!component.layersOnMap.some(lyr => lyr.id === layerConfig.id)) {
    component.layersOnMap.push({ isActive: true, ...layerConfig })
  }

  component.mapgl.addLayer(layerConfig)

  layerHandlers(component, 'click', layerConfig)
  layerHandlers(component, 'changeCursorOnHover', layerConfig)
}

export const initMap = async (component, sourceConfig, layerConfig) => {
  component.$emit('toggleLoading')
  createMap(component)
  component.mapgl.on('load', async () => {
    await createImageFromSvg(component)
    await addLayerToMap(component, sourceConfig, layerConfig)
    component.$emit('toggleLoading')
  })
}
