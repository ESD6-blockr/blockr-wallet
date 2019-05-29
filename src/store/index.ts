import { applyMiddleware, createStore, Middleware, Store } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { IRootState, rootReducer } from "../reducers";

const configureStore = (initialState?: IRootState): Store<IRootState | undefined> => {
    const middlewares: Middleware[] = [thunk];
    const enhancer = composeWithDevTools(applyMiddleware(...middlewares));
    return createStore(rootReducer, initialState!, enhancer);
};

const store = configureStore();

if (typeof module.hot !== "undefined") {
    module.hot.accept("../reducers", () =>
        store.replaceReducer(require("../reducers").rootReducer),
    );
}

export default store;
