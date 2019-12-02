import { logInfo } from '@bucket-of-bolts/util';
import { app } from './server';

const host = app.get('host');
const port = app.get('port');

app.listen({ port }, () => {
    logInfo(`🚀 Front is ready at http://${host}:${port}`);
});
