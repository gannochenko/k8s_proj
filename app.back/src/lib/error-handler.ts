import { Request, Response, Express, NextFunction } from 'express';
import { logError } from '@bucket-of-bolts/util';
import process from 'process';

export const useErrorHandler = (app: Express) => {
    // catching async unhandled rejections
    process
        // @ts-ignore
        .on('unhandledRejection', (error: Error) => {
            if (__DEV__) {
                // eslint-disable-next-line no-console
                console.error(error);
            }
            logError('Unhandled rejection', error as Error);
        })
        .on('uncaughtException', (error: Error) => {
            if (__DEV__) {
                // eslint-disable-next-line no-console
                console.error(error);
            }
            logError('Uncaught exception', error);
        });

    // catching normal unhandled exceptions
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
        logError('Uncaught exception', error);
        return res.send('Nasty error'); // todo: explain here
    });
};
