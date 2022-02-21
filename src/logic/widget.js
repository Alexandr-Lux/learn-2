export default class Widget {
  constructor (component) {
    this.component = component
  }

  async initWidgets () {
    await this.component.getSummary()
  }
}
