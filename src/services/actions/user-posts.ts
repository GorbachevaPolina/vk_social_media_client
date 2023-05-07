import { TUserPost } from "../types/posts"
import { AppDispatch, AppThunk } from "../types/store"
import { URL } from "../utils/URL"
import { getCookie } from "../utils/cookies"
import { checkResponse } from "../utils/response"

export const GET_USER_POSTS_REQUEST: "GET_USER_POSTS_REQUEST" = "GET_USER_POSTS_REQUEST"
export const GET_USER_POSTS_FAILED: "GET_USER_POSTS_FAILED" = "GET_USER_POSTS_FAILED"
export const GET_USER_POSTS_SUCCESS: "GET_USER_POSTS_SUCCESS" = "GET_USER_POSTS_SUCCESS"

export const UPLOAD_POST_SUCCESS: "UPLOAD_POST_SUCCESS" = "UPLOAD_POST_SUCCESS";
export const UPLOAD_POST_REQUEST: "UPLOAD_POST_REQUEST" = "UPLOAD_POST_REQUEST";
export const UPLOAD_POST_FAILED: "UPLOAD_POST_FAILED" = "UPLOAD_POST_FAILED";

export const LIKE_POST: "LIKE_POST" = "LIKE_POST"

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
export interface IUploadPostRequestAction {
    readonly type: typeof UPLOAD_POST_REQUEST
}
export interface IUploadPostFailedAction {
    readonly type: typeof UPLOAD_POST_FAILED
}
export interface IUploadPostSuccessAction {
    readonly type: typeof UPLOAD_POST_SUCCESS;
    readonly post: TUserPost
}
export interface ILikeAction {
    readonly type: typeof LIKE_POST;
    readonly postId: string;
    readonly userId: string
}

export type TUserPostActions = 
    IGetUserPostsFailedAction |
    IGetUserPostsRequestAction |
    IGetUserPostsSuccessAction |
    IUploadPostRequestAction |
    IUploadPostFailedAction |
    IUploadPostSuccessAction |
    ILikeAction;

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

export function uploadPostReq(data: FormData): AppThunk {
    return function(dispatch: AppDispatch) {
        let token = getCookie('token')
        if(token) {
            dispatch({
                type: UPLOAD_POST_REQUEST
            })
            fetch(
                `http://localhost:8800/api/posts`,
                {
                    method: "POST",
                    headers: {
                        "token": token
                    },
                    body: data
                }
            )
            .then(checkResponse)
            .then((result) => {
                dispatch({
                    type: UPLOAD_POST_SUCCESS,
                    post: result
                })
            })
            .catch((error) => dispatch({
                type: UPLOAD_POST_FAILED
            }))
        }
    }
}

export function like(post: string): AppThunk {
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