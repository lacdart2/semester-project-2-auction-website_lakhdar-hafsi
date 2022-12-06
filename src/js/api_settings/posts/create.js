import { API_AUCTION_URL } from "../constants.js";
import { fetchToken } from "../fetchToken.js";
import { displayMessageCreate } from "../../components/displayMessage.js";
/* const message = document.querySelector(".message-container"); */

const action = "/posts";
const method = "post";

export async function createPost(postData) {
    const createPostURL = API_AUCTION_URL + action;

    try {

        const response = await fetchToken(createPostURL, {

            method,
            body: JSON.stringify(postData)

        })
        console.log(response);
        if (json.id) {
            displayMessageCreate("success", "Post created", ".message-container");
            console.log(response.id)
            form.reset();
        }
        if (!json.id) {
            displayMessageCreate("error", post.message, ".message-container");
        }
        const json = await post.json();

        return await post.json();



    } catch (error) {

        console.log(error);
        displayMessageCreate("error", "an error occurred ", ".message-container");
    }

}