import Vue from 'vue'
import Vuex from 'vuex'
import * as api from '../api'
import * as configs from '../configs'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    trafficLights: {
      data: null,
      geojson: null
    },
    filterText: '',
    summary: null,
    activeCardId: null
  },
  getters: {
    filterObjects: state => {
      return state.trafficLights.data.filter(tl => {
        return String(tl.id).includes(state.filterText) || String(tl.id - 4096).includes(state.filterText)
      })
    }
  },
  mutations: {
    SET_TRAFFIC_LIGHTS (state, payload) {
      state.trafficLights.data = payload.map(tl => {
        tl.info = {
          color: configs.cardConfig.color[tl.state],
          mode: configs.cardConfig.mode[tl.mode],
          state: configs.cardConfig.state[tl.state],
          loading: false
        }
        return tl
      })
    },
    SET_WIDGET (state, payload) {
      state.summary = payload
    },
    SET_GEOJSON (state, payload) {
      state[payload.id].geojson = payload.data
    },
    SET_ACTIVECARD_ID (state, payload) {
      state.activeCardId = payload
    },
    FILTER_OBJECTS (state, payload) {
      state.filterText = payload
    }
  },
  actions: {
    async getObjects ({ commit }) {
      try {
        const { data } = await api.objects.fetchObjects()
        commit('SET_TRAFFIC_LIGHTS', data)
      } catch (error) {
        console.log(error)
      }
    },
    async getSummary ({ commit }) {
      try {
        const { data } = await api.objects.fetchSummaryInfo()
        commit('SET_WIDGET', data)
      } catch (error) {
        console.log(error)
      }
    }
  }
})
