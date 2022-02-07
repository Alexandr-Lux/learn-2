export default function (json, type) {
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
