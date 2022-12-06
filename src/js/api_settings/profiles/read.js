
import { API_AUCTION_URL } from "../constants.js";
import { fetchToken } from "../fetchToken.js";

const action = "/profiles";


export async function updateProfile() {


    const updateProfileURL = `${API_AUCTION_URL}${action}`;


    const response = await fetchToken(updateProfileURL)

    return await response.json();
}


export async function getProfile(name) {
    if (!name) {
        throw new Error("you needs a profile name ");
    }


    const getProfileURL = `${API_SOCIAL_URL}${action}/${name}`;


    const response = await fetchToken(getProfileURL)

    return await response.json();

}