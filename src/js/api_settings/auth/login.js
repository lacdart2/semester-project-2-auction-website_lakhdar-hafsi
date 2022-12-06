import { API_AUCTION_URL } from "../constants.js";
import * as storage from "../../utils/storage.js"
import { displayMessage } from "../../components/displayMessage.js";
const message = document.querySelector(".message-container");

const action = "/auth/login";
const method = "POST";

export async function login(profile) {

    const loginURL = API_AUCTION_URL + action;
    console.log(loginURL);
    const body = JSON.stringify(profile);
    console.log(body)


    const response = await fetch(loginURL, {
        headers: {
            "Content-Type": "application/json",
        },
        method,
        body

    })
    const { accessToken, ...user } = await response.json();
    console.log(accessToken);

    storage.saveToStorage("token", accessToken)
    // save all except token
    storage.saveToStorage("profile", user)


    console.log(accessToken);
    if (accessToken) {

        const loggedIn = profile.email
        const slicedName = loggedIn.split('@')[0];

        displayMessage("success", slicedName, " logged in", ".message-container")
        setTimeout("location.href = '/profile/home/index.html';", 1500);


    } else if (!accessToken) {
        displayMessage("warning", "Invalid login details", ".message-container");
    }

} 