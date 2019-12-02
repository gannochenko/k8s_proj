import styled from 'styled-components';
import {
    rectangle,
    align,
    backgroundCover,
} from '@bucket-of-bolts/styled-companion';
import CoinImg from '../../../../public/coin.png';

export const CoinRow = styled.div`
    ${rectangle('3rem', '5rem')}
    ${align('center', 'center')}
    border: 1px solid gray;
    border-radius: 3px;
`;

export const Coin = styled.div`
    ${rectangle('1rem')}
    ${backgroundCover(CoinImg)}
`;

export const ButtonWrap = styled.div`
    display: inline-block;
`;
