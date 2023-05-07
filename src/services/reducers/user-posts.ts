import { TUserPost } from "../types/posts"
import { GET_USER_POSTS_FAILED, GET_USER_POSTS_REQUEST, GET_USER_POSTS_SUCCESS, LIKE_POST, TUserPostActions, UPLOAD_POST_FAILED, UPLOAD_POST_REQUEST, UPLOAD_POST_SUCCESS } from "../actions/user-posts"

type TUserPostsState = {
    posts: null | TUserPost[];
    isRequest: boolean;
    isFailed: boolean;

    isUploadPostRequest: boolean;
    isUploadPostFailed: boolean;
}

const initialState: TUserPostsState = {
    posts: null,
    isFailed: false,
    isRequest: false,
    isUploadPostFailed: false,
    isUploadPostRequest: false
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
        case UPLOAD_POST_REQUEST: {
            return {
                ...state,
                isUploadPostRequest: true
            }
        }
        case UPLOAD_POST_FAILED: {
            return {
                ...state,
                isUploadPostFailed: true,
                isUploadPostRequest: false
            }
        }
        case UPLOAD_POST_SUCCESS: {
            return {
                ...state,
                isUploadPostRequest: false,
                posts: state.posts ? [action.post, ...state.posts] : [action.post]
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

