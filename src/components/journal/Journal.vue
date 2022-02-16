<template>
  <div class="journal">
    <div class="journal__settings">
      <div class="journal__subtitle">Показать за период:</div>
      <el-radio-group class="journal__times" v-model="period">
        <el-radio-button :label="-1" class="journal__time-interval">Сутки</el-radio-button>
        <el-radio-button :label="-7" class="journal__time-interval">Неделя</el-radio-button>
        <el-radio-button :label="-30" class="journal__time-interval">Месяц</el-radio-button>
        <el-radio-button label="set" class="journal__time-interval">Заданный период</el-radio-button>
      </el-radio-group>
      <div class="journal__period" v-if="period === 'set'">
        <div class="journal__prop caption">Начало</div>
        <el-date-picker
          :picker-options="{
            firstDayOfWeek: 1,
            disabledDate: dateLimit
          }"
          size="small"
          class="journal__datepicker"
          v-model="beginPeriod"
          type="date"
          prefix-icon="el-icon-date">
        </el-date-picker>
      </div>
      <div class="journal__period" v-if="beginPeriod">
        <div class="journal__prop caption">Окончание</div>
        <el-date-picker
          :picker-options="{
            firstDayOfWeek: 1,
            disabledDate: dateLimit
          }"
          size="small"
          class="journal__datepicker"
          v-model="endPeriod"
          type="date"
          prefix-icon="el-icon-date">
        </el-date-picker>
      </div>
    </div>
    <div class="journal__controls">
      <button class="journal__download subtitle-1">
        <i class="el-icon-download"></i>
        <span class="journal__download-text">Выгрузить журнал в файл</span>
      </button>
      <el-radio-group class="journal__switch-obj" v-model="objSwitcher">
        <el-radio-button label="tl">Светофоры</el-radio-button>
        <el-radio-button label="dt">Детекторы</el-radio-button>
      </el-radio-group>
    </div>
    <Icon name="spinner" v-if="loading" class="journal__loading loading" />
    <Table :content="journalData" class="journal__content" v-if="!loading && journalData" />
  </div>
</template>

<script>
import Table from '@/components/table/Table.vue'
import * as api from '@/api'
import transformDate from '@/helpers/transformDate.js'
import { mapState } from 'vuex'
export default {
  components: {
    Table
  },
  data () {
    return {
      period: '',
      beginPeriod: '',
      endPeriod: '',
      objSwitcher: '',
      journalData: null,
      loading: false
    }
  },
  computed: {
    ...mapState({
      cardId: state => state.activeCardId
    })
  },
  methods: {
    dateLimit (date) {
      const nowDate = new Date()
      return nowDate < date || date <= this.beginPeriod
    },
    async getJournalForPeriod (period) {
      this.loading = true
      try {
        this.journalData = await api.journal.fetchJournal(this.cardId, period)
          .then(res => {
            if (res.data.journal[0]) res.data.journal[0].data.reverse()

            return res.data.journal[0]
          })
        this.loading = false
      } catch (error) {
        console.log(error)
      }
    }
  },
  watch: {
    period (value) {
      if (typeof value === 'number') {
        this.getJournalForPeriod(value)
      }
    },
    endPeriod () {
      this.getJournalForPeriod(transformDate(this.beginPeriod, this.endPeriod))
    },
    objSwitcher (value) {
      // console.log(value)
    },
    cardId () {
      this.period = -7
      this.objSwitcher = 'tl'
      this.getJournalForPeriod(this.period)
    }
  },
  async mounted () {
    this.period = -7
    this.objSwitcher = 'tl'
    this.getJournalForPeriod(this.period)
  }
}
</script>

<style lang="scss"  src="./journal.scss"></style>
