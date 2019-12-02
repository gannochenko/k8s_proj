import React, { ComponentType } from 'react';

import Axios from 'axios';

import { Settings } from './settings';
// import { createUploadLink } from 'apolloClientInstance-upload-link';
// import { RetryLink } from 'apolloClientInstance-link-retry';
import { Nullable, ObjectLiteral } from '../../type';

type NullableClient = Nullable<Client>;

export const ClientContext = React.createContext<NullableClient>(null);
export const withClient = <L extends { client: NullableClient }>(
    Component: ComponentType<L>,
) => {
    const WithClient = (props: ObjectLiteral) => (
        <ClientContext.Consumer>
            {value => (
                // @ts-ignore
                <Component {...props} client={value} />
            )}
        </ClientContext.Consumer>
    );

    const wrappedComponentName =
        Component.displayName || Component.name || 'Component';

    WithClient.displayName = `withClient(${wrappedComponentName})`;
    return WithClient;
};

export class Client {
    protected settings: Settings;
    protected url = '';

    public constructor(settings: Settings) {
        this.settings = settings;
    }

    public get axios() {
        return Axios;
    }

    public async get(path: string) {
        const url = this.getUrl();
        return Axios.get(`${url}/${path}`);
    }

    public getUrl() {
        if (!this.url) {
            this.url = this.settings.getSync('API__URL');
            if (__DEV__) {
                this.url = this.url.replace(
                    'localhost',
                    document.location.hostname,
                );
            }
        }

        return this.url;
    }
}
