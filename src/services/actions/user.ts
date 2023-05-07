import { AppDispatch, AppThunk } from "../types/store";
import { TLoginInfo, TRegInfo, TUserInfo } from "../types/user";
import { URL } from "../utils/URL";
import { getCookie, setCookie } from "../utils/cookies";
import { checkResponse } from "../utils/response";

export const REGISTER_USER_REQUEST: "REGISTER_USER_REQUEST" = "REGISTER_USER_REQUEST"
export const REGISTER_USER_SUCCESS: "REGISTER_USER_SUCCESS" = "REGISTER_USER_SUCCESS"
export const REGISTER_USER_FAILED: "REGISTER_USER_FAILED" = "REGISTER_USER_FAILED"

export const LOGIN_USER_REQUEST: "LOGIN_USER_REQUEST" = "LOGIN_USER_REQUEST"
export const LOGIN_USER_SUCCESS: "LOGIN_USER_SUCCESS" = "LOGIN_USER_SUCCESS"
export const LOGIN_USER_FAILED: "LOGIN_USER_FAILED" = "LOGIN_USER_FAILED"

export const GET_USER_REQUEST: "GET_USER_REQUEST" = "GET_USER_REQUEST"
export const GET_USER_SUCCESS: "GET_USER_SUCCESS" = "GET_USER_SUCCESS"
export const GET_USER_FAILED: "GET_USER_FAILED" = "GET_USER_FAILED"

export const LOGOUT: "LOGOUT" = "LOGOUT"

export interface IRegisterUserRequestAction {
    readonly type: typeof REGISTER_USER_REQUEST;
}

export interface IRegisterUserFailedAction {
    readonly type: typeof REGISTER_USER_FAILED;
}

export interface IRegisterUserSuccessAction {
    readonly type: typeof REGISTER_USER_SUCCESS;
    readonly user: TUserInfo
}

export interface ILoginUserRequestAction {
    readonly type: typeof LOGIN_USER_REQUEST;
}

export interface ILoginUserFailedAction {
    readonly type: typeof LOGIN_USER_FAILED;
}

export interface ILoginUserSuccessAction {
    readonly type: typeof LOGIN_USER_SUCCESS;
    readonly user: TUserInfo
}

export interface IGetUserRequestAction {
    readonly type: typeof GET_USER_REQUEST;
}

export interface IGetUserFailedAction {
    readonly type: typeof GET_USER_FAILED;
}

export interface IGetUserSuccessAction {
    readonly type: typeof GET_USER_SUCCESS;
    readonly user: TUserInfo
}

export interface ILogout {
    readonly type: typeof LOGOUT
}

export type TUserActions = 
    IRegisterUserFailedAction |
    IRegisterUserRequestAction |
    IRegisterUserSuccessAction |
    ILoginUserFailedAction |
    ILoginUserRequestAction |
    ILoginUserSuccessAction |
    IGetUserFailedAction |
    IGetUserRequestAction |
    IGetUserSuccessAction |
    ILogout;

export function register(user: FormData): AppThunk {
    return function(dispatch: AppDispatch) {
        dispatch({
            type: REGISTER_USER_REQUEST
        })
        fetch(
            `${URL}/api/auth/register`,
            {
                method: "POST",
                // headers: {
                //     "Content-Type": "application/json"
                // },
                body: user
            }
        )
        .then(checkResponse)
        .then((result) => {
            const token = result.token;
            setCookie('token', token, {expires: 18000})
            dispatch({
                type: REGISTER_USER_SUCCESS,
                user: result.info
            })
        })
        .catch((error) => dispatch({
            type: REGISTER_USER_FAILED
        }))
    }
}

export function login(user: TLoginInfo): AppThunk {
    return function(dispatch: AppDispatch) {
        dispatch({
            type: LOGIN_USER_REQUEST
        })
        fetch(
            `${URL}/api/auth/login`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user)
            }
        )
        .then(checkResponse)
        .then((result) => {
            const token = result.token;
            setCookie('token', token, {expires: 18000});
            dispatch({
                type: LOGIN_USER_SUCCESS,
                user: result.info
            })
        })
        .catch((error) => dispatch({
            type: LOGIN_USER_FAILED
        }))
    }
}

export function getUser(): AppThunk {
    return function(dispatch: AppDispatch) {
        const token = getCookie('token');
        if(!token) {
            dispatch({
                type: GET_USER_FAILED
            })
            return;
        }
        dispatch({
            type: GET_USER_REQUEST
        })

        fetch(
            `${URL}/api/users`,
            {
                method: 'GET',
                headers: {
                    'token': token
                }
            }
        )
        .then(checkResponse)
        .then((result) => {
            dispatch({
                type: GET_USER_SUCCESS,
                user: result
            })
        })
        .catch((error) => {
            dispatch({
                type: GET_USER_FAILED
            })
        })
    }
}