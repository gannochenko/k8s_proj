export class Settings {
    public getSync(name: string, defaultValue?: any) {
        if (!window.process) {
            return defaultValue;
        }

        const value = window.process.env[name];
        if (value === null || value === undefined) {
            return defaultValue;
        }

        return value;
    }
}
