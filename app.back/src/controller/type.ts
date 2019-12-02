import { InputContext as MVCInputContext } from '@bucket-of-bolts/express-mvc';
import { Connection } from 'typeorm';

export interface CustomContext {
    connection: Connection;
}
export type Context = MVCInputContext<CustomContext>;
