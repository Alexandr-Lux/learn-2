<template>
  <div class="card">
    <button class="card__close">
        <i class="el-icon-close"></i>
      </button>
    <div class="card__wrapper">
      <div class="card__infobar infobar">
        <div class="infobar__header">
          <Icon name="trafficLight" style="color: #B4B8BF" />
          <h4 class="infobar__title">СО №1263</h4>
          <div class="infobar__target-icon">
            <i class="el-icon-aim"></i>
          </div>
        </div>
        <div class="infobar__content">
          <div class="infobar__prop">Перекресток</div>
          <div class="infobar__value">ул. Ленина – ул. Введенская</div>
          <div class="infobar__prop">Режим управления</div>
          <div class="infobar__value">План координации / суточный график</div>
          <div class="infobar__prop">Состояние</div>
          <div class="infobar__value">Фаза</div>
          <div class="infobar__prop">Источник</div>
          <div class="infobar__value">Сетевой адаптер / центр</div>
          <div class="infobar__prop">Команда управления</div>
          <div class="infobar__value">н/д</div>
          <div class="infobar__prop">Тип ДК</div>
          <div class="infobar__value">Протокол «Мегаполис» | TCP/IP</div>
        </div>
      </div>
      <div class="card__body">
        <el-tabs class="card__tabs" type="border-card">
          <el-tab-pane label="Журнал" class="card__tab-item">
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
                  <div class="journal__prop">Начало</div>
                  <el-date-picker
                    class="journal__datepicker"
                    v-model="beginPeriod"
                    type="datetime"
                    prefix-icon="el-icon-date">
                  </el-date-picker>
                  <div class="journal__prop">Окончание</div>
                  <el-date-picker
                    class="journal__datepicker"
                    v-model="endPeriod"
                    type="datetime"
                    prefix-icon="el-icon-date">
                  </el-date-picker>
                </div>
              </div>
              <div class="journal__controls">
                <div class="journal__download">
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
            <el-upload
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
                <!-- <div ></div> -->
              </div>
            </el-upload>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      period: '',
      toggleObj: 'tl',
      fileList: []
    }
  },
  methods: {
    handlePreview () {
      console.log(this.fileList)
    },
    handleRemove () {
      console.log(2)
    }
  }
}
</script>

<style lang="scss" src="./card.scss"></style>
