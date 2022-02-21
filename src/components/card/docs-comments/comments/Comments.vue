<template>
  <div class="comments">
    <div class="comments__top">
      <el-input
        placeholder="Введите текст комментария"
        type="textarea"
        class="comments__input"
        v-model="commentText"></el-input>
      <el-button type="primary" class="comments__send-btn" @click="sendComment()">
        <i class="el-icon-chat-line-round"></i>
      </el-button>
    </div>
    <Comments-List :comments="commentsList" @removeCom="deleteComment" />
    <div class="comments__info" v-if="commentsList.length === 0">Комментарии отсутствуют</div>
  </div>
</template>

<script>
import * as api from '@/api'
import { mapState } from 'vuex'
import CommentsList from './comments-list/Comments-List'

export default {
  components: {
    CommentsList
  },
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
        this.$confirm('Комментарий будет удален, уверены?', 'Внимание!', {
          confirmButtonText: 'Уверен',
          cancelButtonText: 'Пожалуй, что нет',
          type: 'warning'
        }).then(async () => {
          this.$message({
            type: 'success',
            message: 'Комментарий успешно удален'
          })
          await api.docsAndComments.deleteComment(com.resource_id)
          this.commentsList.splice(this.commentsList.findIndex(cl => cl.resource_id === com.resource_id), 1)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: 'Удаление не состоялось'
          })
        })
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
