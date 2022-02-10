export default function (json) {
  return {
    type: 'FeatureCollection',
    features: json.map(obj => {
      return {
        geometry: obj.geom,
        type: 'Feature',
        properties: {
          ...obj
        }
      }
    })
  }
}
