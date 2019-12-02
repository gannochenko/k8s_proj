import React, { FunctionComponent } from 'react';
import { connect } from 'react-redux';
import { withNotification, withModal } from '@bucket-of-bolts/ui';
import {
    useErrorNotification,
    useDispatchUnload,
    withClient,
    useDispatchLoad,
} from '../../lib';

import { Layout, Button } from '../../components';

import Mushroom from '../../../../public/mushroom.png';
import { CoinRow, Coin, ButtonWrap } from './style';
import { HomePageProperties } from './type';
import { mapDispatchToProps } from './dispatch';
import { ObjectLiteral } from '../../../type';

const HomePageComponent: FunctionComponent<HomePageProperties> = ({
    dispatchLoad,
    dispatchUnload,
    client,
    error,
    notify,
    openConfirmModal,
}) => {
    useDispatchLoad(dispatchLoad, client);
    useDispatchUnload(dispatchUnload);
    useErrorNotification(error, notify);

    return (
        <Layout title="Hello from Front">
            <p>
                This is a demo page. If you see this page, it means that at
                least <code>react</code>, <code>react-router</code>,{' '}
                <code>redux</code> and <code>redux-saga</code> work properly.
            </p>
            <p>
                If you see this big mushroom, it means that static assets are
                being served normally:
                <br />
                <img src="/mushroom.png" width="50" height="50" />
            </p>
            <p>
                And if you see a second big mushroom, that indicates that{' '}
                <code>url-loader</code> plugin works as expected:
                <br />
                <img src={Mushroom} width="50" height="50" />
            </p>
            <p>
                If the following button is gray and shadow-ish, then{' '}
                <code>jss</code> plugin works:
                <br />
                <Button
                    onClick={() => {
                        openConfirmModal(
                            <span>This is how we ask questions.</span>,
                            ({ closeModal }) => {
                                return [
                                    <ButtonWrap key="yes">
                                        <Button
                                            onClick={() => {
                                                closeModal();
                                            }}
                                        >
                                            Yes
                                        </Button>
                                    </ButtonWrap>,
                                    <ButtonWrap key="no">
                                        <Button onClick={closeModal}>No</Button>
                                    </ButtonWrap>,
                                ];
                            },
                        );
                    }}
                >
                    I am a gray button, click me
                </Button>
            </p>
            <p>
                If you see three coins in a row below, then{' '}
                <code>styled-components</code> module is allright:
                <br />
                <CoinRow>
                    <Coin />
                    <Coin />
                    <Coin />
                </CoinRow>
            </p>
            <p>Enjoy!</p>
            <br />
        </Layout>
    );
};

export const HomePage = withModal(
    withNotification(
        withClient(
            connect(
                (state: ObjectLiteral) => state.home,
                mapDispatchToProps,
            )(HomePageComponent),
        ),
    ),
);
