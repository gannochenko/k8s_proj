import { ReactNode } from 'react';

export interface LayoutProperties {
    title: string;
    children: ReactNode;
    actions?: ReactNode;
}
