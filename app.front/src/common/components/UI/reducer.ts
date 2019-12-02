import { ApplicationState } from './type';
import { Action } from '../../store/type';

export const LOAD = 'application.load';
export const LOAD_SUCCESS = 'application.load.success';
export const LOAD_FAILURE = 'application.load.failure';
export const SHOW_ONLINE = 'application.show-online';
export const SHOW_OFFLINE = 'application.show-offline';

const initialState: ApplicationState = {
    loading: false,
    ready: false,
    error: null,
    offline: null,
};

export const applicationReducer = (
    state: ApplicationState = initialState,
    action: Action,
) => {
    switch (action.type) {
        case LOAD:
            return { ...state, loading: true };
        case LOAD_SUCCESS:
            return {
                ...state,
                loading: false,
                ready: true,
                error: null,
                ...action.payload,
            };
        case LOAD_FAILURE:
            return {
                ...state,
                loading: false,
                ready: true,
                error: action.payload,
            };
        case SHOW_ONLINE:
            return {
                ...state,
                offline: false,
            };
        case SHOW_OFFLINE:
            return {
                ...state,
                offline: true,
            };
        default:
            return state;
    }
};
