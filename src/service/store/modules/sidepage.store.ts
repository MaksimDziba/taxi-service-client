export interface State {
  type: string;
  show: boolean;
}

export enum MT {
  'SET_SIDE_PAGE' = 'SET_SIDE_PAGE';
  'CLOSE_SIDE_PAGE' = 'CLOSE_SIDE_PAGE';
}

const initialState = () => ({
  type: "",
  show: false,
})

export default {
  namespaced: true,
  state: initialState(),
  mutations: {
    [MT.SET_SIDE_PAGE](state, payload: State) {
      Object.assign(state, payload);
    },
    [MT.CLOSE_SIDE_PAGE](state: State) {
      Object.assign(state, initialState());
    },
  },
  actions: {
    setSidePage({ commit }, payload: State) {
      commit(MT.SET_SIDE_PAGE, payload);
    },
    closeSidePage({ commit } ) {
      commit(MT.CLOSE_SIDE_PAGE);
    },
  },
  modules: {},
};
