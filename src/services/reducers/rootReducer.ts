import { combineReducers } from "redux";
import { userReducer } from "./user";
import { userPostsReducer } from "./user-posts";

export const rootReducer = combineReducers({
    user: userReducer,
    userPosts: userPostsReducer
});