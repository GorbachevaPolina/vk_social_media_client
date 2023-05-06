import { GET_USER_FAILED, GET_USER_REQUEST, GET_USER_SUCCESS, LOGIN_USER_FAILED, LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS, REGISTER_USER_FAILED, REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS, TUserActions } from "../actions/user"
import { TUserInfo } from "../types/user"

type TUserState = {
    user: null | TUserInfo;

    isRegisterRequest: boolean;
    isRegisterFailed: boolean;
    isLoginRequest: boolean;
    isLoginFailed: boolean;
    isGetRequest: boolean;
    isGetFailed: boolean;
}

const initialState: TUserState = {
    user: null,

    isRegisterRequest: false,
    isRegisterFailed: false,

    isLoginRequest: false,
    isLoginFailed: false,

    isGetFailed: false,
    isGetRequest: false
}

export const userReducer = (state = initialState, action: TUserActions): TUserState => {
    switch(action.type) {
        case REGISTER_USER_REQUEST: {
            return {
                ...state,
                isRegisterRequest: true
            }
        }
        case REGISTER_USER_FAILED: {
            return {
                ...initialState,
                isRegisterFailed: true
            }
        }
        case REGISTER_USER_SUCCESS: {
            return {
                ...initialState,
                user: action.user
            }
        }
        case LOGIN_USER_REQUEST: {
            return {
                ...state,
                isLoginRequest: true
            }
        }
        case LOGIN_USER_FAILED: {
            return {
                ...initialState,
                isLoginFailed: true
            }
        }
        case LOGIN_USER_SUCCESS: {
            return {
                ...initialState,
                user: action.user
            }
        }
        case GET_USER_REQUEST: {
            return {
                ...state,
                isGetRequest: true
            }
        }
        case GET_USER_FAILED: {
            return {
                ...initialState,
                isGetFailed: true
            }
        }
        case GET_USER_SUCCESS: {
            return {
                ...initialState,
                user: action.user
            }
        }
        default: {
            return state
        }
    }
}