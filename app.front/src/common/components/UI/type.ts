import { History } from 'history';
import { ControllerProperties, PageState } from '../../store/type';
import { Nullable } from '../../../type';

export interface ApplicationProperties extends ControllerProperties {
    history: History<any>;
    offline?: boolean;
}

export interface ApplicationState extends PageState {
    offline: Nullable<boolean>;
}
