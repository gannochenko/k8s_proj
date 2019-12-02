import React, { useRef, FunctionComponent } from 'react';
import { Provider } from 'react-redux';
import { Notification, NotificationContext } from '@bucket-of-bolts/ui';

import { UI } from './components';
import { ThemeContext, theme } from './style';
import {
    Settings,
    Client,
    ClientContext,
    createHistory,
    dismissOnReady,
} from './lib';
import { createStore } from './store';

const history = createHistory();
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { store, saga, unsubscribe } = createStore({
    history,
    onChange: dismissOnReady,
});
const settings = new Settings();
const client = new Client(settings);

export const Application: FunctionComponent = () => {
    const notificationRef = useRef();

    return (
        <ThemeContext.Provider value={theme}>
            <ClientContext.Provider value={client}>
                <Provider store={store}>
                    <Notification
                        ref={notificationRef}
                        theme={theme.notifications}
                    />
                    <NotificationContext.Provider value={notificationRef}>
                        <UI history={history} theme={theme} client={client} />
                    </NotificationContext.Provider>
                </Provider>
            </ClientContext.Provider>
        </ThemeContext.Provider>
    );
};
