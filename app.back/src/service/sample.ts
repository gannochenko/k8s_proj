import { Connection } from 'typeorm';
import { SampleEntity } from '../model';

import { ObjectLiteral } from '../type';

export class SampleService {
    private connection: Connection;

    constructor(connection: Connection) {
        this.connection = connection;
    }

    public async getById(id: string) {
        const repository = this.connection.getRepository(SampleEntity);
        return repository.findOne(id);
    }

    public async create(data: ObjectLiteral) {
        const repository = this.connection.getRepository(SampleEntity);
        const item = repository.create(data);

        await repository.save(item);

        return item;
    }
}
