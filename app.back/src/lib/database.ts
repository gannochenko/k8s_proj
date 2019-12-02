import { Connection, createConnection } from 'typeorm';
import { injectPassword } from '@bucket-of-bolts/util';
import { DatabaseOptions } from './type';
import * as entities from '../model';
import { ObjectLiteral } from '../type';

export class Database {
    private readonly options: DatabaseOptions;
    private connections: ObjectLiteral<Connection> = {};

    public constructor(parameters: DatabaseOptions) {
        this.options = parameters;
    }

    public async getConnection(name = 'default') {
        if (this.connections[name]) {
            return this.connections[name];
        }

        const { settings } = this.options;

        const url = (await settings.get('DATABASE__URL', '')) as string;
        const password = (await settings.get(
            'DATABASE__PASSWORD',
            '',
        )) as string;
        if (!url) {
            throw new Error('DB__URL not defined');
        }

        const connection = await createConnection({
            ...this.options,
            url: injectPassword(url, password),
            type: 'postgres',
            entities: Object.values(entities),
            name: name || 'default',
        });

        this.connections[name] = connection;

        return connection;
    }
}
