import { MigrationInterface, QueryRunner } from 'typeorm';
import { logInfo } from '@bucket-of-bolts/util';
import process from 'process';

/**
 * https://github.com/typeorm/typeorm/blob/master/docs/migrations.md
 */
export class Seed1517934720430 implements MigrationInterface {
    public async up(queryRunner: QueryRunner) {
        await queryRunner.connection.synchronize(false);

        if (process.env.NODE_ENV === 'development') {
            // do some seeding for development
        }

        logInfo('🌱 Seed migration applied');
    }

    // eslint-disable-next-line no-empty-function,@typescript-eslint/no-empty-function
    public async down() {}
}
