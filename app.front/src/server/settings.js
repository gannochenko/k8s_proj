import process from 'process';

export class Settings {
    getSync(name, defaultValue) {
        // here we can obtain name from any source (Redis, HashiCorp Consul, etc), but by default - from process.env
        const value = process.env[name];
        if (value === null || value === undefined) {
            return defaultValue;
        }

        return value;
    }
}
