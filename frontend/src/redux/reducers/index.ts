import { combineReducers } from "redux";
import { shoppingReducer } from "./shoppingReducer";
import { UserReducer } from './userReducer';

const rootReducer = combineReducers({
    userReducer: UserReducer,
    shoppingReducer: shoppingReducer
});

export type ApplicationState = ReturnType<typeof rootReducer>

export { rootReducer };