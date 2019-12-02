import React, { FunctionComponent } from 'react';

import { ButtonContainer } from './style';

import { Props } from './type';

export const Button: FunctionComponent<Props> = ({ children, onClick }) => {
    return <ButtonContainer onClick={onClick}>{children}</ButtonContainer>;
};
