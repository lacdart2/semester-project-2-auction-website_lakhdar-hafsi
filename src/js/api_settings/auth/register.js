import { API_AUCTION_URL } from "../constants.js";
import { displayMessage } from "../../components/displayMessage.js";
/* import { relocateIndex } from "../../components/relocate.js"; */
const arrows = document.querySelector(".reg-arrows");
/* import { relocate } from "../../components/relocate.js"; */
/* const messageContainer = document.querySelector(".message-container"); */
const action = "/auth/register";
const method = "POST";

export async function register(profile) {

    const registerURL = API_AUCTION_URL + action;
    console.log(registerURL);
    const body = JSON.stringify(profile);
    console.log(body)
    const response = await fetch(registerURL, {
        headers: {
            "Content-Type": "application/json",

        },
        method,
        body

    })
    const result = await response.json();

    console.log(result);
    if (result.id) {

        displayMessage("success", "", "Successfully registered", ".message-container")

        setTimeout("location.href = '/profile/login/index.html';", 1500);



    } else if (!result.id) {
        displayMessage("warning", "", (result.message), ".message-container");

        arrows.classList.add("active");
    }

    return result;
}
/* "Invalid register details" */
