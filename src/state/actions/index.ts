import { User } from "../../api";
import { ActionTypes } from "../action-types";

interface UpdateListAction {
    type: ActionTypes.UPDATE_LIST,
    payload: User[]
}

interface FetchAction {
    type: ActionTypes.FETCH
}

interface AddToListAction {
    type: ActionTypes.ADD_TO_LIST,
    payload: User
}

interface EditUserAction {
    type: ActionTypes.EDIT_USER,
    payload: { id: number } & Partial<User>,
}

interface ErrorAction {
    type: ActionTypes.ERROR,
}

interface DeleteUserAction {
    type: ActionTypes.DELETE_USER,
    payload: number;
}

export type Action = UpdateListAction | FetchAction | AddToListAction | ErrorAction | EditUserAction | DeleteUserAction;