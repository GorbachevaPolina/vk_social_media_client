import { GET_TIMELINE_FAILED, GET_TIMELINE_REQUEST, GET_TIMELINE_SUCCESS, LIKE_POST, TTimelineActions } from "../actions/timeline"
import { TTimelinePost } from "../types/timeline"

type TTimelineState = {
    timeline: TTimelinePost[] | null,
    isRequest: boolean,
    isFailed: boolean
}

const initialState: TTimelineState = {
    timeline: null,
    isFailed: false,
    isRequest: false
}

export const timelineReducer = (state = initialState, action: TTimelineActions): TTimelineState => {
    switch(action.type) {
        case GET_TIMELINE_REQUEST: {
            return {
                ...state,
                isRequest: true
            }
        }
        case GET_TIMELINE_FAILED: {
            return {
                ...initialState,
                isFailed: true
            }
        }
        case GET_TIMELINE_SUCCESS: {
            return {
                ...initialState,
                timeline: action.results.sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt))
            }
        }
        case LIKE_POST: {
            return {
                ...state,
                timeline: state.timeline && state.timeline?.map((item) => {
                    if (item._id === action.postId) {
                        if(!item.likes.includes(action.userId))
                            item.likes.push(action.userId)
                        else item.likes = item.likes.filter(item => item !== action.userId)
                    }
                    return item
                })
            }
        }
        default: {
            return state
        }
    }
}