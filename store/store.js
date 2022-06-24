import { configureStore, AnyAction } from '@reduxjs/toolkit';
import reducerCombined from "./rootReducer"
import { createWrapper, HYDRATE } from 'next-redux-wrapper';
import sagaMiddleware, {setupMiddleware} from "./middlewares"


const reducer = (state, action) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state, // use previous state
      ...action.payload, // apply delta from hydration
    };
    return nextState;
  } else {
    return reducerCombined(state, action);
  }
};

export const makeStore = () => {
  const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
      thunk: false
    }).concat(sagaMiddleware),
    devTools: true
  });
  setupMiddleware()
  return store
}




export const wrapper = createWrapper(makeStore, { debug: true });