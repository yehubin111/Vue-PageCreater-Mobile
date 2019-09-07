import Vue from "vue";
import Vuex, { MutationTree } from "vuex";

Vue.use(Vuex);

interface State {
    usertoken: string;
}

const state: State = {
    usertoken: ""
};
const mutations: MutationTree<State> = {
    SETUSERTOEKN(state, token) {
        state.usertoken = token;
    }
};
const actions = {};

export default new Vuex.Store({
  state,
  mutations,
  actions
});
