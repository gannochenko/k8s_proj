import { logError } from '@bucket-of-bolts/util';
import process from 'process';

export const useErrorHandler = app => {
    // catching async unhandled rejections
    process
        // @ts-ignore
        .on('unhandledRejection', error => {
            if (__DEV__) {
                // eslint-disable-next-line no-console
                console.error(error);
            }
            logError('Unhandled rejection', error);
        })
        .on('uncaughtException', error => {
            if (__DEV__) {
                // eslint-disable-next-line no-console
                console.error(error);
            }
            logError('Uncaught exception', error);
        });

    // catching normal unhandled exceptions
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    app.use((error, req, res, next) => {
        logError('Uncaught exception', error);
        return res.send('Nasty error'); // todo: explain here
    });
};
