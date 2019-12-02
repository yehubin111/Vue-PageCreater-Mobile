import Vue from "vue";
import Vuex, { MutationTree } from "vuex";
import { Config } from '@/pagecreater/type';
// import VuexPersistence from "vuex-persist";
// const vuexLocal: any = new VuexPersistence({
//   storage: window.localStorage
// });

Vue.use(Vuex);

interface State {
    componentsconfig: Config[];
    qiniutoken: string;
    dragStatus: boolean
}

const state: State = {
    componentsconfig: [],
    qiniutoken: '',
    dragStatus: false
};
const mutations: MutationTree<State> = {
    ADD_COMPONENTCONFIG(state, config: Config) {
        state.componentsconfig.push(config);
    },
    EDIT_COMPONENTCONFIG(state, { index, config }) {
        const obj = (<any>this._vm).$iLocal(state.componentsconfig, index);
        const prop = obj.props;
        obj.props = Object.assign(prop, config);
    },
    SET_COMPONENTINFO(state, { index, info }) {
        (<any>this._vm).$iLocal(state.componentsconfig, index).info = info;
    },
    SET_COMPONENTCONFIG(state, { index, config }) {
        (<any>this._vm).$iLocal(state.componentsconfig, index).props = config;
    },
    DEL_COMPONENTCONFIG(state, index) {
        (<any>this._vm).$iLocal(state.componentsconfig, index, 'del');
    },
    DRAG_COMPONENTCONFIG(state, { config }) {
        state.componentsconfig = config;
    },
    EDITINIT(state, { config }) {
        state.componentsconfig = config;
    },
    SET_QINIUTOKEN(state, token) {
        state.qiniutoken = token;
    },
    CHANGE_DRAGGERSTATUS(state, status) {
        console.log(status);
        state.dragStatus = status;
    }
};
const actions = {};

export default new Vuex.Store({
  state,
  mutations,
  actions
  //   plugins: [vuexLocal.plugin]
});
