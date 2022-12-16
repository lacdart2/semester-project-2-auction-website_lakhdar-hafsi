
import { API_AUCTION_URL } from "../constants.js";
import { fetchToken } from "../fetchToken.js";
import { displayMessage } from "../../components/displayMessage.js";



/**
 * sends a get request to get single profile
 * @param {string} fetchToken to access the Api
 * @param {string} name user's name
 * @returns result that matches the user's name
 */
const action = "/profiles";
const method = "GET";





const queryString = document.location.search;

const params = new URLSearchParams(queryString);
const profileName = params.get("name");
const getProfileURL = `${API_AUCTION_URL}${action}/${profileName}/bids?_listings=true?_active=true`;
console.log(getProfileURL);
/* export async function updateProfile() {
 
 
    const updateProfileURL = `${API_AUCTION_URL}${action}/${name}?_listings=true`;
 
 
    const response = await fetchToken(updateProfileURL)
 
    return await response.json();
} */



/*    profileContainer.innerHTML = ""; */



export async function getProfile(profileName) {



    /*     if (!name) {
            throw new Error("you need a profile name ");
        }
     */
    const options = {
        method: method,
        headers: {
            "Content-Type": "application/json; charset=UTF-8",
            Authorization: `Bearer ${fetchToken}`,
        },
    }


    try {


        const response = await fetchToken(getProfileURL, options);

        const json = await response.json();
        console.log(json);

        /* ?_listings = true */

        const profileContainer = document.querySelector(".profile-container");
        profileContainer.innerHTML = "";
        profileContainer.innerHTML = `

          
                       `

    } catch (error) {
        console.log(error);
        displayMessage("warning", "", error, "", ".message-container");
    }

};