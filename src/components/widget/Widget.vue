<template>
  <div class="widget" v-if="source">
    <div class="widget__header">
      <h4 class="widget__title">{{source.name}}</h4>
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
        <div class="stat__icon green">
          <Icon :name="source.type"/>
        </div>
        <div class="stat__count title-1">{{source.working || source.active}}</div>
        <div class="stat__status caption">Работают</div>
      </div>
      <div class="stat__item">
        <div class="stat__icon red">
          <Icon :name="source.type" />
        </div>
        <div class="stat__count title-1">{{source.errors || source.nn}}</div>
        <div class="stat__status caption">Ошибка</div>
      </div>
    </div>
    <div class="widget__footer"></div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      activeView: 'list'
    }
  },
  props: {
    source: Object
  },
  computed: {
    ...mapState({
      widget: state => state.summary
    })
  }
}
</script>

<style lang="scss" src="./widget.scss"></style>
