import { TUserPost } from "../types/posts"
import { AppDispatch, AppThunk } from "../types/store"
import { TUserInfo } from "../types/user"
import { URL } from "../utils/URL"
import { getCookie } from "../utils/cookies"
import { checkResponse } from "../utils/response"

export const GET_OTHER_PROFILE_REQUEST: "GET_OTHER_PROFILE_REQUEST" = "GET_OTHER_PROFILE_REQUEST"
export const GET_OTHER_PROFILE_FAILED: "GET_OTHER_PROFILE_FAILED" = "GET_OTHER_PROFILE_FAILED"
export const GET_OTHER_PROFILE_SUCCESS: "GET_OTHER_PROFILE_SUCCESS" = "GET_OTHER_PROFILE_SUCCESS"

export const LIKE_POST: "LIKE_POST" = "LIKE_POST"

export interface IGetOtherProfileRequestAction {
    readonly type: typeof GET_OTHER_PROFILE_REQUEST
}
export interface IGetOtherProfileFailedAction {
    readonly type: typeof GET_OTHER_PROFILE_FAILED
}
export interface IGetOtherProfileSuccessAction {
    readonly type: typeof GET_OTHER_PROFILE_SUCCESS,
    readonly userInfo: TUserInfo,
    readonly posts: TUserPost[]
}
export interface ILikeAction {
    readonly type: typeof LIKE_POST;
    readonly postId: string;
    readonly userId: string
}

export type TOtherUserActions = 
    IGetOtherProfileFailedAction |
    IGetOtherProfileRequestAction |
    IGetOtherProfileSuccessAction |
    ILikeAction;

export const getOtherUserProfile = (id: string): AppThunk => {
    return function(dispatch: AppDispatch) {
        const token = getCookie('token');
        if(token) {
            dispatch({
                type: GET_OTHER_PROFILE_REQUEST
            })
            fetch(
                `${URL}/api/users/${id}`,
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
                    type: GET_OTHER_PROFILE_SUCCESS,
                    userInfo: result.user,
                    posts: result.posts
                })
            })
        } else {
            dispatch({
                type: GET_OTHER_PROFILE_FAILED
            })
        }
    }
}

export function likeOther(post: string, user: string): AppThunk {
    return function(dispatch: AppDispatch) {
        let token = getCookie('token')
        if(token) {
            fetch(
                `http://localhost:8800/api/posts/${post}/like`,
                {
                    method: "PUT",
                    headers: {
                        "token": token
                    }
                }
            )
            .then(checkResponse)
            .then((result) => {
                dispatch({
                    type: LIKE_POST,
                    postId: post,
                    userId: result
                })
            })
            .catch((error) => console.error(error.message))
        }
    }
}

