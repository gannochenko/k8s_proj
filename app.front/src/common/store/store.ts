import {
    applyMiddleware,
    compose,
    createStore as createReduxStore,
    combineReducers,
} from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import createSagaMiddleware from 'redux-saga';
import { fork, all } from 'redux-saga/effects';
import logger from 'redux-logger';

import reducers from './reducers';
import sagas from './sagas';
import { StoreParameters } from './type';

export const createStore = ({ history, onChange }: StoreParameters) => {
    const saga = createSagaMiddleware();
    const middleware = [routerMiddleware(history), saga];
    if (__DEV__) {
        middleware.push(logger);
    }
    const store = createReduxStore(
        combineReducers({
            // @ts-ignore
            router: connectRouter(history),
            ...reducers,
        }),
        {},
        compose(applyMiddleware(...middleware)),
    );
    saga.run(function* rootSaga() {
        yield all(sagas.map(sagaItem => fork(sagaItem)));
    });

    let unsubscribe = () => {};
    if (typeof onChange === 'function') {
        unsubscribe = store.subscribe(() => {
            onChange({ store, unsubscribe });
        });
    }

    return { store, saga, unsubscribe };
};
