<template>
  <div class="hint" :style="{ top: `${config.canvasPos.y - 155}px`, left: `${config.canvasPos.x - 255}px` }">
    <h3 class="hint__title title-2">{{'Cветофорный объект №' + (config.objectInfo.id - 4096)}}</h3>

    <div class="hint__field" v-for="(value, name, i) in params.hintFields" :key="i">
      <div class="hint__prop caption">{{value}}</div>
      <div class="hint__value" :style="{ color: name === 'state' ? params.color[config.objectInfo[name]] : 'inherit'}">
        {{
          value === 'Перекресток' ?
          `${config.objectInfo.street1} - ${config.objectInfo.street2}` :
          config.objectInfo[name] ? params[name][config.objectInfo[name]] : 'н/д'
        }}
      </div>
    </div>
  </div>
</template>

<script>
import * as configs from '@/configs'
export default {
  props: {
    config: Object
  },
  data () {
    return {
      params: configs.cardConfig
    }
  }
}
</script>

<style lang="scss"  src="./hint.scss"></style>
