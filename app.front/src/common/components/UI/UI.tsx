import React, { useEffect, useRef, FunctionComponent } from 'react';
import { Switch } from 'react-router';
import { ConnectedRouter } from 'connected-react-router';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import { withNotification, Modal, ModalContext } from '@bucket-of-bolts/ui';

import { MainProgressBar } from './style';
import { ApplicationProperties } from './type';
import mapDispatchToProps from './dispatch';
import {
    useNetworkMonitor,
    useErrorNotification,
    useNetworkNotification,
} from '../../lib';

import { SHOW_OFFLINE, SHOW_ONLINE } from './reducer';
import { GlobalStyle } from '../../style';

import { HomePage, ForbiddenPage, NotFoundPage } from '../../pages';
import { ObjectLiteral } from '../../../type';

const UIComponent: FunctionComponent<ApplicationProperties> = ({
    ready = false,
    client,
    history,
    theme,
    error = null,
    notify = () => {},
    offline = false,
    dispatch = () => {},
    dispatchLoad = () => {},
}) => {
    useEffect(() => {
        dispatchLoad(client);
    }, [client, dispatchLoad]);

    const modalRef = useRef();

    useNetworkMonitor(dispatch, SHOW_ONLINE, SHOW_OFFLINE);
    useErrorNotification(error, notify);
    useNetworkNotification(offline, notify);

    return (
        <>
            <GlobalStyle />
            <Modal ref={modalRef} theme={theme.modal} active />
            <MainProgressBar observeGlobalLock />
            <ModalContext.Provider value={modalRef}>
                {ready && (
                    <ConnectedRouter history={history}>
                        <Switch>
                            <Route
                                exact
                                path="/"
                                render={route => <HomePage route={route} />}
                            />
                            <Route
                                path="/403"
                                render={() => <ForbiddenPage />}
                            />
                            <Route render={() => <NotFoundPage />} />
                        </Switch>
                    </ConnectedRouter>
                )}
            </ModalContext.Provider>
        </>
    );
};

export const UI = withNotification(
    connect(
        (store: ObjectLiteral) => store.application,
        mapDispatchToProps,
    )(UIComponent),
);
