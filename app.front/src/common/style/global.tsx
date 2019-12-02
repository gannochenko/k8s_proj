import React, { ComponentType, forwardRef, Ref } from 'react';
import { createGlobalStyle } from 'styled-components';
import { fontMaterialIcons } from '@bucket-of-bolts/styled-companion';
import { ObjectLiteral } from '../../type';

type Theme = ObjectLiteral;
type RefUnknown = Ref<unknown>;

export const ThemeContext = React.createContext<Theme>({});
export const withTheme = (
    Component: ComponentType<{ ref?: RefUnknown; theme?: Theme }>,
    path = '',
) => {
    const WithTheme = (props: ObjectLiteral, ref: RefUnknown) => (
        <ThemeContext.Consumer>
            {value => (
                <Component
                    {...props}
                    ref={ref}
                    theme={path.length ? value[path] : value}
                />
            )}
        </ThemeContext.Consumer>
    );

    const wrappedComponentName =
        Component.displayName || Component.name || 'Component';

    WithTheme.displayName = `withTheme(${wrappedComponentName})`;

    const WithThemeAndRef = forwardRef(WithTheme);

    return WithThemeAndRef;
};

export const GlobalStyle = withTheme(createGlobalStyle`
    ${({ theme }: { theme: Theme }) => `
        ${fontMaterialIcons()}
        body {
            color: ${theme.body.color};
            background-color: ${theme.body.background.color};
        }
    `}
`);
