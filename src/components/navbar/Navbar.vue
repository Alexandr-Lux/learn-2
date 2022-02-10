<template>
  <nav class="navbar">
    <a class="navbar__link" href="https://www.ritm3.ru" target="_blank">
      <img style="width: 21px" class="navbar__link-img" src="../../assets/app/logo.png" alt="logo">
    </a>
    <el-popover class="navbar__popover profile"
      placement="bottom"
      trigger="click">
      <button class="profile__content" slot="reference">
        <h3 class="profile__title caption">Текущий профиль</h3>
        <span class="profile__name">Profile Name</span>
        <i class="el-icon-arrow-down"></i>
      </button>
      <Dropdown />
    </el-popover>
    <el-popover class="navbar__popover objects"
      placement="bottom"
      trigger="click">
      <button class="objects__dropdown" slot="reference">
        <Icon name="trafficLight" />
        <span>Светофорные объекты</span>
        <i class="el-icon-caret-bottom"></i>
      </button>
      <Dropdown />
    </el-popover>
    <a href="#" :class="['navbar__link', `${navIcon.class}`]" v-for="(navIcon, i) in navBarIcons" :key="i">
      <Icon :name="navIcon.name" />
    </a>
    <el-popover class="navbar__popover profile"
      placement="bottom"
      trigger="click">
      <button class="profile__btn" slot="reference" style="width: 70px">
        <div class="profile__avatar" style="width: 21px">
          <Icon name="noPhotoAvatar" />
        </div>
        <i class="el-icon-caret-bottom"></i>
      </button>
      <Dropdown type="exit" />
    </el-popover>
  </nav>
</template>

<script>
import Dropdown from '@/components/dropdown/Dropdown.vue'
import navBarIcons from '@/configs/navbarIcons'

export default {
  data () {
    return {
      navBarIcons
    }
  },
  components: {
    Dropdown
  }
}
</script>

<style lang="scss"  src="./navbar.scss">
</style>
