import { API_SOCIAL_URL } from "../constants.js";
import { fetchToken } from "../fetchToken.js";
//import { displayMessage } from "../../components/displayMessage.js";
//const message = document.querySelector(".message-container"); 

const action = "/profiles";
const method = "put";




export async function updateProfile(profileData) {

    if (!profileData.name) {
        alert("profile needs a name");
    }
    const updateProfileURL = `${API_SOCIAL_URL}${action}/${profileData.name}/name`;

    try {


        const response = await fetchToken(updateProfileURL, {
            method,
            body: JSON.stringify(profileData),


        })
        if (profileData.created) {
            // displayMessage("success", "Post created", ".message-container");
            // form.reset();
            console.log(profileData.created)
        }

        if (post.error) {
            //displayMessage("error", postData.message, ".message-container"); 
        }
        return await response.json();

    } catch (error) {

        console.log(profileData);
        // displayMessage("error", "An error occurred", ".message-container");
    }
}





