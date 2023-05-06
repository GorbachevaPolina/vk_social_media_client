import { TUserPost } from "../types/posts"
import { AppDispatch, AppThunk } from "../types/store"
import { URL } from "../utils/URL"
import { getCookie } from "../utils/cookies"
import { checkResponse } from "../utils/response"

export const GET_USER_POSTS_REQUEST: "GET_USER_POSTS_REQUEST" = "GET_USER_POSTS_REQUEST"
export const GET_USER_POSTS_FAILED: "GET_USER_POSTS_FAILED" = "GET_USER_POSTS_FAILED"
export const GET_USER_POSTS_SUCCESS: "GET_USER_POSTS_SUCCESS" = "GET_USER_POSTS_SUCCESS"

export interface IGetUserPostsRequestAction {
    readonly type: typeof GET_USER_POSTS_REQUEST
}
export interface IGetUserPostsFailedAction {
    readonly type: typeof GET_USER_POSTS_FAILED
}
export interface IGetUserPostsSuccessAction {
    readonly type: typeof GET_USER_POSTS_SUCCESS,
    readonly posts: TUserPost[]
}

export type TUserPostActions = 
    IGetUserPostsFailedAction |
    IGetUserPostsRequestAction |
    IGetUserPostsSuccessAction;

export function getUserPosts(): AppThunk {
    return function(dispatch: AppDispatch) {
        const token = getCookie('token');
        if(!token) {
            dispatch({
                type: GET_USER_POSTS_FAILED
            })
            return;
        }
        dispatch({
            type: GET_USER_POSTS_REQUEST
        })
        fetch(
            `${URL}/api/posts/personal-posts`,
            {
                method: "GET",
                headers: {
                    "token": token
                }
            }
        )
        .then(checkResponse)
        .then((result) => {
            dispatch({
                type: GET_USER_POSTS_SUCCESS,
                posts: result
            })
        })
        .catch((error) => dispatch({
            type: GET_USER_POSTS_FAILED
        }))
    }
}