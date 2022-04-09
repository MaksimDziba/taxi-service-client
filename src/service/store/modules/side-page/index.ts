import { InjectionKey } from "vue";
import { createStore, Store } from "vuex";

export interface State {
  sidePage: String;
  show: Boolean;
}

export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  state: {
    sidePage: "",
    show: false,
  },
});

import { CounterStateTypes } from "./../../interfaces";

export const state: CounterStateTypes = {
  counter: 0,
};

// store/modules/counter/action-types.ts
export enum ActionTypes {
  GET_COUNTER = "GET_COUNTER",
}

// store/modules/counter/mutation-types.ts
export enum MutationTypes {
  SET_COUNTER = "SET_COUNTER",
  RESET_COUNTER = "RESET_COUNTER",
}

// store/modules/counter/getters.ts

import { GetterTree } from "vuex";
import {
  CounterGettersTypes,
  CounterStateTypes,
  IRootState,
} from "./../../interfaces";

export const getters: GetterTree<CounterStateTypes, IRootState> &
  CounterGettersTypes = {
  counterValue: (state: CounterStateTypes) => {
    return state.counter || 0;
  },
  doubledCounter: (state: CounterStateTypes) => {
    return state.counter || 0 * 2;
  },
};

// store/modules/counter/mutations.ts
import { MutationTree } from "vuex";
import { MutationTypes } from "./mutation-types";
import { CounterMutationsTypes, CounterStateTypes } from "./../../interfaces";

export const mutations: MutationTree<CounterStateTypes> &
  CounterMutationsTypes = {
  [MutationTypes.SET_COUNTER](state: CounterStateTypes, payload: number) {
    state.counter = payload;
  },
  [MutationTypes.RESET_COUNTER](state: CounterStateTypes) {
    state.counter = 0;
  },
};

// store/modules/counter/actions.ts
import { ActionTree } from "vuex";
import { ActionTypes } from "./action-types";
import { MutationTypes } from "./mutation-types";
import {
  CounterActionsTypes,
  CounterStateTypes,
  IRootState,
} from "@/store/interfaces";

export const actions: ActionTree<CounterStateTypes, IRootState> &
  CounterActionsTypes = {
  [ActionTypes.GET_COUNTER]({ commit }, payload: number) {
    commit(MutationTypes.SET_COUNTER, payload);
  },
};

// store/modules/counter/index.ts
import { Module } from "vuex";
import { CounterStateTypes, IRootState } from "@/store/interfaces";
import { getters } from "./getters";
import { actions } from "./actions";
import { mutations } from "./mutations";
import { state } from "./state";

// Module
const counter: Module<CounterStateTypes, IRootState> = {
  state,
  getters,
  mutations,
  actions,
};

export default counter;
