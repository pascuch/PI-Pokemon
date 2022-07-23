import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "../reducers/reducers";
import thunk from "redux-thunk";

// const store = createStore(
//     rootReducer,
//     compose(applyMiddleware(thunk), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()));

const store = createStore(
    rootReducer,
    compose(applyMiddleware(thunk)));

export default store;