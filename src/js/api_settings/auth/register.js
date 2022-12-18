import { API_AUCTION_URL } from "../constants.js";
import { displayMessage } from "../../components/displayMessage.js";
import { offerToNewUser } from "../../ui/offerCountDown.js";
/* import { relocateIndex } from "../../components/relocate.js"; */
const arrows = document.querySelector(".reg-arrows");

/* import { relocate } from "../../components/relocate.js"; */
/* const messageContainer = document.querySelector(".message-container"); */
const action = "/auth/register";
const method = "POST";
/* offerToNewUser(); */
export async function register(profile) {

    const registerURL = API_AUCTION_URL + action;
    console.log(registerURL);
    const body = JSON.stringify(profile);
    console.log(body);
    const response = await fetch(registerURL, {
        headers: {
            "Content-Type": "application/json",

        },
        method,
        body

    })
    const result = await response.json();

    console.log(result);
    console.log(result.credits);

    if (result.id) {
        /*    storage.saveToStorage("credit", accessToken) */
        displayMessage("success", "", "Successfully registered", "You just earned 1000 credit", ".message-container")

        setTimeout("location.href = '/profile/login/index.html';", 1800);



    } else if (!result.id) {
        displayMessage("warning", "", (result.message), ".message-container");

        /*   arrows.classList.add("active"); */
    }

    return result;
}
/* "Invalid register details" */
