import { createStore } from "vuex";

import base from "./modules/base.store";
import sidepage from "./modules/sidepage.store";
import table from "./modules/table.store";

export default createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    base,
    sidepage,
    table,
  },
});
