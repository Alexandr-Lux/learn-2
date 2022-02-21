<template>
  <div class="infobar" v-if="content">
    <div class="infobar__header">
      <Icon name="trafficLight" style="color: #B4B8BF" />
      <h4 class="infobar__title">СО {{content.id - 4096}}</h4>
      <button class="infobar__target">
        <i class="el-icon-aim"></i>
      </button>
    </div>
    <ul class="infobar__content" style="dispaly:none">
      <li class="infobar__field" v-for="(value, name, i) in properties" :key="i">
        <div class="infobar__prop caption">{{value}}</div>
        <div class="infobar__value" :style="{ color: name === 'state' ? content.info.color : 'inherit'}">
          {{
            value === 'Перекресток' ?
            `${content.street1} - ${content.street2}` :
            content.info[name] ? content.info[name] : 'н/д'
          }}
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import * as configs from '@/configs'

export default {
  data () {
    return {
      properties: configs.cardConfig.props
    }
  },
  props: {
    content: Object
  }
}
</script>

<style lang="scss"  src="./infobar.scss"></style>
