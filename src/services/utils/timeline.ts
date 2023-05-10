import { getCookie } from "./cookies"
import { URL } from "./URL"

export const getTimeline = async (offset: number) => {
    const token = getCookie('token')
    if(token) {
        try {
            let response = await fetch(
                `${URL}/api/posts/timeline?offset=${offset}`,
                {
                    method: "GET",
                    headers: {
                        "token": token
                    }
                }
            )
            let result = await response.json()
            return result
        } catch (error: any) {
            console.error(error.message)
        }
    } else {
        return []
    }
}

export const likeTimeline = async (postId: string) => {
    const token = getCookie('token')
    if(token) {
        try {
            await fetch(
                `${URL}/api/posts/${postId}/like`,
                {
                    method: "PUT",
                    headers: {
                        "token": token
                    }
                }
            )
            // let result = await response.json()
            // return result
        } catch (error: any) {
            console.error(error.message)
        }
    } else {
        console.error("Not Authorized")
    }
}