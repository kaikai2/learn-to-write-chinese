import { createStore } from "redux";
import rootReducer from "./reducers";
import { loadState, saveState } from "../module/localStorage"
import throttle from 'lodash/throttle'


const persistentState = loadState()
const store = createStore(rootReducer,
    persistentState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

store.subscribe(throttle(() => {
    saveState(store.getState())
}, 1000))

export default store;
