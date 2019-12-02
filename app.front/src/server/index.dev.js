import http from 'http';
import { app } from './server';

const server = http.createServer(app);
let currentApp = app;
const port = process.env.PORT || process.env.NETWORK__PORT || 3000;
server.listen(port);
// eslint-disable-next-line no-console
console.log(`Bundle is served on port ${port}`);

if (module.hot) {
    module.hot.accept('./server', () => {
        server.removeListener('request', currentApp);
        server.on('request', app);
        currentApp = app;
    });
}
