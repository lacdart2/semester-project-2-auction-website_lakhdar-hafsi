// updated to use API_AUTH_URL - auth is no longer under /auction in v2
import { API_AUTH_URL } from "../constants.js";
import { displayMessage } from "../../components/displayMessage.js";

const action = "/register";
const method = "POST";

export async function register(profile) {

    const registerURL = API_AUTH_URL + action;
    const body = JSON.stringify(profile);

    const response = await fetch(registerURL, {
        headers: {
            "Content-Type": "application/json",
        },
        method,
        body
    })

    const json = await response.json();
    console.log("api response:", json);
    // v2 wraps the response in data property
    const result = json.data || json;

    if (result.name) {
        displayMessage("success", "", "Successfully registered", "You just earned 1000 credits", ".message-container")
        setTimeout("location.href = '/profile/login/index.html';", 1800);
    } else {
        // show error from api in case registration fails
        const errorMsg = json.errors?.[0]?.message || json.message || "Registration failed";
        displayMessage("warning", "", errorMsg, "", ".message-container");
    }

    return result;
}