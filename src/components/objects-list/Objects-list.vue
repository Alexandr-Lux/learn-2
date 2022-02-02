<template>
  <div class="objects-list">
    <div class="objects-list__search">
      <i class="el-icon-search"></i>
      <span>Поиск</span>
    </div>
    <ul class="objects-list__list">
      <li class="objects-list__item obj" v-for="(obj, ndx) in objects" :key="obj.id">
        <Icon name="trafficLight" class="obj__icon" />
        <div class="obj__title">CO {{ndx + 1}}</div>
        <div class="obj__id">id:{{obj.id}}</div>
        <div class="obj__mode">{{ obj.mode === 1 ? 'K' : '-'}}</div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState({
      objects: state => state.objects
    })
  }
}
</script>

<style lang="scss" src="./objects-list.scss"></style>
