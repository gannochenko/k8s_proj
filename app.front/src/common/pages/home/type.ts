import { ReactNode } from 'react';
import { PageProperties, PageState } from '../../store/type';

export interface HomePageProperties extends PageProperties {
    openConfirmModal: (
        text: ReactNode,
        onAction: (parameters: { closeModal: () => void }) => void,
    ) => void;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface HomePageState extends PageState {}
