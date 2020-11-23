import {createStore} from "redux";
import rootReducer from "./reducers";

export default createStore(rootReducer);

// This example came from https://codesandbox.io/s/9on71rvnyo?file=/src/redux/store.js