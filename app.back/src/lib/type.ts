import { EntitySchema } from 'typeorm';

import { Settings } from './settings';

export interface DatabaseOptions {
    settings: Settings;
    entities?: EntitySchema[];
}
