<template>
  <ul class="comments">
    <li class="comments__item" v-for="(com, i) in comments" :key="i">
      <div class="comments__author">{{com.author_name}}</div>
      <div class="comments__created caption">{{formatDate(com.created_at)}}</div>
      <div class="comments__text">{{com.text}}</div>
      <el-tooltip class="comments__tooltip" effect="dark" content="Удалить комментарий" placement="top-start" :open-delay="500">
        <button class="comments__remove" @click="$emit('removeCom', com)">
          <i class="el-icon-delete"></i>
        </button>
      </el-tooltip>
    </li>
  </ul>
</template>

<script>
import { formatDate } from '@/helpers/dates.js'
export default {
  props: {
    comments: Array
  },
  methods: {
    formatDate
  }
}
</script>

<style lang="scss" scoped src="./comments-list.scss"></style>
