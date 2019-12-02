import styled from 'styled-components';
import {
    align,
    rectangle,
    group,
    central,
} from '@bucket-of-bolts/styled-companion';
import { Link } from 'react-router-dom';
import { withTheme } from '../../style';

export const Top = styled.div`
    min-height: 3rem;
    border-bottom: 1px solid gray;
`;

export const Footer = withTheme(styled.div`
    border-top: 1px solid gray;
    font-size: ${props => props.theme.font.xSmall};
`);

export const Logo = styled(Link)`
    ${rectangle('2rem')}
    ${align('center', 'center')}
    border: 1px solid gray;
    border-radius: 5px;
    text-decoration: none;
    color: gray;
`;

export const Header = styled.div`
    margin-bottom: 1rem;
    ${align('top', 'left')}
    ${group(null, '1rem')}
`;

export const Title = styled.div`
    font-size: 1.5rem;
    flex-grow: 2;
`;

export const Central = styled.div`
    ${central()};
    width: 100%;
    padding: 1rem;
`;
