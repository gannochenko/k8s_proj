import cors from 'cors';

export const useCORS = (app, settings) => {
    let corsHosts = settings.getSync('NETWORK__CORS', []);
    if (corsHosts) {
        corsHosts = corsHosts
            .toString()
            .split(',')
            .map(host => host.trim());
    }

    if (corsHosts.length) {
        app.use(
            cors({ origin: corsHosts.length === 1 ? corsHosts[0] : corsHosts }),
        );
    }
};
