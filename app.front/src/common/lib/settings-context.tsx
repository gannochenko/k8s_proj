import React, { ComponentType } from 'react';
import { Nullable, ObjectLiteral } from '../../type';
import { Settings } from './settings';

type NullableSettings = Nullable<Settings>;

export const SettingsContext = React.createContext<NullableSettings>(null);
export const withSettings = <P extends { settings: NullableSettings }>(
    Component: ComponentType<P>,
) => {
    const WithSettings = (props: ObjectLiteral) => (
        <SettingsContext.Consumer>
            {value => (
                // @ts-ignore
                <Component {...props} settings={value} />
            )}
        </SettingsContext.Consumer>
    );

    const wrappedComponentName =
        Component.displayName || Component.name || 'Component';

    WithSettings.displayName = `withSettings(${wrappedComponentName})`;
    return WithSettings;
};
