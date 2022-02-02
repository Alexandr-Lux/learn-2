<template>
  <div class="widget">
    <div class="widget__header">
      <h4 class="widget__title">Светофоры</h4>
      <el-radio-group class="widget__view" v-model="activeView">
        <el-radio-button label="diagram" class="widget__btn">
          <Icon name="diagView" />
        </el-radio-button>
        <el-radio-button label="list" class="widget__btn">
          <Icon name="listView" />
        </el-radio-button>
      </el-radio-group>
    </div>
    <div class="widget__content stat">
      <div class="stat__item">
        <div class="stat__icon">
          <Icon name="trafficLight" />
        </div>
        <div class="stat__count">756</div>
        <div class="stat__status">Работают</div>
      </div>
      <div class="stat__item">
        <div class="stat__icon">
          <Icon name="trafficLight" />
        </div>
        <div class="stat__count">756</div>
        <div class="stat__status">Работают</div>
      </div>
      <div class="stat__item">
        <div class="stat__icon">
          <Icon name="trafficLight" />
        </div>
        <div class="stat__count">756</div>
        <div class="stat__status">Работают</div>
      </div>
    </div>
    <div class="widget__footer"></div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      activeView: 'diagram'
    }
  }
}
</script>

<style lang="scss" src="./widget.scss"></style>
