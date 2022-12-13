/* 
import { API_AUCTION_URL } from "../constants.js";
import { fetchToken } from "../fetchToken.js";

const action = "/profiles";
const method = "GET";

export async function updateProfile() {


    const updateProfileURL = `${API_AUCTION_URL}${action}/${name}?_listings=true`;


    const response = await fetchToken(updateProfileURL)

    return await response.json();
}


export async function getProfile(fetchToken, name) {
    if (!name) {
        throw new Error("you needs a profile name ");
    }

    const options = {
        method: method,
        headers: {
            "Content-Type": "application/json; charset=UTF-8",
            Authorization: `Bearer ${fetchToken}`,
        },
    }
    const getProfileURL = `${API_SOCIAL_URL}${action}/${name}?_listings=true`;

    try {


        const response = await fetchToken(getProfileURL, options);

        return await response.json();
        console.log(response);

    } catch (error) {
        console.log(error);
    }
} */