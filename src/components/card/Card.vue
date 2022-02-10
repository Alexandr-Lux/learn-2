<template>
  <div class="card" v-if="cardContent">
    <button class="card__close" @click="SET_ACTIVECARD_ID(null)">
      <i class="el-icon-close"></i>
    </button>
    <div class="card__wrapper">
      <div class="card__infobar infobar">
        <div class="infobar__header">
          <Icon name="trafficLight" style="color: #B4B8BF" />
          <h4 class="infobar__title">СО {{cardContent.id - 4096}}</h4>
          <div class="infobar__target-icon">
            <i class="el-icon-aim"></i>
          </div>
        </div>
        <div class="infobar__content" style="dispaly:none">
          <div class="infobar__field" v-for="(value, name, i) in properties" :key="i">
            <div class="infobar__prop caption">{{value}}</div>
            <div class="infobar__value" :style="{ color: name === 'state' ? cardContent.info.color : 'inherit'}">
              {{
                value === 'Перекресток' ?
                `${cardContent.street1} - ${cardContent.street2}` :
                cardContent.info[name] ? cardContent.info[name] : 'н/д'
              }}
            </div>
          </div>
        </div>
      </div>
      <div class="card__body">
        <el-tabs class="card__tabs" type="border-card">
          <el-tab-pane label="Журнал" class="card__tab-item">
<!-- Убрать style -->
            <div class="journal">
              <div class="journal__settings">
                <div class="journal__subtitle">Показать за период:</div>
                <el-radio-group class="journal__timegap" v-model="period">
                  <el-radio-button label="week" class="journal__time-item">Неделя</el-radio-button>
                  <el-radio-button label="month" class="journal__time-item">Месяц</el-radio-button>
                  <el-radio-button label="day" class="journal__time-item">Сутки</el-radio-button>
                  <el-radio-button label="set" class="journal__time-item">Заданный период</el-radio-button>
                </el-radio-group>
                <div class="journal__period" v-if="period === 'set'">
                  <div class="journal__prop caption">Начало</div>
                  <el-date-picker
                    class="journal__datepicker"
                    v-model="beginPeriod"
                    type="datetime"
                    prefix-icon="el-icon-date">
                  </el-date-picker>
                  <div class="journal__prop caption">Окончание</div>
                  <el-date-picker
                    class="journal__datepicker"
                    v-model="endPeriod"
                    type="datetime"
                    prefix-icon="el-icon-date">
                  </el-date-picker>
                </div>
              </div>
              <div class="journal__controls">
                <div class="journal__download subtitle-1">
                  <i class="el-icon-download"></i>
                  <span class="journal__download-text">Выгрузить журнал в файл</span>
                </div>
                <el-radio-group class="journal__switch-obj" v-model="toggleObj">
                  <el-radio-button label="tl">Светофоры</el-radio-button>
                  <el-radio-button label="dt">Детекторы</el-radio-button>
                </el-radio-group>
              </div>
              <div class="journal__content">
                <table class="journal__table">
                  <thead>
                    <tr>
                      <th>Дата</th>
                      <th>Время</th>
                      <th>Источник состояния</th>
                      <th>Состояние объекта</th>
                      <th>Дополнительно</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>24.10.2020</td>
                      <td>15:36:25</td>
                      <td>Локальный режим работы</td>
                      <td>Локальный режим работы</td>
                      <td>В координации</td>
                    </tr>
                    <tr>
                      <td>24.10.2020</td>
                      <td>15:22:14</td>
                      <td></td>
                      <td>Программа АПП - фаза</td>
                      <td></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="Документы и комментарии" class="card__docs docs">
<!-- Убрать style -->
            <el-upload
              style="display: none"
              class="docs__upload"
              drag
              multiple
              action="https://jsonplaceholder.typicode.com/posts/"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :file-list="fileList">
              <i class="el-icon-upload2"></i>
              <span class="el-upload__text">Перетяните файл в это поле или <em>выберите вручную</em></span>
              <div slot="file" slot-scope="{file}" class="docs__content" :src="file.url">
              </div>
            </el-upload>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import * as api from '@/api'
import * as configs from '@/configs'
import { mapMutations, mapState } from 'vuex'

export default {
  data () {
    return {
      period: '',
      toggleObj: 'tl',
      fileList: [],
      cardContent: null,
      properties: configs.cardConfig.props
    }
  },
  computed: {
    ...mapState({
      trafficLights: state => state.trafficLights.data,
      activeCardId: state => state.activeCardId
    })
  },
  methods: {
    ...mapMutations(['SET_ACTIVECARD_ID']),
    handlePreview () {},
    handleRemove () {},
    async fillCardContent () {
      const res = await api.objects.fetchObjInfo(this.activeCardId)
      const data = res.data.object[0]
      this.cardContent = {
        ...data,
        info: {
          color: configs.cardConfig.color[data.state],
          mode: configs.cardConfig.mode[data.mode],
          state: configs.cardConfig.state[data.state],
          source: configs.cardConfig.source[data.source],
          DKType: 'Протокол «Мегаполис» | TCP/IP'
        }
      }
    }
  },
  watch: {
    async activeCardId () {
      await this.fillCardContent()
    }
  },
  async mounted () {
    await this.fillCardContent()
  }
}
</script>

<style lang="scss" src="./card.scss"></style>
