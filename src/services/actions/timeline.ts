import { AppDispatch, AppThunk } from "../types/store"
import { TTimelinePost } from "../types/timeline"
import { URL } from "../utils/URL"
import { getCookie } from "../utils/cookies"
import { checkResponse } from "../utils/response"

export const GET_TIMELINE_REQUEST: "GET_TIMELINE_REQUEST" = "GET_TIMELINE_REQUEST"
export const GET_TIMELINE_FAILED: "GET_TIMELINE_FAILED" = "GET_TIMELINE_FAILED"
export const GET_TIMELINE_SUCCESS: "GET_TIMELINE_SUCCESS" = "GET_TIMELINE_SUCCESS"

export const LIKE_POST: "LIKE_POST" = "LIKE_POST"

export interface IGetTimelineRequestAction {
    readonly type: typeof GET_TIMELINE_REQUEST
}
export interface IGetTimelineFailedAction {
    readonly type: typeof GET_TIMELINE_FAILED
}
export interface IGetTimelineSuccessAction {
    readonly type: typeof GET_TIMELINE_SUCCESS,
    readonly results: TTimelinePost[]
}
export interface ILikePostAction {
    readonly type: typeof LIKE_POST
    readonly postId: string,
    readonly userId: string
}

export type TTimelineActions = 
    IGetTimelineFailedAction |
    IGetTimelineRequestAction | 
    IGetTimelineSuccessAction |
    ILikePostAction;

export function getTimelineReq(): AppThunk {
    return function(dispatch: AppDispatch) {
        const token = getCookie('token')
        if(token) {
            dispatch({
                type: GET_TIMELINE_REQUEST
            })
            fetch(
                `${URL}/api/posts/timeline`,
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
                    type: GET_TIMELINE_SUCCESS,
                    results: result
                })
            })
            .catch((error) => dispatch({
                type: GET_TIMELINE_FAILED
            }))
        } else {
            dispatch({
                type: GET_TIMELINE_FAILED
            })
        }
    }
}

export function likeTimeline(postId: string, userId: string): AppThunk {
    return function(dispatch: AppDispatch) {
        const token = getCookie('token')
        if(token) {
            fetch(
                `http://localhost:8800/api/posts/${postId}/like`,
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
                    postId: postId,
                    userId: userId
                })
            })
            .catch((error) => console.error(error.message))
        }
    }
}