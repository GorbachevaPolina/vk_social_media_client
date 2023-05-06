import { TUserPost } from "../types/posts"
import { GET_USER_POSTS_FAILED, GET_USER_POSTS_REQUEST, GET_USER_POSTS_SUCCESS, TUserPostActions } from "../actions/user-posts"

type TUserPostsState = {
    posts: null | TUserPost[];
    isRequest: boolean;
    isFailed: boolean
}

const initialState: TUserPostsState = {
    posts: null,
    isFailed: false,
    isRequest: false
}

export const userPostsReducer = (state = initialState, action: TUserPostActions): TUserPostsState => {
    switch(action.type) {
        case GET_USER_POSTS_REQUEST: {
            return {
                ...state,
                isRequest: true
            }
        }
        case GET_USER_POSTS_FAILED: {
            return {
                ...initialState,
                isFailed: true
            }
        }
        case GET_USER_POSTS_SUCCESS: {
            return {
                ...initialState,
                posts: action.posts.sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt))
            }
        }
        default: {
            return state
        }
    }
}

