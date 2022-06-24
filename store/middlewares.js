import createSagaMiddleware from "redux-saga";
import rootSaga from "./rootSaga";

const sagaMiddleware = createSagaMiddleware();

/**
 * Setup and return all middlewares needed for the development
 */


/**
 * Setup middlewares
 *
 * This must be run after the [redux#applyMiddleware] function
 */
export const setupMiddleware = () => {
  sagaMiddleware.run(rootSaga);
};

const middlewares = [sagaMiddleware];

export default middlewares;
