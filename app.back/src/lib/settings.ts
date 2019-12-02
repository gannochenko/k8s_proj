import process from 'process';

export class Settings {
    public async get(name: string, defaultValue?: any) {
        // here we can obtain name from any source (Redis, HashiCorp Consul, etc), but by default - from process.env
        const value = process.env[name];
        if (value === null || value === undefined) {
            return defaultValue;
        }

        return value;
    }
}
