import exp from "node:constants";
import {authAPI, LoginParamsType} from "../../api/todolists-api";
import {Dispatch} from "redux";
import {setAppStatusAC, SetAppStatusActionType} from "../../app/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";

const InitialState = {
    isLoggedIn: false
}


export const authReducer = (state: StateType, action: AuthActionsType): StateType => {
    switch (action.type) {
        case "AUTH-SET-IS-LOGGED-IN":
            return {
                ...state,
                isLoggedIn: action.isLoggedIn
            }
        default:
            return state
    }
}


// actions

export const setIsLoggedInAC = (isLoggedIn: boolean) => ({
    type: "AUTH-SET-IS-LOGGED-IN",
    isLoggedIn
} as const)

// thunks

export const loginTC = (loginParams: LoginParamsType) => async (dispatch: Dispatch) => {
    dispatch(setAppStatusAC("loading"))
    try {
        const res = await authAPI.login(loginParams)
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC(true))
            dispatch(setAppStatusAC("succeeded"))
        } else {
            handleServerAppError(res.data, dispatch)
        }
    } catch (err: any) {
        handleServerNetworkError(err as { message: string }, dispatch)
    }
}

// types

type StateType = typeof InitialState

type AuthActionsType = ReturnType<typeof setIsLoggedInAC> | SetAppStatusActionType



//////////////////// for del


























