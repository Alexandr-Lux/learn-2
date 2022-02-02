import Vue from 'vue'
import Vuex from 'vuex'
import * as api from '../api'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    objects: null,
    summary: null
  },
  mutations: {
    SET_OBJ (state, { objects, summary }) {
      state.objects = objects.data
      state.summary = summary.data
    },
    SET_GEOJSON (state, payload) {
      state.objects = payload
    }
  },
  actions: {
    async getObjects ({ commit }) {
      try {
        const objects = await api.objects.fetchObjects()
        const summary = await api.objects.fetchSummaryInfo()
        commit('SET_OBJ', { objects, summary })
      } catch (error) {
        console.log(error)
      }
    }
  }
})
