import { API_AUCTION_URL } from "../constants.js";
import { fetchToken } from "../fetchToken.js";
//import { displayMessage } from "../../components/displayMessage.js";
//const message = document.querySelector(".message-container"); 

const action = "/posts";
const method = "put";




export async function updatePost(postData) {

    if (!postData.id) {
        alert("update needs an ID");
    }
    const updatePostURL = `${API_AUCTION_URL}${action}/${postData.id}`;

    try {


        const response = await fetchToken(updatePostURL, {
            method,
            body: JSON.stringify(postData),


        })
        if (postData.created) {
            // displayMessage("success", "Post created", ".message-container");
            // form.reset();
            console.log(postData.created)
        }

        if (post.error) {
            //displayMessage("error", postData.message, ".message-container"); 
        }
        return await response.json();

    } catch (error) {

        console.log(postData);
        // displayMessage("error", "An error occurred", ".message-container");
    }
}





