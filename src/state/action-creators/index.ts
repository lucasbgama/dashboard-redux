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
            dispatch({ type: ActionTypes.ERROR })
        }
    }
}

export const addToList = (user: User) => {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch({ type: ActionTypes.FETCH });
            await fetch(API_URL, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify(user)
            });
            dispatch({ type: ActionTypes.ADD_TO_LIST, payload: user });
        } catch(e) {
            console.log(e);
            dispatch({ type: ActionTypes.ERROR });
        }      
    }
}

export const editUser = (id: number, editions: Partial<User>) => {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch({ type: ActionTypes.FETCH });
            await fetch(`${API_URL}/${id}`, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "PATCH",
                body: JSON.stringify(editions)
            });
            dispatch({ type: ActionTypes.EDIT_USER, payload: { ...editions, id } });
        } catch(e) {
            console.log(e);
            dispatch({ type: ActionTypes.ERROR });
        }      
    }
}

export const deleteUser = (id: number) => {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch({ type: ActionTypes.FETCH });
            await fetch(`${API_URL}/${id}`, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "DELETE",
            });
            dispatch({ type: ActionTypes.DELETE_USER, payload: id });
        } catch(e) {
            console.log(e);
            dispatch({ type: ActionTypes.ERROR });
        }      
    }
}