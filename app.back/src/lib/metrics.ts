import { Express, NextFunction, Request, Response } from 'express';
import promClient from 'prom-client';
import responseTime from 'response-time';
import { logInfo } from '@bucket-of-bolts/util';

/**
 * A counter that counts the invocations of the different HTTP verbs
 * e.g. a GET and a POST call will be counted as 2 different calls
 */
const numOfRequests = new promClient.Counter({
    name: 'numOfRequests',
    help: 'Number of requests made',
    labelNames: ['method'],
});

/**
 * A counter that counts the invocations with different paths
 * e.g. /foo and /bar will be counted as 2 different paths
 */
const pathsTaken = new promClient.Counter({
    name: 'pathsTaken',
    help: 'Paths taken in the app',
    labelNames: ['path'],
});

/**
 * A summary to record the HTTP method, path, response code and response time
 */
const responses = new promClient.Summary({
    name: 'responses',
    help: 'Response time in millis',
    labelNames: ['method', 'path', 'status'],
});

/**
 * Increments the counters that are executed on the request side of an invocation
 * Currently it increments the counters for numOfPaths and pathsTaken
 */
const requestCounters = (req: Request, res: Response, next: NextFunction) => {
    if (req.path !== '/metrics' && req.path !== '/health') {
        numOfRequests.inc({ method: req.method });
        pathsTaken.inc({ path: req.path });
    }
    next();
};

/**
 * Increments the counters that are executed on the response side of an invocation
 * Currently it updates the responses summary
 */
const responseCounters = responseTime((req, res, time) => {
    if (
        req.url !== '/metrics' &&
        req.url !== '/health' &&
        req.method &&
        req.url &&
        res.statusCode
    ) {
        responses
            .labels(req.method, req.url, res.statusCode.toString())
            .observe(time);
    }
});

/**
 * Start the collection of metrics and should be called from within in the main js file
 */
export const startCollection = () => {
    logInfo(
        'Starting the collection of metrics, the metrics are available on /metrics',
    );
    return promClient.collectDefaultMetrics();
};

export const useMetrics = (app: Express) => {
    app.use(requestCounters);
    app.use(responseCounters);

    app.get('/metrics', (req, res) => {
        res.set('Content-Type', promClient.register.contentType);
        res.end(promClient.register.metrics());
    });

    return startCollection();
};
