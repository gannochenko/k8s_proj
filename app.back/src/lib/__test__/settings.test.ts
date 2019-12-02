import { Settings } from '../settings';

jest.mock('process', () => ({
    env: {
        SOME_VARIABLE: '123',
    },
}));

describe('Settings', () => {
    let settings: Settings;

    beforeAll(() => {
        settings = new Settings();
    });

    it('should get the variable from process.env', async () => {
        expect(await settings.get('SOME_VARIABLE')).toEqual('123');
    });

    it('get the default value', async () => {
        expect(await settings.get('ABSENT_VARIABLE', 'default-value')).toEqual(
            'default-value',
        );
    });
});
