<template>
  <div class="objects-list__wrapper">
    <div class="objects-list__loading" v-if="loading">
      <Icon name="spinner" class="objects-list__spinner"/>
    </div>
    <div class="objects-list">
      <div class="objects-list__search">
        <el-input
          v-if="trafficLights"
          v-model="filterText"
          placeholder="Поиск">
          <i slot="prefix" class="el-icon-search"></i>
        </el-input>
      </div>
      <ul class="objects-list__list" v-if="trafficLights">
        <li
          class="objects-list__item obj"
          v-for="obj in filterObjects"
          :key="obj.id"
          @click="SET_ACTIVECARD_ID(obj.id)">
          <Icon name="trafficLight" class="obj__icon" :style="{ color: obj.info.color }" />
          <div class="obj__title">CO {{obj.id - 4096}}</div>
          <div class="obj__id">id:{{obj.id}}</div>
          <div class="obj__mode">{{ obj.mode === 1 ? 'K' : '-'}}</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapState } from 'vuex'
export default {
  props: {
    loading: Boolean
  },
  computed: {
    ...mapState({
      trafficLights: state => state.trafficLights.data,
      searchText: state => state.filterText
    }),
    ...mapGetters(['filterObjects']),
    filterText: {
      get () {
        return this.searchText
      },
      set (value) {
        this.FILTER_OBJECTS(value)
      }
    }
  },
  methods: {
    ...mapMutations(['SET_ACTIVECARD_ID', 'FILTER_OBJECTS'])
  },
  mounted () {
    console.log(this.loading)
  }
}
</script>

<style lang="scss" src="./objects-list.scss"></style>
