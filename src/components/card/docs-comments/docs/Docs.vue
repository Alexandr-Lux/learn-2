<template>
  <div class="docs">
    <el-upload
      drag
      multiple
      :show-file-list="false"
      :http-request="sendDocs"
      class="docs__upload"
      action="">
        <i class="el-icon-upload2 docs__upload-icon"></i>
        <div class="docs__upload-wrapper">
          <h3 class="docs__title title-2">Прикрепить файл</h3>
          <div class="docs__upload-text">Перетяните файл в это поле или выберите вручную</div>
        </div>
    </el-upload>
    <Files-List :files="docsList" @removeDoc="removeDoc" />
    <div class="docs__info" v-if="docsList.length === 0">Файлы отсутствуют</div>
  </div>
</template>

<script>
import * as api from '@/api'
import { mapState } from 'vuex'
import FilesList from './files-list/Files-List.vue'

export default {
  components: {
    FilesList
  },
  data () {
    return {
      docsList: [],
      period: '',
      loadingStatus: false
    }
  },
  computed: {
    ...mapState({
      cardId: state => state.activeCardId
    })
  },
  methods: {
    async getDocs (id) {
      this.loadingStatus = true
      this.docsList = []
      try {
        const { data } = await api.docsAndComments.fetchDocs(id)
        data.forEach(resDoc => {
          if (!this.docsList.find(doc => doc.resource_id === resDoc.resource_id)) {
            this.docsList.push(resDoc)
          }
        })
        this.loadingStatus = false
      } catch (error) {
        console.log(error)
      }
    },
    async removeDoc (id) {
      try {
        this.$confirm('Файл будет удален, уверены?', 'Внимание!', {
          confirmButtonText: 'Уверен',
          cancelButtonText: 'Пожалуй, что нет',
          type: 'warning'
        }).then(async () => {
          this.$message({
            type: 'success',
            message: 'Файл успешно удален'
          })
          await api.docsAndComments.deleteDocs(id)
          this.docsList.splice(this.docsList.findIndex(doc => doc.resource_id === id), 1)
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
    async sendDocs (file) {
      const formData = new FormData()

      formData.append('file', file.file)
      formData.append('id', this.cardId)

      try {
        await api.docsAndComments.sendDocs(formData)
        await this.getDocs(this.cardId)
      } catch (error) {
        console.log(error)
      }
    },
    handlerFileUpload () {
      console.log(123123)
    }
  },
  watch: {
    cardId (curId) {
      this.getDocs(curId)
    },
    loadingStatus () {
      this.$emit('docs-loading')
    }
  },
  mounted () {
    this.getDocs(this.cardId)
  }
}
</script>

<style lang="scss"  src="./docs.scss"></style>
