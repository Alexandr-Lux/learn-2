<template>
  <table class="table">
    <thead>
      <tr>
        <th v-for="(title, i) in titles" :key="i">{{title}}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(row, i) in content.data" :key="i">
        <td v-for="(value, i) in row" :key="i">{{i === 1 || i === 2 ? getTableValue(value, i) : value}}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import * as configs from '@/configs'
export default {
  data () {
    return {
      titles: configs.tableConfig.titles,
      tableData: null
    }
  },
  props: {
    content: Object
  },
  methods: {
    getTableValue (value, index) {
      switch (index) {
        case 1: return configs.cardConfig.source[value]
        case 2: return configs.cardConfig.state[value]
      }
    }
  }
}
</script>

<style lang="scss"  src="./table.scss"></style>
