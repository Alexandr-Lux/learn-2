<template>
  <div class="comments">
    <div class="comments__header">
      <el-input
        placeholder="Введите текст комментария"
        type="textarea"
        class="comments__input"
        v-model="commentText"></el-input>
      <el-button type="primary" class="comments__send-btn" @click="sendComment()">
        <i class="el-icon-chat-line-round"></i>
      </el-button>
    </div>
    <ul class="comments__list">
      <li class="comments__item" v-for="(com, i) in commentsList" :key="i">
        <div class="comments__author">{{com.author_name}}</div>
        <div class="comments__created caption">{{formatDate(com.created_at)}}</div>
        <div class="comments__text">{{com.text}}</div>
        <button class="comments__remove" @click="deleteComment(com)">
          <i class="el-icon-delete"></i>
        </button>
      </li>
    </ul>
    <div class="comments__info" v-if="commentsList.length === 0">Комментарии отсутствуют</div>
  </div>
</template>

<script>
import * as api from '@/api'
import { mapState } from 'vuex'
export default {
  data () {
    return {
      commentText: '',
      commentsList: [],
      loadingStatus: false
    }
  },
  computed: {
    ...mapState({
      cardId: state => state.activeCardId
    })
  },
  methods: {
    async getComments (id) {
      this.loadingStatus = true
      this.commentsList = []
      try {
        const { data } = await api.docsAndComments.fetchComments(id)
        data.forEach(com => {
          if (!this.commentsList.find(cl => cl.resource_id === com.resource_id)) {
            this.commentsList.push(com)
          }
        })
        this.loadingStatus = false
      } catch (error) {
        console.log(error)
      }
    },
    async deleteComment (com) {
      try {
        await api.docsAndComments.deleteComment(com.resource_id)
        this.commentsList.splice(this.commentsList.findIndex(cl => cl.resource_id === com.resource_id), 1)
      } catch (error) {
        console.log(error)
      }
    },
    async sendComment () {
      if (this.commentText) {
        try {
          await api.docsAndComments.sendComment({ id: this.cardId, text: this.commentText })
          await this.getComments(this.cardId)
        } catch (error) {
          console.log(error)
        }
      }
      this.commentText = ''
    },
    formatDate (ms) {
      const date = new Date(ms)
      return `${date.getDate()}.` +
             `${date.getMonth() < 9 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1}.` +
             `${date.getFullYear()} -  ` +
             `${date.getHours() < 10 ? '0' + date.getHours() : date.getHours()}:` +
             `${date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()}`
    }
  },
  watch: {
    cardId (curId) {
      this.getComments(curId)
    },
    loadingStatus () {
      this.$emit('comments-loading')
    }
  },
  mounted () {
    this.getComments(this.cardId)
  }
}
</script>

<style lang="scss"  src="./comments.scss"></style>
