import { takeLatest, put } from 'redux-saga/effects';
import * as reducer from './reducer';
import { LoadAction } from '../../store/type';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function* load(action: LoadAction) {
    try {
        const user = {};
        yield put({ type: reducer.LOAD_SUCCESS, payload: { user } });
    } catch (error) {
        yield put({ type: reducer.LOAD_FAILURE, payload: error });
        if (__DEV__) {
            console.error(error);
        }
    }
}

export const applicationSaga = function* watcher() {
    // @ts-ignore
    yield takeLatest(reducer.LOAD, load);
};
