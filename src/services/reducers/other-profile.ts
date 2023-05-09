import { GET_OTHER_PROFILE_FAILED, GET_OTHER_PROFILE_REQUEST, GET_OTHER_PROFILE_SUCCESS, LIKE_POST, TOtherUserActions } from "../actions/other-profile";
import { TUserPost } from "../types/posts"
import { TUserInfo } from "../types/user"

type TOtherUserState = {
    userInfo: TUserInfo | null;
    posts: TUserPost[] | null;
    isRequest: boolean;
    isFailed: boolean
}

const initialState: TOtherUserState = {
    userInfo: null,
    posts: null,
    isRequest: false,
    isFailed: false
}

export const otherUserReducer = (state = initialState, action: TOtherUserActions): TOtherUserState => {
    switch(action.type) {
        case GET_OTHER_PROFILE_REQUEST: {
            return {
                ...initialState,
                isRequest: true
            }
        }
        case GET_OTHER_PROFILE_FAILED: {
            return {
                ...initialState,
                isFailed: true
            }
        }
        case GET_OTHER_PROFILE_SUCCESS: {
            return {
                ...initialState,
                userInfo: action.userInfo,
                posts: action.posts.sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt))
            }
        }
        case LIKE_POST: {
            return {
                ...state,
                posts: state.posts && state.posts?.map((item) => {
                    if (item._id === action.postId) {
                        if(!item.likes.includes(action.userId))
                            item.likes.push(action.userId)
                        else item.likes = item.likes.filter(item => item !== action.userId)
                    }
                    return item
                })
            }
        }
        default: {
            return state
        }
    }
}