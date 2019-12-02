import { LOAD } from './reducer';
import { Dispatch } from '../../store/type';
import { Client } from '../../lib';

export default (dispatch: Dispatch) => ({
    dispatch,
    dispatchLoad: (client: Client) =>
        dispatch({
            type: LOAD,
            payload: {
                client,
            },
        }),
});
