import { combineReducers } from "redux";
import { userReducer } from "./user";
import { userPostsReducer } from "./user-posts";
import { friendsReducer } from "./friends";

export const rootReducer = combineReducers({
    user: userReducer,
    userPosts: userPostsReducer,
    friends: friendsReducer
});