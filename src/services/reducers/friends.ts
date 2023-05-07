import { DELETE_FRIEND_FAILED, DELETE_FRIEND_REQUEST, DELETE_FRIEND_SUCCESS, GET_FRIENDS_FAILED, GET_FRIENDS_REQUEST, GET_FRIENDS_SUCCESS, TFriendsActions } from "../actions/friends";
import { TFriends } from "../types/friends"

type TFriendsState = {
    friends: TFriends[] | null;
    isFriendsRequest: boolean;
    isFriendsFailed: boolean;

    isDeleteFriendRequest: boolean;
    isDeleteFriendFailed: boolean;
}

const initialState: TFriendsState = {
    friends: null,
    isFriendsFailed: false,
    isFriendsRequest: false,

    isDeleteFriendFailed: false,
    isDeleteFriendRequest: false
}

export const friendsReducer = (state = initialState, action: TFriendsActions): TFriendsState => {
    switch(action.type) {
        case GET_FRIENDS_REQUEST: {
            return {
                ...state,
                isFriendsRequest: true
            }
        }
        case GET_FRIENDS_FAILED: {
            return {
                ...initialState,
                isFriendsFailed: true
            }
        }
        case GET_FRIENDS_SUCCESS: {
            return {
                ...initialState,
                friends: action.friends
            }
        }
        case DELETE_FRIEND_REQUEST: {
            return {
                ...state,
                isDeleteFriendRequest: true
            }
        }
        case DELETE_FRIEND_FAILED: {
            return {
                ...state,
                isDeleteFriendFailed: true,
                isDeleteFriendRequest: false
            }
        }
        case DELETE_FRIEND_SUCCESS: {
            return {
                ...state,
                isDeleteFriendFailed: false,
                isDeleteFriendRequest: false,
                friends: state.friends && state.friends.filter((item) => item._id !== action.friendId)
            }
        }
        default: {
            return state
        }
    }
}