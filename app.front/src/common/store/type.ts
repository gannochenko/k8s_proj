import { History } from 'history';
import { Store } from 'redux';
import { Error, Route, Notify } from '../type';
import { Client } from '../lib';
import { Nullable, ObjectLiteral } from '../../type';

export interface StoreParameters {
    history: History<any>;
    onChange: (parameters: { store: Store; unsubscribe: () => void }) => void;
}

export interface PageState {
    loading: boolean;
    ready: boolean;
    error: Nullable<Error[]>;
}

export interface Action<P = ObjectLiteral> {
    type: string;
    payload: P;
}

export type LoadAction = Action<Partial<{ client: Client }>>;

export interface ControllerProperties {
    ready: boolean;
    client: Client;
    theme: ObjectLiteral;
    error: Nullable<Error[]>;
    dispatch?: (action: Action) => void;
    dispatchLoad?: DispatchLoad;
    dispatchUnload?: DispatchUnload;
    notify: Notify;
}

export interface PageProperties extends ControllerProperties {
    route: Route;
}

export type Dispatch = (action: Action) => void;

export type DispatchLoad = (
    client?: Client,
    parameters?: ObjectLiteral,
) => void;

export type DispatchUnload = () => void;
