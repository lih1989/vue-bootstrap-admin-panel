import Vue from 'vue'
import Vuex from 'vuex'
import {authRequest} from '@/api/api'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        userInfo: localStorage.getItem('info') ? JSON.parse(localStorage.getItem('info')) : null,
        token: localStorage.getItem('token') ? localStorage.getItem('token') : ''
    },
    mutations: {
        SET_USER_INFO(state, {info = null, token = ''}) {
            state.userInfo = info;
            state.token = token;
        }
    },
    actions: {
        authorization({commit}, data) {
            return authRequest(data).then((result) => {
                if (result.token && result.info) {
                    commit('SET_USER_INFO', result);
                    localStorage.setItem('token', result.token);
                    localStorage.setItem('info', JSON.stringify(result.info));
                    return true
                }
                return false
            });
        },
        logout({commit}) {
            commit('SET_USER_INFO', {});
            localStorage.removeItem('token');
            localStorage.removeItem('info');
        }
    },
    getters: {
        isToken(state) {
            return !!state.token
        },
        userInfo(state) {
            return state.userInfo
        }
    },
    modules: {}
})
