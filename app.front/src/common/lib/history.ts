import { createBrowserHistory, createMemoryHistory } from 'history';

export const createHistory = (url?: string) => {
    return __CLIENT__
        ? createBrowserHistory()
        : createMemoryHistory({
              initialEntries: url ? [url] : [],
          });
};
