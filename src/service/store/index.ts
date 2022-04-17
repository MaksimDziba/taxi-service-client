import { createStore } from "vuex";
// import modules from "./modules"; // import the auto exporter

import sidepage from "./modules/sidepage.store";
import table from "./modules/table.store";

export default createStore<State>({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    sidepage,
    table,
  },
});
