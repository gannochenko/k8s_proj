import express from 'express';
// import React from 'react';
import helmet from 'helmet';
import path from 'path';
import { useErrorHandler } from './error-handler';

import { useCORS } from './cors';
import { Settings } from './settings';
import { Template } from './template';

// import { renderToString } from 'react-dom/server';
// import Application from "../common/Application";

const settings = new Settings();

export const app = express();
// eslint-disable-next-line react-hooks/rules-of-hooks
useErrorHandler(app);

const host = settings.getSync('NETWORK__HOST', 'localhost');
const port = process.env.PORT || settings.getSync('NETWORK__PORT', 3000);

app.set('host', host);
app.set('port', port);

// eslint-disable-next-line react-hooks/rules-of-hooks
useCORS(app, settings);
app.use(helmet());
app.use(express.static(path.join(process.cwd(), 'public')));

app.get('/health', (req, res) => {
    res.send('1');
});

const template = new Template(settings);

// todo: use renderer here
app.get('*', async (req, res) => {
    // todo: ssr is not ready yet
    // const application = renderToString(<Application />);

    // todo: use cache here
    res.send(await template.get());
});
