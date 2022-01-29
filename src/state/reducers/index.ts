import { combineReducers } from "redux";
import { store } from "..";
import usersReducer from './usersReducer';

const reducers = combineReducers({
    users: usersReducer
})

export default reducers;

export type State = ReturnType<typeof reducers>;
export type AppDispatch = typeof store.dispatch;