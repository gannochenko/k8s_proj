import { SplashParameters } from './type';

declare const window: CustomWindow;
interface CustomWindow extends Window {
    splash?: {
        dismiss: () => void;
    };
    splashProgressBarUnlocked: boolean;
}

export const dismissOnReady = ({ store, unsubscribe }: SplashParameters) => {
    if (window.splash) {
        const state = store.getState();
        if (state.application.ready) {
            const pageCodes = Object.keys(state);
            for (let i = 0; i < pageCodes.length; i += 1) {
                const pageCode = pageCodes[i];
                if (pageCode !== 'application' && state[pageCode].ready) {
                    window.splash.dismiss();
                    window.splashProgressBarUnlocked = true;
                    unsubscribe();
                    break;
                }
            }
        }
    } else {
        unsubscribe();
    }
};
