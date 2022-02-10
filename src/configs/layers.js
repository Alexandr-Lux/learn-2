export const lights = {
  id: 'tl',
  type: 'symbol',
  source: 'trafficLights',
  name: 'СО',
  layout: {
    'icon-allow-overlap': true,
    'icon-image': 'tl',
    'icon-size': 0.8
  },
  paint: {
    'icon-color': [
      'match',
      ['get', 'state'],
      2,
      '#cc8f3d',
      3,
      '#79DB62',
      254,
      '#E35D5D',
      '#ccc'
    ]
  }
}
