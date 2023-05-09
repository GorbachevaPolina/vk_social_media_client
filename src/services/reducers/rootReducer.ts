import { combineReducers } from "redux";
import { userReducer } from "./user";
import { userPostsReducer } from "./user-posts";
import { friendsReducer } from "./friends";
import { otherUserReducer } from "./other-profile";

export const rootReducer = combineReducers({
    user: userReducer,
    userPosts: userPostsReducer,
    friends: friendsReducer,
    otherUser: otherUserReducer
});