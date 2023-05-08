import { ACCEPT_FRIEND_REQUEST, CANCEL_FRIEND_REQUEST, DELETE_FRIEND_FAILED, DELETE_FRIEND_REQUEST, DELETE_FRIEND_SUCCESS, GET_FRIENDS_FAILED, GET_FRIENDS_REQUEST, GET_FRIENDS_SUCCESS, GET_PEOPLE_FAILED, GET_PEOPLE_REQUEST, GET_PEOPLE_SUCCESS, SEND_FRIEND_REQUEST, TFriendsActions } from "../actions/friends";
import { TFriends } from "../types/friends"

type TFriendsState = {
    friends: TFriends[] | null;
    isFriendsRequest: boolean;
    isFriendsFailed: boolean;

    isDeleteFriendRequest: boolean;
    isDeleteFriendFailed: boolean;

    friends_req: TFriends[] | null;
    friends_pending: TFriends[] | null;
    isPeopleRequest: boolean,
    isPeopleFailed: boolean
}

const initialState: TFriendsState = {
    friends: null,
    isFriendsFailed: false,
    isFriendsRequest: false,

    isDeleteFriendFailed: false,
    isDeleteFriendRequest: false,

    friends_pending: null,
    friends_req: null,
    isPeopleFailed: false,
    isPeopleRequest: false
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
                ...state,
                isFriendsFailed: true,
                isFriendsRequest: false
            }
        }
        case GET_FRIENDS_SUCCESS: {
            return {
                ...state,
                isFriendsRequest: false,
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
        case GET_PEOPLE_REQUEST: {
            return {
                ...state,
                isPeopleRequest: true
            }
        }
        case GET_PEOPLE_FAILED: {
            return {
                ...state,
                isPeopleRequest: false,
                isPeopleFailed: true
            }
        }
        case GET_PEOPLE_SUCCESS: {
            return {
                ...state,
                isPeopleRequest: false,
                friends_req: action.friends_req,
                friends_pending: action.friends_pending
            }
        }
        case ACCEPT_FRIEND_REQUEST: {
            const newFriend = state.friends_req?.find(item => item._id === action.friendId)
            return {
                ...state,
                friends: state.friends && [...state.friends, (newFriend as TFriends)],
                friends_req: state.friends_req && state.friends_req.filter(item => item._id !== action.friendId)
            }
        }
        case CANCEL_FRIEND_REQUEST: {
            return {
                ...state,
                friends_pending: state.friends_pending && state.friends_pending.filter(item => item._id !== action.friendId)
            }
        }
        case SEND_FRIEND_REQUEST: {
            return {
                ...state,
                friends_pending: state.friends_pending ? [...state.friends_pending, action.person] : [action.person]
            }
        }
        default: {
            return state
        }
    }
}