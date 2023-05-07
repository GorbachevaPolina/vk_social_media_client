import { TFriends } from "../types/friends"
import { AppDispatch, AppThunk } from "../types/store"
import { getCookie } from "../utils/cookies"
import { checkResponse } from "../utils/response"
import { URL } from "../utils/URL"

export const GET_FRIENDS_REQUEST: "GET_FRIENDS_REQUEST" = "GET_FRIENDS_REQUEST"
export const GET_FRIENDS_FAILED: "GET_FRIENDS_FAILED" = "GET_FRIENDS_FAILED"
export const GET_FRIENDS_SUCCESS: "GET_FRIENDS_SUCCESS" = "GET_FRIENDS_SUCCESS"

export const DELETE_FRIEND_REQUEST: "DELETE_FRIEND_REQUEST" = "DELETE_FRIEND_REQUEST"
export const DELETE_FRIEND_FAILED: "DELETE_FRIEND_FAILED" = "DELETE_FRIEND_FAILED"
export const DELETE_FRIEND_SUCCESS: "DELETE_FRIEND_SUCCESS" = "DELETE_FRIEND_SUCCESS"

export interface IGetFriendsRequest {
    readonly type: typeof GET_FRIENDS_REQUEST
}
export interface IGetFriendsFailed {
    readonly type: typeof GET_FRIENDS_FAILED
}
export interface IGetFriendsSuccess {
    readonly type: typeof GET_FRIENDS_SUCCESS,
    readonly friends: TFriends[]
}
export interface IDeleteFriendRequest {
    readonly type: typeof DELETE_FRIEND_REQUEST
}
export interface IDeleteFriendFailed {
    readonly type: typeof DELETE_FRIEND_FAILED
}
export interface IDeleteFriendSuccess {
    readonly type: typeof DELETE_FRIEND_SUCCESS,
    readonly friendId: string
}

export type TFriendsActions = 
    IGetFriendsFailed |
    IGetFriendsRequest |
    IGetFriendsSuccess |
    IDeleteFriendFailed |
    IDeleteFriendRequest |
    IDeleteFriendSuccess;

export function getAllFriends(): AppThunk {
    return function(dispatch: AppDispatch) {
        let token = getCookie('token')
        if(!token) {
            dispatch({
                type: GET_FRIENDS_FAILED
            })
            return;
        }
        dispatch({
            type: GET_FRIENDS_REQUEST
        })
        fetch(
            `${URL}/api/users/friends/all`,
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
                type: GET_FRIENDS_SUCCESS,
                friends: result
            })
        })
        .catch((error) => dispatch({
            type: GET_FRIENDS_FAILED
        }))
    }
}

export function deleteFriendReq(friendId: string): AppThunk {
    return function(dispatch: AppDispatch) {
        let token = getCookie('token');
        if(!token) {
            dispatch({
                type: DELETE_FRIEND_FAILED
            })
            return;
        }
        dispatch({
            type: DELETE_FRIEND_REQUEST
        })
        fetch(
            `${URL}/api/users/${friendId}/delete-friend`,
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
                type: DELETE_FRIEND_SUCCESS,
                friendId: friendId
            })
        })
        .catch((error) => dispatch({
            type: DELETE_FRIEND_FAILED
        }))
    }
}