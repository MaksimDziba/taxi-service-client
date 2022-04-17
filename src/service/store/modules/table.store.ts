export interface State {
  updateTable: {}
}

export enum MT {
  'IS_UPDATE_TABLE' = 'IS_UPDATE_TABLE';
}

const initialState = () => ({
  updateTable: Math.random()
})

export default {
  namespaced: true,
  state: initialState(),
  mutations: {
    [MT.IS_UPDATE_TABLE](state) {
      Object.assign(state, initialState());
    },
  },
  actions: {
    updateTable({ commit }) {
      commit(MT.IS_UPDATE_TABLE);
    },
  },
  modules: {},
};
