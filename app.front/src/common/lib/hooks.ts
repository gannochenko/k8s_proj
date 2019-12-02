import { useEffect } from 'react';
import { DispatchUnload, DispatchLoad, Dispatch } from '../store/type';
import { Error, Notify } from '../type';
import { Nullable } from '../../type';
import { Client } from './client';

export const useNetworkMonitor = (
    dispatch: Dispatch,
    actionOnline: string,
    actionOffline: string,
) => {
    useEffect(() => {
        const onOnline = () => {
            dispatch({ type: actionOnline, payload: {} });
        };
        const onOffline = () => {
            dispatch({ type: actionOffline, payload: {} });
        };

        window.addEventListener('online', onOnline);
        window.addEventListener('offline', onOffline);

        return () => {
            window.removeEventListener('online', onOnline);
            window.removeEventListener('offline', onOffline);
        };
    }, [actionOffline, actionOnline, dispatch]);
};

export const useErrorNotification = (
    errors: Nullable<Error[]>,
    notify: Notify,
) => {
    useEffect(() => {
        if (errors) {
            const error = errors.shift();
            if (error) {
                notify({
                    text: error.message,
                    type: 'error',
                    code: 'error',
                });
            }
        }
    }, [errors, notify]);
};

export const useDispatchLoad = (
    dispatchLoad?: DispatchLoad,
    client?: Client,
) => {
    useEffect(() => {
        if (dispatchLoad) {
            dispatchLoad(client);
        }
    }, [dispatchLoad, client]);
};

export const useDispatchUnload = (dispatchUnload?: DispatchUnload) => {
    useEffect(
        () => () => {
            if (dispatchUnload) {
                dispatchUnload();
            }
        },
        [dispatchUnload],
    );
};

export const useNetworkNotification = (
    offline: Nullable<boolean>,
    notify: Notify,
) => {
    useEffect(() => {
        if (offline === true) {
            notify({
                text: 'We are trying to fix the connection',
                icon: 'cloud_off',
                code: 'connection_error',
                closeable: false,
            });
        } else if (offline === false) {
            notify({
                text: 'We are back on-line!',
                icon: 'cloud_queue',
                code: 'connection_error',
                closeable: true,
                lifeTime: 3000,
            });
        }
    }, [notify, offline]);
};
