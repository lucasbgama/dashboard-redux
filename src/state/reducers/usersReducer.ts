import { User } from "../../api";
import { ActionTypes } from "../action-types";
import { Action } from "../actions";


interface UserState {
    list: User[];
    isFetching: boolean;
}

const initialState: UserState = {
    list: [],
    isFetching: false,
};

const reducer = (state: UserState = initialState, action: Action) => {
    switch(action.type) {
        case ActionTypes.FETCH:
            return { ...state, isFetching: true };
        case ActionTypes.UPDATE_LIST:
            return { list: action.payload, isFetching: false };
        default:
            return state;
    }
}

export default reducer;