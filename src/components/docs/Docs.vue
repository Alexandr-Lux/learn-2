<template>
  <div class="docs">
    <el-upload
      drag
      multiple
      :http-request="sendDocs"
      class="docs__upload"
      action=""
      :file-list="fileList">
        <i class="el-icon-upload2 docs__upload-icon"></i>
        <div class="docs__upload-wrapper">
          <h3 class="docs__title title-2">Прикрепить файл</h3>
          <div class="docs__text">Перетяните файл в это поле или выберите вручную</div>
        </div>
        <div slot="file" slot-scope="{file}" class="docs__item">
          <i class="el-icon-document docs__doc-icon"></i>
          <span>{{file.name}}</span>
          <button class="docs__btn">
            <i class="el-icon-download"></i>
          </button>
          <button class="docs__btn">
            <i class="el-icon-delete" @click="handleRemove(file)"></i>
          </button>
        </div>
    </el-upload>
    <div class="docs__info" v-if="fileList.length === 0">Файлы отсутствуют</div>
  </div>
</template>

<script>
import * as api from '@/api'
import { mapState } from 'vuex'
export default {
  data () {
    return {
      comment: '',
      fileList: [],
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
      this.fileList = []
      try {
        const { data } = await api.docsAndComments.fetchDocs(id)
        data.forEach(doc => {
          if (!this.fileList.find(fl => fl.resource_id === doc.resource_id)) {
            this.fileList.push({ name: doc.filename, url: doc.path, ...doc })
          }
        })
        this.loadingStatus = false
      } catch (error) {
        console.log(error)
      }
    },
    async handleRemove (file) {
      try {
        await api.docsAndComments.deleteDocs(file.resource_id)
        this.fileList.splice(this.fileList.findIndex(fl => fl.resource_id === file.resource_id), 1)
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
