export default (target, event, ...args) => {
  const handlers = {
    click: () => {
      target.mapgl.on('click', args[0].id, (e) => {
        target.SET_ACTIVECARD_ID(e.features[0].properties.id)
      })
    },
    changeCursorOnHover: () => {
      target.mapgl.on('mouseenter', args[0].id, () => {
        target.mapgl.getCanvas().style.cursor = 'pointer'
      })

      target.mapgl.on('mouseleave', args[0].id, () => {
        target.mapgl.getCanvas().style.cursor = ''
      })
    }
  }

  return handlers[event]()
}
