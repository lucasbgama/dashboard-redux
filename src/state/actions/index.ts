import { User } from "../../api";
import { ActionTypes } from "../action-types";

interface UpdateListAction {
    type: ActionTypes.UPDATE_LIST,
    payload: User[]
}

interface FetchAction {
    type: ActionTypes.FETCH
}

export type Action = UpdateListAction | FetchAction;