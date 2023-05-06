export function checkResponse(res : Response) : Promise<any> {
    if(res.ok) {
        return res.json()
    }
    return Promise.reject(`Ошибка ${res.status}`)
}