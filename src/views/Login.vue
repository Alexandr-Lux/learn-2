<template>
  <div class="login">
    <el-dialog :visible="errorMessage !== null" :before-close="closeDialog" title="Ошибка" width="30%">
      <span>{{errorMessage}}</span>
    </el-dialog>
    <div class="login__logo prism-wrapper">
      <div class="prism" ref="prism">
        <div class="prism__element prism__element_top"></div>
        <div class="prism__element prism__element_front"></div>
        <div class="prism__element prism__element_back">
          <div class="prism__content" v-if="activeSide === 'recoverPassword'">
            <el-button @click="openForm" type="default" icon="el-icon-back" circle></el-button>
            <h2 class="prism__title">Восстановление пароля</h2>
          </div>
        </div>
        <div class="prism__element prism__element_right"></div>
        <div class="prism__element prism__element_left">
          <div class="prism__content" v-if="activeSide === 'registration'">
            <el-button @click="openForm" type="default" icon="el-icon-back" circle></el-button>
            <h2 class="prism__title">Регистрация</h2>
          </div>
        </div>
        <div class="prism__element prism__element_bottom">
          <img class="login__image" src="../assets/logo.svg" alt="logo">
          <h1 class="login__title">Вход</h1>
          <el-form @submit.native="login($event)" class="login__form form" :model="form">
            <el-form-item class="form__input-wrapper">
              <el-input class="form__input" name="username" v-model="form.name" placeholder="Введите логин"></el-input>
            </el-form-item>
            <el-form-item class="form__input-wrapper">
              <el-input class="form__input" name="password" v-model="form.password" placeholder="Введите пароль" show-password></el-input>
            </el-form-item>
            <el-button-group>
              <el-button @click="register" class="form__help-btn" type="default">Нет аккаунта?</el-button>
              <el-button native-type="submit" class="form__submit-btn" type="primary">Войти</el-button>
              <el-button @click="resetPassword" class="form__help-btn" type="default">Забыл пароль?</el-button>
            </el-button-group>
          </el-form>
        </div>
      </div>
      <el-button :class="['login__enter-btn', {'disable': !btnIsActive }]" @click="openForm" round>Войти</el-button>
    </div>
  </div>
</template>

<script>
import * as api from '../api'

export default {
  data () {
    return {
      form: {
        name: '',
        password: ''
      },
      errorMessage: null,
      activeSide: '',
      btnIsActive: true
    }
  },
  methods: {
    openForm () {
      this.activeSide = ''
      this.$refs.prism.style.transform = 'scale(1) rotateY(-90deg) translateY(100px) rotateX(-225deg) rotateZ(-90deg)'
      this.btnIsActive = false
    },
    register () {
      this.activeSide = 'registration'
      this.$refs.prism.style.transform = 'translateY(100px) rotateX(0deg) rotateY(135deg) '
    },
    resetPassword () {
      this.activeSide = 'recoverPassword'
      this.$refs.prism.style.transform = 'translateY(100px) rotateX(180deg) rotateZ(-180deg) rotateY(45deg)'
    },
    closeDialog () {
      this.errorMessage = null
    },
    async login (e) {
      e.preventDefault()

      if (this.form.name && this.form.password) {
        try {
          const response = await api.auth.getToken({
            username: this.form.name,
            password: this.form.password
          })
          if (!response.data.token) throw new Error('Токен не получен, доступ ограничен')
          if (response.status > 400) throw new Error('Произошла ошибка при создании запроса')
          localStorage.setItem('token', response.data.token)
          this.$router.replace({ name: 'App' })
        } catch (error) {
          console.error(error)
        }
      }
    }
  }
}
</script>

<style lang="scss">
.login {
  background: left / cover url('../assets/login/login-bg.jpg');
  overflow: hidden;
  height: 100%;
  width: 100%;
  position: relative;
  &__image {
    width: 80px;
    margin: 0 auto;
    margin-bottom: 15px;
  }
  &__title {
    font-size: 23px;
    font-weight: 100;
    text-align: center;
    margin-bottom: 15px;
  }
  &__enter-btn {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    &.disable {
      z-index: -10;
    }
  }
}

.form {
  text-align: center;
  &__input-wrapper.el-form-item {
    margin-bottom: 0;
  }
  &__input {
    margin-bottom: 10px;
  }
  & .el-button {
    margin-top: 10px;
    font-family: inherit;
    font-weight: 500;
    font-size: 18px;
    padding: 12px 23px;
  }
  &__help-btn.el-button {
    font-size: 14px;
    padding: 14px 8px;
    font-weight: 300;
    color: #5398E0;
  }
}

.prism-wrapper {
  width: 350px;
  height: 350px;
  margin: 70px auto;
}

.prism {
  width: 100%;
  height: 100%;
  position: relative;
  transform-style: preserve-3d;
  transform: scale(.3) rotateX(-30deg);
  transition: transform 1s ease-out;
  &__title {
    font-size: 23px;
    color: #fff;
    text-align: center;
  }
  &__element {
    position: absolute;
    width: 350px;
    height: 350px;
    padding: 20px;

    &_front{
      background: center / contain url('../assets/login/left.jpg');
      transform: rotateY(-45deg) translateZ(175px);
      border-radius: 5px;
    }
    &_top{
      background: center / contain url('../assets/login/top.jpg');
      height: 350px;
      transform: rotateX(90deg) rotateZ(45deg) translateZ(175px);
      border-radius: 5px;
    }
    &_back{
      background-color: #0079E7;
      transform: rotateY(135deg) translateZ(175px);
      border-radius: 5px;
    }
    &_right{
      background: center / contain url('../assets/login/right.jpg');
      transform: rotateY(45deg) translateZ(175px);
      border-radius: 5px;
    }
    &_left{
      background-color: #0079E7;
      transform: rotateY(-135deg) translateZ(175px);
      border-radius: 5px;
    }
    &_bottom{
      background-color: #eef;
      height: 350px;
      transform: rotateX(-90deg) rotateZ(-45deg) translateZ(175px);
      border-radius: 5px;
    }
  }
}
</style>
