import '@babel/polyfill';
import React from 'react';
import { render } from 'react-dom';
// eslint-disable-next-line import/no-extraneous-dependencies
import { AppContainer } from 'react-hot-loader';
import { Application } from '../common/Application';

render(
    <AppContainer>
        <Application />
    </AppContainer>,
    document.getElementById('root'),
);

if (module.hot) {
    module.hot.accept('../common/Application', () => {
        render(
            <AppContainer>
                <Application />
            </AppContainer>,
            document.getElementById('root'),
        );
    });
}
