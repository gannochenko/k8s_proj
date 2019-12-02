import { LOAD, UNLOAD } from './reducer';
import { Dispatch } from '../../store/type';
import { Client } from '../../lib';

export const mapDispatchToProps = (dispatch: Dispatch) => ({
    dispatchLoad: (client: Client) =>
        dispatch({
            type: LOAD,
            payload: {
                client,
            },
        }),
    dispatchUnload: () =>
        dispatch({
            type: UNLOAD,
            payload: {},
        }),
});
