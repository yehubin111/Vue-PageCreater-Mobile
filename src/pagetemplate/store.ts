import Vue from "vue";
import Vuex, { MutationTree } from "vuex";

Vue.use(Vuex);

type StateName = 'openSafari';
interface State {
    openSafari: boolean
}
interface SetParams {
    key: StateName
    value: any
}

const state: State = {
    openSafari: false
};
const mutations: MutationTree<State> = {
    SETSTATE(state, { key, value }: SetParams) {
        state[key] = value;
    }
};
const actions = {};

export default new Vuex.Store({
    state,
    mutations,
    actions
});
