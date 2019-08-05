import Vue from 'vue';
import Vuex, { MutationTree } from 'vuex';

Vue.use(Vuex);

interface State {
    componentsconfig: any[];
    qiniutoken: string;
}
interface DragComponentConfig {
    config: any[];
}

const state: State = {
    componentsconfig: [],
    qiniutoken: '',
};
const mutations: MutationTree<State> = {
    ADD_COMPONENTCONFIG(state: State, config: any) {
        state.componentsconfig.push(config);
    },
    EDIT_COMPONENTCONFIG(state: State, { index, config }: any) {
        const prop = state.componentsconfig[index].props;
        state.componentsconfig[index].props = Object.assign(prop, config);
    },
    SET_COMPONENTINFO(state: State, { index, info }: any) {
        state.componentsconfig[index].info = info;
    },
    SET_COMPONENTCONFIG(state: State, { index, config }: any) {
        state.componentsconfig[index].props = config;
    },
    DEL_COMPONENTCONFIG(state: State, index: number) {
        state.componentsconfig.splice(index, 1);
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
};
const actions = {

};

export default new Vuex.Store({
    state,
    mutations,
    actions,
});
