import { Commit, Dispatch } from 'vuex';

import { logoutUser } from '../../../api/auth';
import StorageService from '../../../service/storage.service';

export interface State {
  user: null | Record<string, any>;
  token: null | string;
}

export enum MT {
  'SET_TOKEN' = 'SET_TOKEN',
  'SET_USER' = 'SET_USER',
}

const initialState = () => ({
  user: null,
  token: null,
});

export default {
  namespaced: true,
  state: initialState(),
  mutations: {
    [MT.SET_TOKEN](state: State, token: string) {
      state.token = token;
    },
    [MT.SET_USER](state: State, user: Record<string, any>) {
      state.user = user;
    },
  },
  actions: {
    async setToken({ commit }: { commit: Commit }, token: string) {
      commit(MT.SET_TOKEN, token);

      await StorageService.token.set(token);
    },
    async setUser({ commit }: { commit: Commit }, user: Record<string, any>) {
      commit(MT.SET_USER, user);

      await StorageService.user.set(user);
    },
    async checkAuth({ dispatch }: { dispatch: Dispatch }) {
      try {
        const token = (await StorageService.token.get()) || '';
        const user = (await StorageService.user.get()) || {};

        if (token) {
          dispatch('setToken', token);
        }

        if (user?.id) {
          dispatch('setUser', user);
        }

        return token;
      } catch (error) {
        throw new Error(error);
      }
    },
    async logout({ dispatch }: { dispatch: Dispatch }) {
      try {
        await StorageService.token.set('');
        await StorageService.user.set('');

        dispatch('setToken', null);
        dispatch('setUser', {});

        logoutUser();
      } catch (error) {
        throw new Error(error);
      }
    },
  },
  modules: {},
};
