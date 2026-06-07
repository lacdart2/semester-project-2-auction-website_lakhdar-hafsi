// updated to use API_AUTH_URL - auth is no longer under /auction in v2
import { API_AUTH_URL } from "../constants.js";
import * as storage from "../../utils/storage.js"
import { displayMessage } from "../../components/displayMessage.js";

const action = "/login";
const method = "POST";

export async function login(profile) {
    console.log("login function called");
    const loginURL = API_AUTH_URL + action;
    const body = JSON.stringify(profile);

    const response = await fetch(loginURL, {
        headers: {
            "Content-Type": "application/json",
        },
        method,
        body
    });

    // v2 wraps the response in data property
    const json = await response.json();
    console.log("login response:", json);
    const { accessToken, ...user } = json.data || json;
    const credits = json.data?.credits ?? 0;
    console.log("credits from API:", credits);

    storage.saveToStorage("token", accessToken);
    storage.saveToStorage("profile", user);
    localStorage.setItem("credit", credits);

    if (accessToken) {
        const slicedName = profile.email.split("@")[0];
        displayMessage("success", slicedName, " logged in", "", ".message-container");
        // redirect to home after login
        setTimeout(() => { location.href = "/index.html"; }, 1500);
    } else {
        displayMessage("warning", "Invalid login details", "", "", ".message-container");
    }
}