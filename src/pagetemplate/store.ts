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
    },
    OUTTOAST(state, value) {
        (<any>this._vm).$toast(value);
    }
};
const actions = {};

export default new Vuex.Store({
    state,
    mutations,
    actions
});
