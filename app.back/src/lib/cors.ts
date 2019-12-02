import cors from 'cors';
import { Express } from 'express';
import { Settings } from './settings';

export const useCORS = async (app: Express, settings: Settings) => {
    let corsHosts = await settings.get('NETWORK__CORS', []);
    if (corsHosts) {
        corsHosts = corsHosts
            .toString()
            .split(',')
            .map((host: string) => host.trim());
    }

    if (corsHosts.length) {
        app.use(
            cors({ origin: corsHosts.length === 1 ? corsHosts[0] : corsHosts }),
        );
    }
};
