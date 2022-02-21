const iconSize = 40
const icons = [
  {
    name: 'tl',
    imageUrl: require('@/assets/app/tl.svg')
  }
]

export const createImageFromSvg = async (component) => {
  await Promise.all(
    icons.map(({ name, imageUrl }) => {
      return new Promise(resolve => {
        const image = new Image(iconSize, iconSize)
        image.crossOrigin = 'Anonymous'
        image.style.backgroundPosition = '50%, 50%'
        image.style.backgroundSize = '100%'
        image.addEventListener('load', () => {
          component.mapgl.addImage(name, image, { sdf: true })
          resolve()
        })
        image.src = imageUrl
      })
    })
  )
  return console.log('Удачно')
}
