import { User } from "../../api";
import { ActionTypes } from "../action-types";
import { Action } from "../actions";


interface UserState {
    list: User[];
    isFetching: boolean;
    error: boolean;
}

const initialState: UserState = {
    list: [],
    isFetching: false,
    error: false,
};

const reducer = (state: UserState = initialState, action: Action) => {
    switch(action.type) {
        case ActionTypes.FETCH:
            return { ...state, isFetching: true };
        case ActionTypes.UPDATE_LIST:
            return { list: action.payload,
                error: false, isFetching: false };
        case ActionTypes.ADD_TO_LIST:
            return { ...state, isFetching: false, error: false, list: [...state.list, action.payload]}
        case ActionTypes.EDIT_USER:
            return { ...state, isFetching: false, error: false, list: state.list.map((storedUser) => storedUser.id === action.payload.id ? {...storedUser, ...action.payload } : storedUser)}
        case ActionTypes.DELETE_USER:
            return { ...state, error: false, list: state.list.filter((storedUser) => storedUser.id !== action.payload )}
        case ActionTypes.ERROR:
            return { ...state, isFetching: false, error: true };
        default:
            return state;
    }
}

export default reducer;