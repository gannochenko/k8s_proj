import { Store } from 'redux';

export interface SplashParameters {
    store: Store;
    unsubscribe: () => void;
}
