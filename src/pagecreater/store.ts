import Vue from 'vue';
import Vuex, { MutationTree } from 'vuex';

Vue.use(Vuex);

interface State {
    componentsconfig: any[];
    qiniutoken: string;
    dragStatus: boolean;
}
interface DragComponentConfig {
    config: any[];
}

const state: State = {
    componentsconfig: [],
    qiniutoken: '',
    dragStatus: false,
};
const mutations: any = {
    ADD_COMPONENTCONFIG(state: State, config: any) {
        state.componentsconfig.push(config);
    },
    EDIT_COMPONENTCONFIG(state: State, { index, config }: any) {
        const obj = this._vm.$iLocal(state.componentsconfig, index);
        const prop = obj.props;
        obj.props = Object.assign(prop, config);
    },
    SET_COMPONENTINFO(state: State, { index, info }: any) {
        state.componentsconfig[index].info = info;
    },
    SET_COMPONENTCONFIG(state: State, { index, config }: any) {
        state.componentsconfig[index].props = config;
    },
    DEL_COMPONENTCONFIG(state: State, index: number) {
        this._vm.$iLocal(state.componentsconfig, index, 'del');
    },
    DRAG_COMPONENTCONFIG(state: State, { config }: DragComponentConfig) {
        state.componentsconfig = config;
    },
    EDITINIT(state: State, { config }: DragComponentConfig) {
        state.componentsconfig = config;
    },
    SET_QINIUTOKEN(state: State, token: string) {
        state.qiniutoken = token;
    },
    CHANGE_DRAGGERSTATUS(state: State, status: boolean) {
        console.log(status);
        state.dragStatus = status;
    }
};
const actions = {

};

export default new Vuex.Store({
    state,
    mutations,
    actions,
});
