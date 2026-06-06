import { getFromStorage } from "../utils/storage.js";
import { API_KEY } from "./constants.js";

export function headers() {
    const token = getFromStorage("token");

    // v2 api requires api key header on all requests
    const baseHeaders = {
        "Content-Type": "application/json",
        "X-Noroff-API-Key": API_KEY
    }

    // only add auth token if user is logged in
    if (token) {
        baseHeaders["Authorization"] = `Bearer ${token}`;
    }

    return baseHeaders;
}

export async function fetchToken(url, options = {}) {
    return fetch(url, {
        ...options,
        headers: headers()
    })
}