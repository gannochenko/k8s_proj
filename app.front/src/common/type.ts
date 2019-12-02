import { Scalar } from '../type';

export interface Error {
    message: string;
    code: string;
}

// there is no Route type in react-router :(
export interface RouteLocationSearch {
    [key: string]: Scalar;
}

export interface RouteLocation {
    search?: RouteLocationSearch;
}

export interface Route {
    location: RouteLocation;
}

export interface ErrorMessage {
    text: string;
    type?: string;
    code?: string;
    icon?: string;
    closeable?: boolean;
    lifeTime?: number;
}

export type Notify = (message: ErrorMessage) => void;
