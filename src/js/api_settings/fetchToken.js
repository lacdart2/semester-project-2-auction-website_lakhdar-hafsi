import { getFromStorage } from "../utils/storage.js";


export function headers() {
    const token = getFromStorage("token");

    return {

        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`

    }
}



export async function fetchToken(url, options = {}) {
    return fetch(url, {
        ...options,
        headers: headers()
    })

}