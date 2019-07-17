import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

interface State {
    componentsconfig: any[];
}

const state: State = {
    componentsconfig: [],
};
const mutations = {
    // tslint:disable-next-line:no-shadowed-variable
    ADD_COMPONENTCONFIG(state: State, config: any) {
        state.componentsconfig.push(config);
    },
    // tslint:disable-next-line:no-shadowed-variable
    EDIT_COMPONENTCONFIG(state: State, { index, config }: any) {
        const prop = state.componentsconfig[index].props;
        state.componentsconfig[index].props = Object.assign(prop, config);
    },
    // tslint:disable-next-line:no-shadowed-variable
    DEL_COMPONENTCONFIG(state: State, index: number) {
        state.componentsconfig.splice(index, 1);
    },
};
const actions = {

};

export default new Vuex.Store({
    state,
    mutations,
    actions,
});
