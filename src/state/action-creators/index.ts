import { AppDispatch } from ".."
import { API_URL, User } from "../../api";
import { ActionTypes } from "../action-types"

export const getList = () => {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch({ type: ActionTypes.FETCH });
            const response = await fetch(API_URL);
            const json: User[] = await response.json();
            dispatch({ type: ActionTypes.UPDATE_LIST, payload: json });
        } catch(e) {
            console.log(e);
            dispatch({ type: ActionTypes.UPDATE_LIST, payload: [] })
        }
    }
}
