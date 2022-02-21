<template>
  <ul class="docs">
    <li class="docs__item" v-for="(file, i) in files" :key="i">
      <i class="el-icon-document docs__doc-icon"></i>
      <span class="docs__text">{{file.filename}}</span>
      <button class="docs__btn">
        <i class="el-icon-download"></i>
      </button>
      <el-tooltip class="comments__tooltip" effect="dark" content="Удалить файл" placement="top-start" :open-delay="500">
        <button class="docs__btn" @click="$emit('removeDoc', file.resource_id)">
          <i class="el-icon-delete"></i>
        </button>
      </el-tooltip>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    files: Array
  }
}
</script>

<style lang="scss" scoped src="./files-list.scss"></style>
