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

export const GET_PEOPLE_REQUEST: "GET_PEOPLE_REQUEST" = "GET_PEOPLE_REQUEST"
export const GET_PEOPLE_FAILED: "GET_PEOPLE_FAILED" = "GET_PEOPLE_FAILED"
export const GET_PEOPLE_SUCCESS: "GET_PEOPLE_SUCCESS" = "GET_PEOPLE_SUCCESS"

export const ACCEPT_FRIEND_REQUEST: "ACCEPT_FRIEND_REQUEST" = "ACCEPT_FRIEND_REQUEST"
export const CANCEL_FRIEND_REQUEST: "CANCEL_FRIEND_REQUEST" = "CANCEL_FRIEND_REQUEST"
export const SEND_FRIEND_REQUEST: "SEND_FRIEND_REQUEST" = "SEND_FRIEND_REQUEST"

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
export interface IGetPeopleRequest {
    readonly type: typeof GET_PEOPLE_REQUEST
}
export interface IGetPeopleFailed {
    readonly type: typeof GET_PEOPLE_FAILED
}
export interface IGetPeopleSuccess {
    readonly type: typeof GET_PEOPLE_SUCCESS,
    readonly friends_req: TFriends[],
    readonly friends_pending: TFriends[]
}
export interface IAcceptFriendRequest {
    readonly type: typeof ACCEPT_FRIEND_REQUEST,
    readonly friendId: string
}
export interface ICancelFriendRequest {
    readonly type: typeof CANCEL_FRIEND_REQUEST,
    readonly friendId: string
}
export interface ISendFriendRequest {
    readonly type: typeof SEND_FRIEND_REQUEST,
    readonly person: TFriends
}

export type TFriendsActions = 
    IGetFriendsFailed |
    IGetFriendsRequest |
    IGetFriendsSuccess |
    IDeleteFriendFailed |
    IDeleteFriendRequest |
    IDeleteFriendSuccess |
    IGetPeopleFailed |
    IGetPeopleRequest |
    IGetPeopleSuccess |
    IAcceptFriendRequest |
    ICancelFriendRequest |
    ISendFriendRequest;

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

export function getAllPeople(): AppThunk {
    return function(dispatch: AppDispatch) {
        let token = getCookie('token')
        if(!token) {
            dispatch({
                type: GET_PEOPLE_FAILED
            })
            return;
        }
        dispatch({
            type: GET_PEOPLE_REQUEST
        })
        fetch(
            `${URL}/api/users/people/all`,
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
                type: GET_PEOPLE_SUCCESS,
                friends_pending: result.friends_pending,
                friends_req: result.friends_req
            })
        })
        .catch((error) => dispatch({
            type: GET_PEOPLE_FAILED
        }))
    }
}

export function sendFriendReq(person: TFriends): AppThunk {
    return function(dispatch: AppDispatch) {
        let token = getCookie('token')
        if(token) {
            fetch(
                `${URL}/api/users/${person._id}/send-friend-request`,
                {
                    method: "PUT",
                    headers: {
                        "token": token
                    }
                }
            )
            .then(checkResponse)
            .then((result) => dispatch({
                type: SEND_FRIEND_REQUEST,
                person: person
            }))
            .catch((error) => console.error(error.message))
        }
    }
}

export function addFriend(id: string): AppThunk {
    return function(dispatch: AppDispatch) {
        let token = getCookie('token')
        if(token) {
            fetch(
                `${URL}/api/users/${id}/accept-friend-request`,
                {
                    method: "PUT",
                    headers: {
                        "token": token
                    }
                }
            )
            .then(checkResponse)
            .then((result) => dispatch({
                type: ACCEPT_FRIEND_REQUEST,
                friendId: id
            }))
            .catch((error) => console.error(error.message))
        }
    }
}

export function cancelFriendReq(id: string): AppThunk {
    return function(dispatch: AppDispatch) {
        let token = getCookie('token')
        if(token) {
            fetch(
                `${URL}/api/users/${id}/cancel-friend-request`,
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
                    type: CANCEL_FRIEND_REQUEST,
                    friendId: id
                })
            })
            .catch((error) => console.error(error.message))
        }
    }
}