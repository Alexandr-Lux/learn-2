export const layerHandlers = (target, event, ...args) => {
  const handlers = {
    click: () => {
      target.mapgl.on('click', args[0].id, (e) => {
        target.SET_ACTIVECARD_ID(e.features[0].properties.id)
      })
    },
    mouseHandlers: () => {
      target.mapgl.on('mousemove', args[0].id, (e) => {
        target.mapgl.getCanvas().style.cursor = 'pointer'
        console.log()
        target.hint = {
          canvasPos: e.point,
          objectInfo: e.features[0].properties
        }
      })

      target.mapgl.on('mouseleave', args[0].id, () => {
        target.mapgl.getCanvas().style.cursor = ''
        target.hint = null
      })
    }
  }

  return handlers[event]()
}
