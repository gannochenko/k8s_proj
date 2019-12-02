import React, { FunctionComponent } from 'react';
import { VerticalTriplet } from '@bucket-of-bolts/ui';

import { Top, Footer, Logo, Header, Title, Central } from './style';
import { LayoutProperties } from './type';

export const Layout: FunctionComponent<LayoutProperties> = ({
    children,
    title = 'Untitled page',
}) => (
    <VerticalTriplet
        top={
            <Top>
                <Central>
                    <Logo to="/">
                        <div>L</div>
                    </Logo>
                </Central>
            </Top>
        }
        bottom={
            <Footer>
                <Central>&copy; 2020 &laquo;Front&raquo; team</Central>
            </Footer>
        }
    >
        <Central>
            <Header>
                <Title>{title}</Title>
            </Header>
            {children}
        </Central>
    </VerticalTriplet>
);
