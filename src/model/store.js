import { createStore } from "redux";
import rootReducer from "./reducers";
import { loadState, saveState } from "../module/localStorage"
const persistentState = loadState()
const store = createStore(rootReducer,
    persistentState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

store.subscribe(() => {
    saveState(store.getState())
})

export default store;
